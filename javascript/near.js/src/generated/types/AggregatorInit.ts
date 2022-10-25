import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorInit {
  address: Uint8Array;
  authority: string;
  queue: Uint8Array;
  name: Uint8Array;
  metadata: Uint8Array;
  batchSize: number;
  minOracleResults: number;
  minJobResults: number;
  minUpdateDelaySeconds: number;
  startAfter: BN;
  varianceThreshold: types.SwitchboardDecimal;
  forceReportPeriod: BN;
  expiration: BN;
  crank: Uint8Array;
  rewardEscrow: Uint8Array;
  maxGasCost: BN;
  readCharge: BN;
}

export interface AggregatorInitJSON {
  address: Array<number>;
  authority: string;
  queue: Array<number>;
  name: Array<number>;
  metadata: Array<number>;
  batchSize: number;
  minOracleResults: number;
  minJobResults: number;
  minUpdateDelaySeconds: number;
  startAfter: string;
  varianceThreshold: types.SwitchboardDecimalJSON;
  forceReportPeriod: string;
  expiration: string;
  crank: Array<number>;
  rewardEscrow: Array<number>;
  maxGasCost: string;
  readCharge: string;
}

export interface AggregatorInitSerde {
  address: Array<number>;
  authority: string;
  queue: Array<number>;
  name: Array<number>;
  metadata: Array<number>;
  batch_size: number;
  min_oracle_results: number;
  min_job_results: number;
  min_update_delay_seconds: number;
  start_after: number;
  variance_threshold: types.SwitchboardDecimalSerde;
  force_report_period: number;
  expiration: number;
  crank: Array<number>;
  reward_escrow: Array<number>;
  max_gas_cost: string;
  read_charge: string;
}

export class AggregatorInit implements IAggregatorInit {
  readonly address: Uint8Array;
  readonly authority: string;
  readonly queue: Uint8Array;
  readonly name: Uint8Array;
  readonly metadata: Uint8Array;
  readonly batchSize: number;
  readonly minOracleResults: number;
  readonly minJobResults: number;
  readonly minUpdateDelaySeconds: number;
  readonly startAfter: BN;
  readonly varianceThreshold: types.SwitchboardDecimal;
  readonly forceReportPeriod: BN;
  readonly expiration: BN;
  readonly crank: Uint8Array;
  readonly rewardEscrow: Uint8Array;
  readonly maxGasCost: BN;
  readonly readCharge: BN;

  constructor(fields: IAggregatorInit) {
    this.address = fields.address;
    this.authority = fields.authority;
    this.queue = fields.queue;
    this.name = fields.name;
    this.metadata = fields.metadata;
    this.batchSize = fields.batchSize;
    this.minOracleResults = fields.minOracleResults;
    this.minJobResults = fields.minJobResults;
    this.minUpdateDelaySeconds = fields.minUpdateDelaySeconds;
    this.startAfter = fields.startAfter;
    this.varianceThreshold = fields.varianceThreshold;
    this.forceReportPeriod = fields.forceReportPeriod;
    this.expiration = fields.expiration;
    this.crank = fields.crank;
    this.rewardEscrow = fields.rewardEscrow;
    this.maxGasCost = fields.maxGasCost;
    this.readCharge = fields.readCharge;
  }

  toJSON(): AggregatorInitJSON {
    return {
      address: [...this.address],
      authority: this.authority,
      queue: [...this.queue],
      name: [...this.name],
      metadata: [...this.metadata],
      batchSize: this.batchSize,
      minOracleResults: this.minOracleResults,
      minJobResults: this.minJobResults,
      minUpdateDelaySeconds: this.minUpdateDelaySeconds,
      startAfter: this.startAfter.toString(),
      varianceThreshold: this.varianceThreshold.toJSON(),
      forceReportPeriod: this.forceReportPeriod.toString(),
      expiration: this.expiration.toString(),
      crank: [...this.crank],
      rewardEscrow: [...this.rewardEscrow],
      maxGasCost: this.maxGasCost.toString(),
      readCharge: this.readCharge.toString(),
    };
  }

  toSerde(): AggregatorInitSerde {
    return {
      address: [...this.address],
      authority: this.authority,
      queue: [...this.queue],
      name: [...this.name],
      metadata: [...this.metadata],
      batch_size: this.batchSize,
      min_oracle_results: this.minOracleResults,
      min_job_results: this.minJobResults,
      min_update_delay_seconds: this.minUpdateDelaySeconds,
      start_after: this.startAfter.toNumber(),
      variance_threshold: this.varianceThreshold.toSerde(),
      force_report_period: this.forceReportPeriod.toNumber(),
      expiration: this.expiration.toNumber(),
      crank: [...this.crank],
      reward_escrow: [...this.rewardEscrow],
      max_gas_cost: this.maxGasCost.toString(10),
      read_charge: this.readCharge.toString(10),
    };
  }

  static fromJSON(obj: AggregatorInitJSON) {
    return new AggregatorInit({
      address: new Uint8Array(obj.address),
      authority: obj.authority,
      queue: new Uint8Array(obj.queue),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      batchSize: obj.batchSize,
      minOracleResults: obj.minOracleResults,
      minJobResults: obj.minJobResults,
      minUpdateDelaySeconds: obj.minUpdateDelaySeconds,
      startAfter: new BN(obj.startAfter),
      varianceThreshold: types.SwitchboardDecimal.fromJSON(
        obj.varianceThreshold
      ),
      forceReportPeriod: new BN(obj.forceReportPeriod),
      expiration: new BN(obj.expiration),
      crank: new Uint8Array(obj.crank),
      rewardEscrow: new Uint8Array(obj.rewardEscrow),
      maxGasCost: new BN(obj.maxGasCost),
      readCharge: new BN(obj.readCharge),
    });
  }

  static fromSerde(obj: AggregatorInitSerde) {
    return new AggregatorInit({
      address: new Uint8Array(obj.address),
      authority: obj.authority,
      queue: new Uint8Array(obj.queue),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      batchSize: obj.batch_size,
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
      crank: new Uint8Array(obj.crank),
      rewardEscrow: new Uint8Array(obj.reward_escrow),
      maxGasCost: new BN(obj.max_gas_cost),
      readCharge: new BN(obj.read_charge),
    });
  }
}
