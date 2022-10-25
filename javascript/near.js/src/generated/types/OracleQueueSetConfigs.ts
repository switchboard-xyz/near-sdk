import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleQueueSetConfigs {
  address: Uint8Array;
  authority: string | undefined;
  mint: string | undefined;
  name: Uint8Array | undefined;
  metadata: Uint8Array | undefined;
  reward: BN | undefined;
  minStake: BN | undefined;
  feedProbationPeriod: number | undefined;
  oracleTimeout: number | undefined;
  slashingEnabled: boolean | undefined;
  varianceToleranceMultiplier: types.SwitchboardDecimal | undefined;
  consecutiveFeedFailureLimit: BN | undefined;
  consecutiveOracleFailureLimit: BN | undefined;
  unpermissionedFeeds: boolean | undefined;
  unpermissionedVrf: boolean | undefined;
  enableBufferRelayers: boolean | undefined;
  maxGasCost: BN | undefined;
}

export interface OracleQueueSetConfigsJSON {
  address: Array<number>;
  authority: string | undefined;
  mint: string | undefined;
  name: Array<number> | undefined;
  metadata: Array<number> | undefined;
  reward: string | undefined;
  minStake: string | undefined;
  feedProbationPeriod: number | undefined;
  oracleTimeout: number | undefined;
  slashingEnabled: boolean | undefined;
  varianceToleranceMultiplier: types.SwitchboardDecimalJSON | undefined;
  consecutiveFeedFailureLimit: string | undefined;
  consecutiveOracleFailureLimit: string | undefined;
  unpermissionedFeeds: boolean | undefined;
  unpermissionedVrf: boolean | undefined;
  enableBufferRelayers: boolean | undefined;
  maxGasCost: string | undefined;
}

export interface OracleQueueSetConfigsSerde {
  address: Array<number>;
  authority: string | null;
  mint: string | null;
  name: Array<number> | null;
  metadata: Array<number> | null;
  reward: string | null;
  min_stake: string | null;
  feed_probation_period: number | null;
  oracle_timeout: number | null;
  slashing_enabled: boolean | null;
  variance_tolerance_multiplier: types.SwitchboardDecimalSerde | null;
  consecutive_feed_failure_limit: number | null;
  consecutive_oracle_failure_limit: number | null;
  unpermissioned_feeds: boolean | null;
  unpermissioned_vrf: boolean | null;
  enable_buffer_relayers: boolean | null;
  max_gas_cost: string | null;
}

export class OracleQueueSetConfigs implements IOracleQueueSetConfigs {
  readonly address: Uint8Array;
  readonly authority: string | undefined;
  readonly mint: string | undefined;
  readonly name: Uint8Array | undefined;
  readonly metadata: Uint8Array | undefined;
  readonly reward: BN | undefined;
  readonly minStake: BN | undefined;
  readonly feedProbationPeriod: number | undefined;
  readonly oracleTimeout: number | undefined;
  readonly slashingEnabled: boolean | undefined;
  readonly varianceToleranceMultiplier: types.SwitchboardDecimal | undefined;
  readonly consecutiveFeedFailureLimit: BN | undefined;
  readonly consecutiveOracleFailureLimit: BN | undefined;
  readonly unpermissionedFeeds: boolean | undefined;
  readonly unpermissionedVrf: boolean | undefined;
  readonly enableBufferRelayers: boolean | undefined;
  readonly maxGasCost: BN | undefined;

  constructor(fields: IOracleQueueSetConfigs) {
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
    this.unpermissionedFeeds = fields.unpermissionedFeeds;
    this.unpermissionedVrf = fields.unpermissionedVrf;
    this.enableBufferRelayers = fields.enableBufferRelayers;
    this.maxGasCost = fields.maxGasCost;
  }

  toJSON(): OracleQueueSetConfigsJSON {
    return {
      address: [...this.address],
      authority: this.authority,
      mint: this.mint,
      name: this.name ? [...this.name] : undefined,
      metadata: this.metadata ? [...this.metadata] : undefined,
      reward: this.reward ? this.reward.toString() : undefined,
      minStake: this.minStake ? this.minStake.toString() : undefined,
      feedProbationPeriod: this.feedProbationPeriod,
      oracleTimeout: this.oracleTimeout,
      slashingEnabled: this.slashingEnabled,
      varianceToleranceMultiplier: this.varianceToleranceMultiplier
        ? this.varianceToleranceMultiplier.toJSON()
        : undefined,
      consecutiveFeedFailureLimit: this.consecutiveFeedFailureLimit?.toString(),
      consecutiveOracleFailureLimit:
        this.consecutiveOracleFailureLimit?.toString(),
      unpermissionedFeeds: this.unpermissionedFeeds,
      unpermissionedVrf: this.unpermissionedVrf,
      enableBufferRelayers: this.enableBufferRelayers,
      maxGasCost: this.maxGasCost ? this.maxGasCost.toString() : undefined,
    };
  }

  toSerde(): OracleQueueSetConfigsSerde {
    return {
      address: [...this.address],
      authority: this.authority,
      mint: this.mint,
      name: this.name ? [...this.name] : null,
      metadata: this.metadata ? [...this.metadata] : null,
      reward: this.reward?.toString(10),
      min_stake: this.minStake?.toString(10),
      feed_probation_period: this.feedProbationPeriod,
      oracle_timeout: this.oracleTimeout,
      slashing_enabled: this.slashingEnabled,
      variance_tolerance_multiplier: this.varianceToleranceMultiplier
        ? this.varianceToleranceMultiplier.toSerde()
        : null,
      consecutive_feed_failure_limit:
        this.consecutiveFeedFailureLimit?.toNumber(),
      consecutive_oracle_failure_limit:
        this.consecutiveOracleFailureLimit?.toNumber(),
      unpermissioned_feeds: this.unpermissionedFeeds,
      unpermissioned_vrf: this.unpermissionedVrf,
      enable_buffer_relayers: this.enableBufferRelayers,
      max_gas_cost: this.maxGasCost?.toString(10),
    };
  }

  static fromJSON(obj: OracleQueueSetConfigsJSON) {
    return new OracleQueueSetConfigs({
      address: new Uint8Array(obj.address),
      authority: obj.authority,
      mint: obj.mint,
      name: new Uint8Array(obj.name ?? []),
      metadata: new Uint8Array(obj.metadata ?? []),
      reward: obj.reward ? new BN(obj.reward) : undefined,
      minStake: obj.minStake ? new BN(obj.minStake) : undefined,
      feedProbationPeriod: obj.feedProbationPeriod,
      oracleTimeout: obj.oracleTimeout,
      slashingEnabled: obj.slashingEnabled,
      varianceToleranceMultiplier: obj.varianceToleranceMultiplier
        ? types.SwitchboardDecimal.fromJSON(obj.varianceToleranceMultiplier)
        : undefined,
      consecutiveFeedFailureLimit: obj.consecutiveFeedFailureLimit
        ? new BN(obj.consecutiveFeedFailureLimit)
        : undefined,
      consecutiveOracleFailureLimit: obj.consecutiveOracleFailureLimit
        ? new BN(obj.consecutiveOracleFailureLimit)
        : undefined,
      unpermissionedFeeds: obj.unpermissionedFeeds,
      unpermissionedVrf: obj.unpermissionedVrf,
      enableBufferRelayers: obj.enableBufferRelayers,
      maxGasCost: obj.maxGasCost ? new BN(obj.maxGasCost) : undefined,
    });
  }

  static fromSerde(obj: OracleQueueSetConfigsSerde) {
    return new OracleQueueSetConfigs({
      address: new Uint8Array(obj.address),
      authority: obj.authority,
      mint: obj.mint,
      name: new Uint8Array(obj.name ?? []),
      metadata: new Uint8Array(obj.metadata ?? []),
      reward: obj.reward ? new BN(obj.reward) : null,
      minStake: obj.min_stake ? new BN(obj.min_stake) : null,
      feedProbationPeriod: obj.feed_probation_period,
      oracleTimeout: obj.oracle_timeout,
      slashingEnabled: obj.slashing_enabled,
      varianceToleranceMultiplier: obj.variance_tolerance_multiplier
        ? types.SwitchboardDecimal.fromSerde(obj.variance_tolerance_multiplier)
        : null,
      consecutiveFeedFailureLimit: obj.consecutive_feed_failure_limit
        ? new BN(obj.consecutive_feed_failure_limit)
        : null,
      consecutiveOracleFailureLimit: obj.consecutive_oracle_failure_limit
        ? new BN(obj.consecutive_oracle_failure_limit)
        : null,
      unpermissionedFeeds: obj.unpermissioned_feeds,
      unpermissionedVrf: obj.unpermissioned_vrf,
      enableBufferRelayers: obj.enable_buffer_relayers,
      maxGasCost: obj.max_gas_cost ? new BN(obj.max_gas_cost) : null,
    });
  }
}
