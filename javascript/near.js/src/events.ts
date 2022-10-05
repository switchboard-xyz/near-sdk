import { connect } from "near-api-js";
import { startStream, types as nearLakeTypes } from "near-lake-framework";

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
    readonly pid: string,
    readonly eventType: string
  ) {}

  static async fromNetwork(
    network: "testnet" | "mainnet",
    pid: string,
    eventType: string
  ): Promise<NearEvent> {
    const lakeConfig = await loadNearConf(network);

    return new NearEvent(lakeConfig, pid, eventType);
  }

  async start(
    streamCallback: NearEventCallback,
    errorHandler?: (error: unknown) => Promise<void> | void
  ): Promise<void> {
    const processShard = async (
      streamerMessage: nearLakeTypes.StreamerMessage
    ): Promise<void> => {
      try {
        streamerMessage.shards
          .flatMap((shard) => shard.receiptExecutionOutcomes)
          .map(async (outcome) => {
            if (outcome.executionOutcome.outcome.executorId !== this.pid) {
              return;
            }

            outcome.executionOutcome.outcome.logs.map((log: string) => {
              const matches = log.matchAll(
                /(?<=EVENT_JSON:)(?<event>{.+?})(?=,EVENT_JSON|$)/g
              );
              for (const m of matches) {
                const eventJson = m.groups["event"];
                const event = JSON.parse(eventJson);
                if (event.event_type !== this.eventType) {
                  return;
                }

                streamCallback(event.event).catch(errorHandler);
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
