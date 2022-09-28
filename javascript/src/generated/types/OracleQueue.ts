import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleQueue {
  address: Uint8Array;
  name: Uint8Array;
  metadata: Uint8Array;
  authority: string;
  oracleTimeout: number;
  reward: BN;
  minStake: BN;
  slashingEnabled: boolean;
  varianceToleranceMultiplier: types.SwitchboardDecimal;
  feedProbationPeriod: number;
  currIdx: BN;
  gcIdx: BN;
  consecutiveFeedFailureLimit: BN;
  consecutiveOracleFailureLimit: BN;
  unpermissionedFeedsEnabled: boolean;
  unpermissionedVrfEnabled: boolean;
  curatorRewardCut: types.SwitchboardDecimal;
  lockLeaseFunding: boolean;
  mint: string;
  enableBufferRelayers: boolean;
  maxSize: number;
  data: Array<Uint8Array>;
  maxGasCost: BN;
  creationTimestamp: BN;
  _ebuf: Uint8Array;
  features: Uint8Array;
}

export interface OracleQueueJSON {
  address: Array<number>;
  name: Array<number>;
  metadata: Array<number>;
  authority: string;
  oracleTimeout: number;
  reward: string;
  minStake: string;
  slashingEnabled: boolean;
  varianceToleranceMultiplier: types.SwitchboardDecimalJSON;
  feedProbationPeriod: number;
  currIdx: string;
  gcIdx: string;
  consecutiveFeedFailureLimit: string;
  consecutiveOracleFailureLimit: string;
  unpermissionedFeedsEnabled: boolean;
  unpermissionedVrfEnabled: boolean;
  curatorRewardCut: types.SwitchboardDecimalJSON;
  lockLeaseFunding: boolean;
  mint: string;
  enableBufferRelayers: boolean;
  maxSize: number;
  data: Array<Array<number>>;
  maxGasCost: string;
  creationTimestamp: string;
  _ebuf: Array<number>;
  features: Array<number>;
}

export interface OracleQueueBorsh {
  address: Array<number>;
  name: Array<number>;
  metadata: Array<number>;
  authority: string;
  oracle_timeout: number;
  reward: number;
  min_stake: number;
  slashing_enabled: boolean;
  variance_tolerance_multiplier: types.SwitchboardDecimalBorsh;
  feed_probation_period: number;
  curr_idx: number;
  gc_idx: number;
  consecutive_feed_failure_limit: number;
  consecutive_oracle_failure_limit: number;
  unpermissioned_feeds_enabled: boolean;
  unpermissioned_vrf_enabled: boolean;
  curator_reward_cut: types.SwitchboardDecimalBorsh;
  lock_lease_funding: boolean;
  mint: string;
  enable_buffer_relayers: boolean;
  max_size: number;
  data: Array<Array<number>>;
  max_gas_cost: number;
  creation_timestamp: number;
  _ebuf: Array<number>;
  features: Array<number>;
}

export class OracleQueue implements IOracleQueue {
  readonly address: Uint8Array;
  readonly name: Uint8Array;
  readonly metadata: Uint8Array;
  readonly authority: string;
  readonly oracleTimeout: number;
  readonly reward: BN;
  readonly minStake: BN;
  readonly slashingEnabled: boolean;
  readonly varianceToleranceMultiplier: types.SwitchboardDecimal;
  readonly feedProbationPeriod: number;
  readonly currIdx: BN;
  readonly gcIdx: BN;
  readonly consecutiveFeedFailureLimit: BN;
  readonly consecutiveOracleFailureLimit: BN;
  readonly unpermissionedFeedsEnabled: boolean;
  readonly unpermissionedVrfEnabled: boolean;
  readonly curatorRewardCut: types.SwitchboardDecimal;
  readonly lockLeaseFunding: boolean;
  readonly mint: string;
  readonly enableBufferRelayers: boolean;
  readonly maxSize: number;
  readonly data: Array<Uint8Array>;
  readonly maxGasCost: BN;
  readonly creationTimestamp: BN;
  readonly _ebuf: Uint8Array;
  readonly features: Uint8Array;

  constructor(fields: IOracleQueue) {
    this.address = fields.address;
    this.name = fields.name;
    this.metadata = fields.metadata;
    this.authority = fields.authority;
    this.oracleTimeout = fields.oracleTimeout;
    this.reward = fields.reward;
    this.minStake = fields.minStake;
    this.slashingEnabled = fields.slashingEnabled;
    this.varianceToleranceMultiplier = fields.varianceToleranceMultiplier;
    this.feedProbationPeriod = fields.feedProbationPeriod;
    this.currIdx = fields.currIdx;
    this.gcIdx = fields.gcIdx;
    this.consecutiveFeedFailureLimit = fields.consecutiveFeedFailureLimit;
    this.consecutiveOracleFailureLimit = fields.consecutiveOracleFailureLimit;
    this.unpermissionedFeedsEnabled = fields.unpermissionedFeedsEnabled;
    this.unpermissionedVrfEnabled = fields.unpermissionedVrfEnabled;
    this.curatorRewardCut = fields.curatorRewardCut;
    this.lockLeaseFunding = fields.lockLeaseFunding;
    this.mint = fields.mint;
    this.enableBufferRelayers = fields.enableBufferRelayers;
    this.maxSize = fields.maxSize;
    this.data = fields.data;
    this.maxGasCost = fields.maxGasCost;
    this.creationTimestamp = fields.creationTimestamp;
    this._ebuf = fields._ebuf;
    this.features = fields.features;
  }

  toJSON(): OracleQueueJSON {
    return {
      address: [...this.address],
      name: [...this.name],
      metadata: [...this.metadata],
      authority: this.authority,
      oracleTimeout: this.oracleTimeout,
      reward: this.reward.toString(),
      minStake: this.minStake.toString(),
      slashingEnabled: this.slashingEnabled,
      varianceToleranceMultiplier: this.varianceToleranceMultiplier.toJSON(),
      feedProbationPeriod: this.feedProbationPeriod,
      currIdx: this.currIdx.toString(),
      gcIdx: this.gcIdx.toString(),
      consecutiveFeedFailureLimit: this.consecutiveFeedFailureLimit.toString(),
      consecutiveOracleFailureLimit:
        this.consecutiveOracleFailureLimit.toString(),
      unpermissionedFeedsEnabled: this.unpermissionedFeedsEnabled,
      unpermissionedVrfEnabled: this.unpermissionedVrfEnabled,
      curatorRewardCut: this.curatorRewardCut.toJSON(),
      lockLeaseFunding: this.lockLeaseFunding,
      mint: this.mint,
      enableBufferRelayers: this.enableBufferRelayers,
      maxSize: this.maxSize,
      data: this.data.map((item) => [...item]),
      maxGasCost: this.maxGasCost.toString(),
      creationTimestamp: this.creationTimestamp.toString(),
      _ebuf: [...this._ebuf],
      features: [...this.features],
    };
  }

  toBorsh(): OracleQueueBorsh {
    return {
      address: [...this.address],
      name: [...this.name],
      metadata: [...this.metadata],
      authority: this.authority,
      oracle_timeout: this.oracleTimeout,
      reward: this.reward.toNumber(),
      min_stake: this.minStake.toNumber(),
      slashing_enabled: this.slashingEnabled,
      variance_tolerance_multiplier: this.varianceToleranceMultiplier.toBorsh(),
      feed_probation_period: this.feedProbationPeriod,
      curr_idx: this.currIdx.toNumber(),
      gc_idx: this.gcIdx.toNumber(),
      consecutive_feed_failure_limit:
        this.consecutiveFeedFailureLimit.toNumber(),
      consecutive_oracle_failure_limit:
        this.consecutiveOracleFailureLimit.toNumber(),
      unpermissioned_feeds_enabled: this.unpermissionedFeedsEnabled,
      unpermissioned_vrf_enabled: this.unpermissionedVrfEnabled,
      curator_reward_cut: this.curatorRewardCut.toBorsh(),
      lock_lease_funding: this.lockLeaseFunding,
      mint: this.mint,
      enable_buffer_relayers: this.enableBufferRelayers,
      max_size: this.maxSize,
      data: this.data.map((item) => [...item]),
      max_gas_cost: this.maxGasCost.toNumber(),
      creation_timestamp: this.creationTimestamp.toNumber(),
      _ebuf: [...this._ebuf],
      features: [...this.features],
    };
  }

  static fromJSON(obj: OracleQueueJSON) {
    return new OracleQueue({
      address: new Uint8Array(obj.address),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      authority: obj.authority,
      oracleTimeout: obj.oracleTimeout,
      reward: new BN(obj.reward),
      minStake: new BN(obj.minStake),
      slashingEnabled: obj.slashingEnabled,
      varianceToleranceMultiplier: types.SwitchboardDecimal.fromJSON(
        obj.varianceToleranceMultiplier
      ),
      feedProbationPeriod: obj.feedProbationPeriod,
      currIdx: new BN(obj.currIdx),
      gcIdx: new BN(obj.gcIdx),
      consecutiveFeedFailureLimit: new BN(obj.consecutiveFeedFailureLimit),
      consecutiveOracleFailureLimit: new BN(obj.consecutiveOracleFailureLimit),
      unpermissionedFeedsEnabled: obj.unpermissionedFeedsEnabled,
      unpermissionedVrfEnabled: obj.unpermissionedVrfEnabled,
      curatorRewardCut: types.SwitchboardDecimal.fromJSON(obj.curatorRewardCut),
      lockLeaseFunding: obj.lockLeaseFunding,
      mint: obj.mint,
      enableBufferRelayers: obj.enableBufferRelayers,
      maxSize: obj.maxSize,
      data: obj.data.map((item) => new Uint8Array(item)),
      maxGasCost: new BN(obj.maxGasCost),
      creationTimestamp: new BN(obj.creationTimestamp),
      _ebuf: new Uint8Array(obj._ebuf),
      features: new Uint8Array(obj.features),
    });
  }

  static fromBorsh(obj: OracleQueueBorsh) {
    return new OracleQueue({
      address: new Uint8Array(obj.address),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      authority: obj.authority,
      oracleTimeout: obj.oracle_timeout,
      reward: new BN(obj.reward),
      minStake: new BN(obj.min_stake),
      slashingEnabled: obj.slashing_enabled,
      varianceToleranceMultiplier: types.SwitchboardDecimal.fromBorsh(
        obj.variance_tolerance_multiplier
      ),
      feedProbationPeriod: obj.feed_probation_period,
      currIdx: new BN(obj.curr_idx),
      gcIdx: new BN(obj.gc_idx),
      consecutiveFeedFailureLimit: new BN(obj.consecutive_feed_failure_limit),
      consecutiveOracleFailureLimit: new BN(
        obj.consecutive_oracle_failure_limit
      ),
      unpermissionedFeedsEnabled: obj.unpermissioned_feeds_enabled,
      unpermissionedVrfEnabled: obj.unpermissioned_vrf_enabled,
      curatorRewardCut: types.SwitchboardDecimal.fromBorsh(
        obj.curator_reward_cut
      ),
      lockLeaseFunding: obj.lock_lease_funding,
      mint: obj.mint,
      enableBufferRelayers: obj.enable_buffer_relayers,
      maxSize: obj.max_size,
      data: obj.data.map((item) => new Uint8Array(item)),
      maxGasCost: new BN(obj.max_gas_cost),
      creationTimestamp: new BN(obj.creation_timestamp),
      _ebuf: new Uint8Array(obj._ebuf),
      features: new Uint8Array(obj.features),
    });
  }
}
