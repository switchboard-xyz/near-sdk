import { connect } from "near-api-js";
import { startStream, types as nearLakeTypes } from "near-lake-framework";
import * as types from "./generated/index.js";
import { MAINNET_PROGRAM_ID } from "./generated/programId.js";
import { WebSocket } from "ws";

export type SwitchboardEventType =
  | "AggregatorOpenRoundEvent"
  | "AggregatorValueUpdateEvent"
  | "OracleBootedEvent"
  | "OracleRewardEvent"
  | "OracleSlashEvent";

export type SwitchboardEventSerde =
  | types.AggregatorOpenRoundEventSerde
  | types.AggregatorValueUpdateEventSerde
  | types.OracleBootedEventSerde
  | types.OracleRewardEventSerde
  | types.OracleSlashEventSerde;

export interface NearEventListenerMessage<T extends SwitchboardEventSerde> {
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
      data: T;
    };
  }>;
}

// export interface OpenRoundMessage {
//   secret: string;
//   events: Array<{
//     block_height: string;
//     block_hash: string;
//     block_timestamp: string;
//     block_epoch_id: string;
//     receipt_id: string;
//     log_index: number;
//     predecessor_id: string;
//     account_id: string;
//     status: string;
//     event: {
//       standard: string;
//       version: string;
//       event: "AggregatorOpenRoundEvent";
//       data: types.AggregatorOpenRoundEventSerde;
//     };
//   }>;
// }

export type SwitchboardEventCallback<T extends SwitchboardEventSerde> = (
  event: T
) => void | Promise<void>;

export interface ISwitchboardEventCallback {
  AggregatorOpenRoundEvent?: SwitchboardEventCallback<types.AggregatorOpenRoundEventSerde>;
  AggregatorValueUpdateEvent?: SwitchboardEventCallback<types.AggregatorValueUpdateEventSerde>;
  OracleBootedEvent?: SwitchboardEventCallback<types.OracleBootedEventSerde>;
  OracleRewardEvent?: SwitchboardEventCallback<types.OracleRewardEventSerde>;
  OracleSlashEvent?: SwitchboardEventCallback<types.OracleSlashEventSerde>;
}

export abstract class SwitchboardEventListener {
  abstract id: string;
  abstract callbacks: ISwitchboardEventCallback;
  abstract programId: string;
  abstract errorHandler: (error: unknown) => Promise<void> | void;

  abstract start: (...args: any[]) => Promise<void> | void;

  get filter() {
    return Object.keys(this.callbacks).map((eventName) => {
      return {
        status: "SUCCESS",
        account_id: this.programId,
        event: {
          standard: "nep297",
          event: eventName,
        },
      };
    });
  }

  async handleMessage(
    message: NearEventListenerMessage<SwitchboardEventSerde>
  ) {
    if (message.secret === this.id && message.events.length > 0) {
      for await (const event of message.events) {
        if (event.event.event in this.callbacks) {
          try {
            await this.callbacks[event.event.event](event.event.data as any);
          } catch (error) {
            this.errorHandler(error);
          }
        }
      }
    }
  }
}

export class WebsocketEventListener extends SwitchboardEventListener {
  ws: WebSocket;

  constructor(
    readonly id: string,
    readonly callbacks: ISwitchboardEventCallback,
    readonly errorHandler: (error: unknown) => Promise<void> | void,
    readonly programId: string = MAINNET_PROGRAM_ID,
    readonly url: string = "wss://events.near.stream/ws"
  ) {
    super();
    const events = Object.keys(this.callbacks);
    if (events.length === 0) {
      throw new Error(`No events to watch`);
    }

    this.ws = new WebSocket(this.url);

    // these dont change

    // CLOSE
    this.ws.onclose = () => {
      setImmediate(() => this.start());
    };

    // MESSAGE
    this.ws.onmessage = async (e) => {
      const message: NearEventListenerMessage<SwitchboardEventSerde> =
        JSON.parse(e.data as any);
      this.handleMessage(message);
    };

    // ERROR
    this.ws.onerror = (err) => this.errorHandler;
  }

  start = () => {
    // OPEN
    this.ws.onopen = () => {
      this.ws.send(
        JSON.stringify({
          secret: this.id,
          filter: this.filter,
          fetch_past_events: 20,
        })
      );
    };
  };
}

// export class NearLakeEventListener extends SwitchboardEventListener {
//   constructor(
//     readonly id: string,
//     readonly callbacks: ISwitchboardEventCallback,
//     readonly programId: string = MAINNET_PROGRAM_ID,
//     readonly errorHandler: (error: unknown) => Promise<void> | void
//   ) {
//     super();
//   }

//   static async loadConfig(
//     network: "testnet" | "mainnet"
//   ): Promise<nearLakeTypes.LakeConfig> {
//     const nearCon = await connect({
//       headers: {},
//       networkId: network,
//       nodeUrl: `https://rpc.${network}.near.org`,
//     });
//     const startingBlock = (await nearCon.connection.provider.status()).sync_info
//       .latest_block_height;
//     const lakeConfig: nearLakeTypes.LakeConfig = {
//       s3BucketName: `near-lake-data-${network}`,
//       s3RegionName: "eu-central-1",
//       startBlockHeight: startingBlock,
//     };
//     return lakeConfig;
//   }

//   start = (
//     streamCallback: NearEventCallback,
//     errorHandler?: (error: unknown) => Promise<void> | void
//   ) => {
//     const processShard = async (
//       streamerMessage: nearLakeTypes.StreamerMessage
//     ): Promise<void> => {
//       try {
//         streamerMessage.shards
//           .flatMap((shard) => shard.receiptExecutionOutcomes)
//           .map(async (outcome) => {
//             if (
//               outcome.executionOutcome.outcome.executorId !== this.programId
//             ) {
//               return;
//             }

//             outcome.executionOutcome.outcome.logs.map((log: string) => {
//               if ("Failure" in outcome.executionOutcome.outcome.status) {
//                 return;
//               }
//               const matches = log.matchAll(
//                 /(?<=EVENT_JSON:)(?<event>{.+?})(?=,EVENT_JSON|$)/g
//               );
//               for (const m of matches) {
//                 const eventJson = m.groups["event"];
//                 const event = JSON.parse(eventJson);

//                 if (event.event_type !== this.eventType) {
//                   return;
//                 }

//                 streamCallback(event.event).catch(errorHandler);
//               }
//             });
//           });
//       } catch (error) {
//         if (errorHandler) {
//           errorHandler(error);
//         }
//       }
//     };
//     await startStream(this.lakeConfig, processShard);
//   };
// }

async function loadNearConf(
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

export type NearEventCallback = (...args: any[]) => Promise<void>;

export class NearEvent {
  constructor(
    readonly lakeConfig: nearLakeTypes.LakeConfig,
    readonly programId: string,
    readonly eventType: SwitchboardEventType
  ) {}

  static async fromNetwork(
    network: "testnet" | "mainnet",
    pid: string,
    eventType: SwitchboardEventType
  ): Promise<NearEvent> {
    const lakeConfig = await loadNearConf(network);

    return new NearEvent(lakeConfig, pid, eventType);
  }

  async start(
    streamCallback: NearEventCallback,
    errorHandler?: (error: unknown) => Promise<void> | void
  ): Promise<void> {
    // TODO: Match this logic for processing logs/events by action and success filter
    // https://github.com/near-examples/indexer-tx-watcher-example/blob/main/src/main.rs

    // Bug: We currently process events for failed transactions

    const processShard = async (
      streamerMessage: nearLakeTypes.StreamerMessage
    ): Promise<void> => {
      try {
        streamerMessage.shards
          .flatMap((shard) => shard.receiptExecutionOutcomes)
          .map(async (outcome) => {
            if (
              outcome.executionOutcome.outcome.executorId !== this.programId
            ) {
              return;
            }

            outcome.executionOutcome.outcome.logs.map((log: string) => {
              if ("Failure" in outcome.executionOutcome.outcome.status) {
                return;
              }
              const matches = log.matchAll(
                /(?<=EVENT_JSON:)(?<event>{.+?})(?=,EVENT_JSON|$)/g
              );
              for (const m of matches) {
                const eventJson = m.groups["event"];
                const event: {
                  standard: string;
                  version: string;
                  event: string;
                  data: Record<string, any>;
                } = JSON.parse(eventJson);
                if (event.event !== this.eventType) {
                  return;
                }

                streamCallback(event.data).catch(errorHandler);
              }
            });
          });
      } catch (error) {
        if (errorHandler) {
          errorHandler(error);
        }
      }
    };
    await startStream(this.lakeConfig, processShard);
  }
}
