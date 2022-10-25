import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorView {
  address: Uint8Array;
  name: Uint8Array;
  metadata: Uint8Array;
  queue: Uint8Array;
  oracleRequestBatchSize: number;
  minOracleResults: number;
  minJobResults: number;
  minUpdateDelaySeconds: number;
  startAfter: BN;
  varianceThreshold: types.SwitchboardDecimal;
  forceReportPeriod: BN;
  expiration: BN;
  consecutiveFailureCount: BN;
  nextAllowedUpdateTime: BN;
  isLocked: boolean;
  crank: Uint8Array;
  crankRowCount: number;
  latestConfirmedRound: types.AggregatorRound;
  currentRound: types.AggregatorRound;
  jobs: Array<Uint8Array>;
  jobsChecksum: Uint8Array;
  authority: string;
  historyLimit: BN;
  previousConfirmedRoundResult: types.SwitchboardDecimal;
  previousConfirmedRoundSlot: BN;
  jobWeights: Uint8Array;
  creationTimestamp: BN;
  readCharge: BN;
  rewardEscrow: Uint8Array;
}

export interface AggregatorViewJSON {
  address: Array<number>;
  name: Array<number>;
  metadata: Array<number>;
  queue: Array<number>;
  oracleRequestBatchSize: number;
  minOracleResults: number;
  minJobResults: number;
  minUpdateDelaySeconds: number;
  startAfter: string;
  varianceThreshold: types.SwitchboardDecimalJSON;
  forceReportPeriod: string;
  expiration: string;
  consecutiveFailureCount: string;
  nextAllowedUpdateTime: string;
  isLocked: boolean;
  crank: Array<number>;
  crankRowCount: number;
  latestConfirmedRound: types.AggregatorRoundJSON;
  currentRound: types.AggregatorRoundJSON;
  jobs: Array<Array<number>>;
  jobsChecksum: Array<number>;
  authority: string;
  historyLimit: string;
  previousConfirmedRoundResult: types.SwitchboardDecimalJSON;
  previousConfirmedRoundSlot: string;
  jobWeights: Array<number>;
  creationTimestamp: string;
  readCharge: string;
  rewardEscrow: Array<number>;
}

export interface AggregatorViewSerde {
  address: Array<number>;
  name: Array<number>;
  metadata: Array<number>;
  queue: Array<number>;
  oracle_request_batch_size: number;
  min_oracle_results: number;
  min_job_results: number;
  min_update_delay_seconds: number;
  start_after: number;
  variance_threshold: types.SwitchboardDecimalSerde;
  force_report_period: number;
  expiration: number;
  consecutive_failure_count: number;
  next_allowed_update_time: number;
  is_locked: boolean;
  crank: Array<number>;
  crank_row_count: number;
  latest_confirmed_round: types.AggregatorRoundSerde;
  current_round: types.AggregatorRoundSerde;
  jobs: Array<Array<number>>;
  jobs_checksum: Array<number>;
  authority: string;
  history_limit: number;
  previous_confirmed_round_result: types.SwitchboardDecimalSerde;
  previous_confirmed_round_slot: number;
  job_weights: Array<number>;
  creation_timestamp: number;
  read_charge: number;
  reward_escrow: Array<number>;
}

export class AggregatorView implements IAggregatorView {
  readonly address: Uint8Array;
  readonly name: Uint8Array;
  readonly metadata: Uint8Array;
  readonly queue: Uint8Array;
  readonly oracleRequestBatchSize: number;
  readonly minOracleResults: number;
  readonly minJobResults: number;
  readonly minUpdateDelaySeconds: number;
  readonly startAfter: BN;
  readonly varianceThreshold: types.SwitchboardDecimal;
  readonly forceReportPeriod: BN;
  readonly expiration: BN;
  readonly consecutiveFailureCount: BN;
  readonly nextAllowedUpdateTime: BN;
  readonly isLocked: boolean;
  readonly crank: Uint8Array;
  readonly crankRowCount: number;
  readonly latestConfirmedRound: types.AggregatorRound;
  readonly currentRound: types.AggregatorRound;
  readonly jobs: Array<Uint8Array>;
  readonly jobsChecksum: Uint8Array;
  readonly authority: string;
  readonly historyLimit: BN;
  readonly previousConfirmedRoundResult: types.SwitchboardDecimal;
  readonly previousConfirmedRoundSlot: BN;
  readonly jobWeights: Uint8Array;
  readonly creationTimestamp: BN;
  readonly readCharge: BN;
  readonly rewardEscrow: Uint8Array;

  constructor(fields: IAggregatorView) {
    this.address = fields.address;
    this.name = fields.name;
    this.metadata = fields.metadata;
    this.queue = fields.queue;
    this.oracleRequestBatchSize = fields.oracleRequestBatchSize;
    this.minOracleResults = fields.minOracleResults;
    this.minJobResults = fields.minJobResults;
    this.minUpdateDelaySeconds = fields.minUpdateDelaySeconds;
    this.startAfter = fields.startAfter;
    this.varianceThreshold = fields.varianceThreshold;
    this.forceReportPeriod = fields.forceReportPeriod;
    this.expiration = fields.expiration;
    this.consecutiveFailureCount = fields.consecutiveFailureCount;
    this.nextAllowedUpdateTime = fields.nextAllowedUpdateTime;
    this.isLocked = fields.isLocked;
    this.crank = fields.crank;
    this.crankRowCount = fields.crankRowCount;
    this.latestConfirmedRound = fields.latestConfirmedRound;
    this.currentRound = fields.currentRound;
    this.jobs = fields.jobs;
    this.jobsChecksum = fields.jobsChecksum;
    this.authority = fields.authority;
    this.historyLimit = fields.historyLimit;
    this.previousConfirmedRoundResult = fields.previousConfirmedRoundResult;
    this.previousConfirmedRoundSlot = fields.previousConfirmedRoundSlot;
    this.jobWeights = fields.jobWeights;
    this.creationTimestamp = fields.creationTimestamp;
    this.readCharge = fields.readCharge;
    this.rewardEscrow = fields.rewardEscrow;
  }

  toJSON(): AggregatorViewJSON {
    return {
      address: [...this.address],
      name: [...this.name],
      metadata: [...this.metadata],
      queue: [...this.queue],
      oracleRequestBatchSize: this.oracleRequestBatchSize,
      minOracleResults: this.minOracleResults,
      minJobResults: this.minJobResults,
      minUpdateDelaySeconds: this.minUpdateDelaySeconds,
      startAfter: this.startAfter.toString(),
      varianceThreshold: this.varianceThreshold.toJSON(),
      forceReportPeriod: this.forceReportPeriod.toString(),
      expiration: this.expiration.toString(),
      consecutiveFailureCount: this.consecutiveFailureCount.toString(),
      nextAllowedUpdateTime: this.nextAllowedUpdateTime.toString(),
      isLocked: this.isLocked,
      crank: [...this.crank],
      crankRowCount: this.crankRowCount,
      latestConfirmedRound: this.latestConfirmedRound.toJSON(),
      currentRound: this.currentRound.toJSON(),
      jobs: this.jobs.map((item) => [...item]),
      jobsChecksum: [...this.jobsChecksum],
      authority: this.authority,
      historyLimit: this.historyLimit.toString(),
      previousConfirmedRoundResult: this.previousConfirmedRoundResult.toJSON(),
      previousConfirmedRoundSlot: this.previousConfirmedRoundSlot.toString(),
      jobWeights: [...this.jobWeights],
      creationTimestamp: this.creationTimestamp.toString(),
      readCharge: this.readCharge.toString(),
      rewardEscrow: [...this.rewardEscrow],
    };
  }

  toSerde(): AggregatorViewSerde {
    return {
      address: [...this.address],
      name: [...this.name],
      metadata: [...this.metadata],
      queue: [...this.queue],
      oracle_request_batch_size: this.oracleRequestBatchSize,
      min_oracle_results: this.minOracleResults,
      min_job_results: this.minJobResults,
      min_update_delay_seconds: this.minUpdateDelaySeconds,
      start_after: this.startAfter.toNumber(),
      variance_threshold: this.varianceThreshold.toSerde(),
      force_report_period: this.forceReportPeriod.toNumber(),
      expiration: this.expiration.toNumber(),
      consecutive_failure_count: this.consecutiveFailureCount.toNumber(),
      next_allowed_update_time: this.nextAllowedUpdateTime.toNumber(),
      is_locked: this.isLocked,
      crank: [...this.crank],
      crank_row_count: this.crankRowCount,
      latest_confirmed_round: this.latestConfirmedRound.toSerde(),
      current_round: this.currentRound.toSerde(),
      jobs: this.jobs.map((item) => [...item]),
      jobs_checksum: [...this.jobsChecksum],
      authority: this.authority,
      history_limit: this.historyLimit.toNumber(),
      previous_confirmed_round_result:
        this.previousConfirmedRoundResult.toSerde(),
      previous_confirmed_round_slot: this.previousConfirmedRoundSlot.toNumber(),
      job_weights: [...this.jobWeights],
      creation_timestamp: this.creationTimestamp.toNumber(),
      read_charge: this.readCharge.toNumber(),
      reward_escrow: [...this.rewardEscrow],
    };
  }

  static fromJSON(obj: AggregatorViewJSON) {
    return new AggregatorView({
      address: new Uint8Array(obj.address),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      queue: new Uint8Array(obj.queue),
      oracleRequestBatchSize: obj.oracleRequestBatchSize,
      minOracleResults: obj.minOracleResults,
      minJobResults: obj.minJobResults,
      minUpdateDelaySeconds: obj.minUpdateDelaySeconds,
      startAfter: new BN(obj.startAfter),
      varianceThreshold: types.SwitchboardDecimal.fromJSON(
        obj.varianceThreshold
      ),
      forceReportPeriod: new BN(obj.forceReportPeriod),
      expiration: new BN(obj.expiration),
      consecutiveFailureCount: new BN(obj.consecutiveFailureCount),
      nextAllowedUpdateTime: new BN(obj.nextAllowedUpdateTime),
      isLocked: obj.isLocked,
      crank: new Uint8Array(obj.crank),
      crankRowCount: obj.crankRowCount,
      latestConfirmedRound: types.AggregatorRound.fromJSON(
        obj.latestConfirmedRound
      ),
      currentRound: types.AggregatorRound.fromJSON(obj.currentRound),
      jobs: obj.jobs.map((item) => new Uint8Array(item)),
      jobsChecksum: new Uint8Array(obj.jobsChecksum),
      authority: obj.authority,
      historyLimit: new BN(obj.historyLimit),
      previousConfirmedRoundResult: types.SwitchboardDecimal.fromJSON(
        obj.previousConfirmedRoundResult
      ),
      previousConfirmedRoundSlot: new BN(obj.previousConfirmedRoundSlot),
      jobWeights: new Uint8Array(obj.jobWeights),
      creationTimestamp: new BN(obj.creationTimestamp),
      readCharge: new BN(obj.readCharge),
      rewardEscrow: new Uint8Array(obj.rewardEscrow),
    });
  }

  static fromSerde(obj: AggregatorViewSerde) {
    return new AggregatorView({
      address: new Uint8Array(obj.address),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      queue: new Uint8Array(obj.queue),
      oracleRequestBatchSize: obj.oracle_request_batch_size,
      minOracleResults: obj.min_oracle_results,
      minJobResults: obj.min_job_results,
      minUpdateDelaySeconds: obj.min_update_delay_seconds,
      startAfter: new BN(
        obj.start_after.toLocaleString("fullwide", { useGrouping: false })
      ),
      varianceThreshold: types.SwitchboardDecimal.fromSerde(
        obj.variance_threshold
      ),
      forceReportPeriod: new BN(
        obj.force_report_period.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
      expiration: new BN(
        obj.expiration.toLocaleString("fullwide", { useGrouping: false })
      ),
      consecutiveFailureCount: new BN(
        obj.consecutive_failure_count.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
      nextAllowedUpdateTime: new BN(
        obj.next_allowed_update_time.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
      isLocked: obj.is_locked,
      crank: new Uint8Array(obj.crank),
      crankRowCount: obj.crank_row_count,
      latestConfirmedRound: types.AggregatorRound.fromSerde(
        obj.latest_confirmed_round
      ),
      currentRound: types.AggregatorRound.fromSerde(obj.current_round),
      jobs: obj.jobs.map((item) => new Uint8Array(item)),
      jobsChecksum: new Uint8Array(obj.jobs_checksum),
      authority: obj.authority,
      historyLimit: new BN(
        obj.history_limit.toLocaleString("fullwide", { useGrouping: false })
      ),
      previousConfirmedRoundResult: types.SwitchboardDecimal.fromSerde(
        obj.previous_confirmed_round_result
      ),
      previousConfirmedRoundSlot: new BN(
        obj.previous_confirmed_round_slot.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
      jobWeights: new Uint8Array(obj.job_weights),
      creationTimestamp: new BN(
        obj.creation_timestamp.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
      readCharge: new BN(
        obj.read_charge.toLocaleString("fullwide", { useGrouping: false })
      ),
      rewardEscrow: new Uint8Array(obj.reward_escrow),
    });
  }
}
