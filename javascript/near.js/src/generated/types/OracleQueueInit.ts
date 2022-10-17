import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleQueueInit {
  address: Uint8Array;
  authority: string;
  mint: string;
  name: Uint8Array;
  metadata: Uint8Array;
  reward: BN;
  minStake: BN;
  feedProbationPeriod: number;
  oracleTimeout: number;
  slashingEnabled: boolean;
  varianceToleranceMultiplier: types.SwitchboardDecimal;
  consecutiveFeedFailureLimit: BN;
  consecutiveOracleFailureLimit: BN;
  queueSize: number;
  unpermissionedFeeds: boolean;
  unpermissionedVrf: boolean;
  enableBufferRelayers: boolean;
  maxGasCost: BN;
}

export interface OracleQueueInitJSON {
  address: Array<number>;
  authority: string;
  mint: string;
  name: Array<number>;
  metadata: Array<number>;
  reward: string;
  minStake: string;
  feedProbationPeriod: number;
  oracleTimeout: number;
  slashingEnabled: boolean;
  varianceToleranceMultiplier: types.SwitchboardDecimalJSON;
  consecutiveFeedFailureLimit: string;
  consecutiveOracleFailureLimit: string;
  queueSize: number;
  unpermissionedFeeds: boolean;
  unpermissionedVrf: boolean;
  enableBufferRelayers: boolean;
  maxGasCost: string;
}

export interface OracleQueueInitSerde {
  address: Array<number>;
  authority: string;
  mint: string;
  name: Array<number>;
  metadata: Array<number>;
  reward: string;
  min_stake: string;
  feed_probation_period: number;
  oracle_timeout: number;
  slashing_enabled: boolean;
  variance_tolerance_multiplier: types.SwitchboardDecimalSerde;
  consecutive_feed_failure_limit: number;
  consecutive_oracle_failure_limit: number;
  queue_size: number;
  unpermissioned_feeds: boolean;
  unpermissioned_vrf: boolean;
  enable_buffer_relayers: boolean;
  max_gas_cost: string;
}

export class OracleQueueInit implements IOracleQueueInit {
  readonly address: Uint8Array;
  readonly authority: string;
  readonly mint: string;
  readonly name: Uint8Array;
  readonly metadata: Uint8Array;
  readonly reward: BN;
  readonly minStake: BN;
  readonly feedProbationPeriod: number;
  readonly oracleTimeout: number;
  readonly slashingEnabled: boolean;
  readonly varianceToleranceMultiplier: types.SwitchboardDecimal;
  readonly consecutiveFeedFailureLimit: BN;
  readonly consecutiveOracleFailureLimit: BN;
  readonly queueSize: number;
  readonly unpermissionedFeeds: boolean;
  readonly unpermissionedVrf: boolean;
  readonly enableBufferRelayers: boolean;
  readonly maxGasCost: BN;

  constructor(fields: IOracleQueueInit) {
    this.address = fields.address;
    this.authority = fields.authority;
    this.mint = fields.mint;
    this.name = fields.name;
    this.metadata = fields.metadata;
    this.reward = fields.reward;
    this.minStake = fields.minStake;
    this.feedProbationPeriod = fields.feedProbationPeriod;
    this.oracleTimeout = fields.oracleTimeout;
    this.slashingEnabled = fields.slashingEnabled;
    this.varianceToleranceMultiplier = fields.varianceToleranceMultiplier;
    this.consecutiveFeedFailureLimit = fields.consecutiveFeedFailureLimit;
    this.consecutiveOracleFailureLimit = fields.consecutiveOracleFailureLimit;
    this.queueSize = fields.queueSize;
    this.unpermissionedFeeds = fields.unpermissionedFeeds;
    this.unpermissionedVrf = fields.unpermissionedVrf;
    this.enableBufferRelayers = fields.enableBufferRelayers;
    this.maxGasCost = fields.maxGasCost;
  }

  toJSON(): OracleQueueInitJSON {
    return {
      address: [...this.address],
      authority: this.authority,
      mint: this.mint,
      name: [...this.name],
      metadata: [...this.metadata],
      reward: this.reward.toString(),
      minStake: this.minStake.toString(),
      feedProbationPeriod: this.feedProbationPeriod,
      oracleTimeout: this.oracleTimeout,
      slashingEnabled: this.slashingEnabled,
      varianceToleranceMultiplier: this.varianceToleranceMultiplier.toJSON(),
      consecutiveFeedFailureLimit: this.consecutiveFeedFailureLimit.toString(),
      consecutiveOracleFailureLimit:
        this.consecutiveOracleFailureLimit.toString(),
      queueSize: this.queueSize,
      unpermissionedFeeds: this.unpermissionedFeeds,
      unpermissionedVrf: this.unpermissionedVrf,
      enableBufferRelayers: this.enableBufferRelayers,
      maxGasCost: this.maxGasCost.toString(),
    };
  }

  toSerde(): OracleQueueInitSerde {
    return {
      address: [...this.address],
      authority: this.authority,
      mint: this.mint,
      name: [...this.name],
      metadata: [...this.metadata],
      reward: this.reward.toString(10),
      min_stake: this.minStake.toString(10),
      feed_probation_period: this.feedProbationPeriod,
      oracle_timeout: this.oracleTimeout,
      slashing_enabled: this.slashingEnabled,
      variance_tolerance_multiplier: this.varianceToleranceMultiplier.toSerde(),
      consecutive_feed_failure_limit:
        this.consecutiveFeedFailureLimit.toNumber(),
      consecutive_oracle_failure_limit:
        this.consecutiveOracleFailureLimit.toNumber(),
      queue_size: this.queueSize,
      unpermissioned_feeds: this.unpermissionedFeeds,
      unpermissioned_vrf: this.unpermissionedVrf,
      enable_buffer_relayers: this.enableBufferRelayers,
      max_gas_cost: this.maxGasCost.toString(10),
    };
  }

  static fromJSON(obj: OracleQueueInitJSON) {
    return new OracleQueueInit({
      address: new Uint8Array(obj.address),
      authority: obj.authority,
      mint: obj.mint,
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      reward: new BN(obj.reward),
      minStake: new BN(obj.minStake),
      feedProbationPeriod: obj.feedProbationPeriod,
      oracleTimeout: obj.oracleTimeout,
      slashingEnabled: obj.slashingEnabled,
      varianceToleranceMultiplier: types.SwitchboardDecimal.fromJSON(
        obj.varianceToleranceMultiplier
      ),
      consecutiveFeedFailureLimit: new BN(obj.consecutiveFeedFailureLimit),
      consecutiveOracleFailureLimit: new BN(obj.consecutiveOracleFailureLimit),
      queueSize: obj.queueSize,
      unpermissionedFeeds: obj.unpermissionedFeeds,
      unpermissionedVrf: obj.unpermissionedVrf,
      enableBufferRelayers: obj.enableBufferRelayers,
      maxGasCost: new BN(obj.maxGasCost),
    });
  }

  static fromSerde(obj: OracleQueueInitSerde) {
    return new OracleQueueInit({
      address: new Uint8Array(obj.address),
      authority: obj.authority,
      mint: obj.mint,
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      reward: new BN(obj.reward),
      minStake: new BN(obj.min_stake),
      feedProbationPeriod: obj.feed_probation_period,
      oracleTimeout: obj.oracle_timeout,
      slashingEnabled: obj.slashing_enabled,
      varianceToleranceMultiplier: types.SwitchboardDecimal.fromSerde(
        obj.variance_tolerance_multiplier
      ),
      consecutiveFeedFailureLimit: new BN(
        obj.consecutive_feed_failure_limit.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
      consecutiveOracleFailureLimit: new BN(
        obj.consecutive_oracle_failure_limit.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
      queueSize: obj.queue_size,
      unpermissionedFeeds: obj.unpermissioned_feeds,
      unpermissionedVrf: obj.unpermissioned_vrf,
      enableBufferRelayers: obj.enable_buffer_relayers,
      maxGasCost: new BN(obj.max_gas_cost),
    });
  }
}
