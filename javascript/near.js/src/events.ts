import * as types from "./generated/index.js";
import { connect } from "near-api-js";
import { startStream, types as nearLakeTypes } from "near-lake-framework";
import ws from "isomorphic-ws";
import ReconnectingWebSocket from "reconnecting-websocket";
import { MAINNET_PROGRAM_ID } from "./generated/index.js";
import { getProgramId } from "./program.js";
import { ExecutionOutcomeWithReceipt } from "near-lake-framework/dist/types.js";

export interface IEvent {
  AggregatorOpenRoundEvent: types.AggregatorOpenRoundEventSerde;
  AggregatorValueUpdateEvent: types.AggregatorValueUpdateEventSerde;
  OracleBootedEvent: types.OracleBootedEventSerde;
  OracleRewardEvent: types.OracleRewardEventSerde;
  OracleSlashEvent: types.OracleSlashEventSerde;
}

export type SwitchboardEventType = keyof IEvent;

export type EventCallback = (
  event: IEvent[SwitchboardEventType]
) => Promise<void> | void;

export type EventErrorCallback = (error: unknown) => Promise<void> | void;

export interface ISwitchboardEvent {
  event: SwitchboardEventType;
  callback: EventCallback;
}

export interface NearEventListenerMessage {
  secret: string;
  events: Array<{
    block_height: string;
    block_hash: string;
    block_timestamp: string;
    block_epoch_id: string;
    receipt_id: string;
    log_index: number;
    predecessor_id: string;
    account_id: string;
    status: string;
    event: {
      standard: string;
      version: string;
      event: SwitchboardEventType;
      data: IEvent[SwitchboardEventType];
    };
  }>;
}

export abstract class NearEventListener {
  constructor(
    readonly _events: Array<ISwitchboardEvent>,
    readonly errorHandler: EventErrorCallback
  ) {}

  /** Starts the listener */
  abstract start(): void | Promise<void>;

  get callbacks(): Map<SwitchboardEventType, Array<EventCallback>> {
    return this._events.reduce((map, event) => {
      if (map.has(event.event)) {
        map.set(event.event, [...map.get(event.event), event.callback]);
      } else {
        map.set(event.event, [event.callback]);
      }
      return map;
    }, new Map());
  }

  get events(): Array<SwitchboardEventType> {
    return Array.from(new Set(this._events.map((e) => e.event)));
  }

  /** Adds a new event callback */
  on(event: SwitchboardEventType, callback: EventCallback): void {
    this._events.push({ event, callback });
  }

  /** Maps the event name to the array of callbacks and executes them concurrently */
  async handleMessage(
    event: SwitchboardEventType,
    payload: IEvent[SwitchboardEventType]
  ) {
    const callbacks = this.callbacks.get(event);
    if (!callbacks || callbacks.length === 0) {
      return;
    }

    await Promise.allSettled(
      callbacks.map((callback) => {
        callback(payload);
      })
    ).then((values) => {
      values.forEach((v) => {
        if (v.status === "rejected") {
          this.errorHandler(v.reason);
        }
      });
    });
  }
}

export class NearWebsocketListener extends NearEventListener {
  ws: ReconnectingWebSocket;

  constructor(
    readonly id: string,
    events: Array<ISwitchboardEvent>,
    errorHandler: (error: unknown) => Promise<void> | void,
    readonly programId: string = MAINNET_PROGRAM_ID,
    readonly url: string = "wss://events.near.stream/ws"
  ) {
    super(events, errorHandler);

    this.ws = new ReconnectingWebSocket(this.url, [], {
      WebSocket: ws,
      connectionTimeout: 4e3,
      debug: false,
      maxReconnectionDelay: 10e3,
      maxRetries: Infinity,
      minReconnectionDelay: 4e3,
      // startClosed: false,
    });

    // ERROR
    this.ws.addEventListener("error", (event) => {
      this.errorHandler(event.error);
    });

    // OPEN
    this.ws.addEventListener("open", (event) => this.start());

    // CLOSE
    // this.ws.addEventListener("close", (event) => this.start());

    // MESSAGE
    this.ws.addEventListener("message", (event) => {
      const parsedEvent: NearEventListenerMessage = JSON.parse(event.data);
      parsedEvent.events.map((e) => {
        this.handleMessage(e.event.event, e.event.data);
      });
    });
  }

  start(): void {
    this.ws.send(
      JSON.stringify({
        secret: this.id,
        fetch_past_events: 20,
        filter: Array.from(this.callbacks.keys()).map((e) => {
          return {
            status: "SUCCESS",
            account_id: this.programId,
            event: {
              standard: "nep297",
              event: e,
            },
          };
        }),
      })
    );
  }
}

export class NearLakeListener extends NearEventListener {
  constructor(
    events: Array<ISwitchboardEvent>,
    errorHandler: (error: unknown) => Promise<void> | void,
    readonly lakeConfig: nearLakeTypes.LakeConfig,
    readonly programId: string
  ) {
    super(events, errorHandler);
  }

  static async loadConfig(
    network: "testnet" | "mainnet"
  ): Promise<nearLakeTypes.LakeConfig> {
    const nearCon = await connect({
      headers: {},
      networkId: network,
      nodeUrl: `https://rpc.${network}.near.org`,
    });
    const startingBlock = (await nearCon.connection.provider.status()).sync_info
      .latest_block_height;
    const lakeConfig: nearLakeTypes.LakeConfig = {
      s3BucketName: `near-lake-data-${network}`,
      s3RegionName: "eu-central-1",
      startBlockHeight: startingBlock,
    };
    return lakeConfig;
  }

  static async fromNetwork(
    network: "testnet" | "mainnet",
    events: Array<ISwitchboardEvent>,
    errorHandler: EventErrorCallback,
    pid: string = getProgramId(network)
  ): Promise<NearLakeListener> {
    const lakeConfig = await NearLakeListener.loadConfig(network);
    return new NearLakeListener(events, errorHandler, lakeConfig, pid);
  }

  async start() {
    await startStream(
      this.lakeConfig,
      async (data: nearLakeTypes.StreamerMessage) => {
        try {
          // get all receipts
          const receipts: Array<ExecutionOutcomeWithReceipt> =
            data.shards.flatMap((shard) => shard.receiptExecutionOutcomes);

          // only get receipts with a success value and contains the program ID
          const filteredReceipts = receipts.filter(
            (r) =>
              r.receipt.receiverId === this.programId &&
              ("SuccessValue" in r.executionOutcome.outcome.status ||
                "SuccessReceiptId" in r.executionOutcome.outcome.status)
          );

          // iterate over receipts
          for await (const receipt of filteredReceipts) {
            // iterate over log entries
            for await (const log of receipt.executionOutcome.outcome.logs) {
              const matches = log.matchAll(
                /(?<=EVENT_JSON:)(?<event>{.+?})(?=,EVENT_JSON|$)/g
              );

              // iterate over matches
              for (const m of matches) {
                const eventJson = m.groups["event"];
                const event: {
                  standard: string;
                  version: string;
                  event: SwitchboardEventType;
                  data: IEvent[SwitchboardEventType];
                } = JSON.parse(eventJson);
                this.handleMessage(event.event, event.data);
              }
            }
          }
        } catch (error) {
          this.errorHandler(error);
        }
      }
    );
  }
}
