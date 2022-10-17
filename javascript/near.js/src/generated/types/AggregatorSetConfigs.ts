import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorSetConfigs {
  address: Uint8Array;
  authority: string | undefined;
  queue: Uint8Array | undefined;
  name: Uint8Array | undefined;
  metadata: Uint8Array | undefined;
  batchSize: number | undefined;
  minOracleResults: number | undefined;
  minJobResults: number | undefined;
  minUpdateDelaySeconds: number | undefined;
  startAfter: BN | undefined;
  varianceThreshold: types.SwitchboardDecimal | undefined;
  forceReportPeriod: BN | undefined;
  crank: Uint8Array | undefined;
  rewardEscrow: Uint8Array | undefined;
  readCharge: BN | undefined;
}

export interface AggregatorSetConfigsJSON {
  address: Array<number>;
  authority: string | undefined;
  queue: Array<number> | undefined;
  name: Array<number> | undefined;
  metadata: Array<number> | undefined;
  batchSize: number | undefined;
  minOracleResults: number | undefined;
  minJobResults: number | undefined;
  minUpdateDelaySeconds: number | undefined;
  startAfter: string | undefined;
  varianceThreshold: types.SwitchboardDecimalJSON | undefined;
  forceReportPeriod: string | undefined;
  crank: Array<number> | undefined;
  rewardEscrow: Array<number> | undefined;
  readCharge: string | undefined;
}

export interface AggregatorSetConfigsSerde {
  address: Array<number>;
  authority: string | null;
  queue: Array<number> | null;
  name: Array<number> | null;
  metadata: Array<number> | null;
  batch_size: number | null;
  min_oracle_results: number | null;
  min_job_results: number | null;
  min_update_delay_seconds: number | null;
  start_after: number | null;
  variance_threshold: types.SwitchboardDecimalSerde | null;
  force_report_period: number | null;
  crank: Array<number> | null;
  reward_escrow: Array<number> | null;
  read_charge: string | null;
}

export class AggregatorSetConfigs implements IAggregatorSetConfigs {
  readonly address: Uint8Array;
  readonly authority: string | undefined;
  readonly queue: Uint8Array | undefined;
  readonly name: Uint8Array | undefined;
  readonly metadata: Uint8Array | undefined;
  readonly batchSize: number | undefined;
  readonly minOracleResults: number | undefined;
  readonly minJobResults: number | undefined;
  readonly minUpdateDelaySeconds: number | undefined;
  readonly startAfter: BN | undefined;
  readonly varianceThreshold: types.SwitchboardDecimal | undefined;
  readonly forceReportPeriod: BN | undefined;
  readonly crank: Uint8Array | undefined;
  readonly rewardEscrow: Uint8Array | undefined;
  readonly readCharge: BN | undefined;

  constructor(fields: IAggregatorSetConfigs) {
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
    this.crank = fields.crank;
    this.rewardEscrow = fields.rewardEscrow;
    this.readCharge = fields.readCharge;
  }

  toJSON(): AggregatorSetConfigsJSON {
    return {
      address: [...this.address],
      authority: this.authority,
      queue: this.queue ? [...this.queue] : undefined,
      name: this.name ? [...this.name] : undefined,
      metadata: this.metadata ? [...this.metadata] : undefined,
      batchSize: this.batchSize,
      minOracleResults: this.minOracleResults,
      minJobResults: this.minJobResults,
      minUpdateDelaySeconds: this.minUpdateDelaySeconds,
      startAfter: this.startAfter?.toString(),
      varianceThreshold: this.varianceThreshold
        ? this.varianceThreshold.toJSON()
        : undefined,
      forceReportPeriod: this.forceReportPeriod?.toString(),
      crank: this.crank ? [...this.crank] : undefined,
      rewardEscrow: this.rewardEscrow ? [...this.rewardEscrow] : undefined,
      readCharge: this.readCharge ? this.readCharge.toString() : undefined,
    };
  }

  toSerde(): AggregatorSetConfigsSerde {
    return {
      address: [...this.address],
      authority: this.authority,
      queue: this.queue ? [...this.queue] : null,
      name: this.name ? [...this.name] : null,
      metadata: this.metadata ? [...this.metadata] : null,
      batch_size: this.batchSize,
      min_oracle_results: this.minOracleResults,
      min_job_results: this.minJobResults,
      min_update_delay_seconds: this.minUpdateDelaySeconds,
      start_after: this.startAfter?.toNumber(),
      variance_threshold: this.varianceThreshold
        ? this.varianceThreshold.toSerde()
        : null,
      force_report_period: this.forceReportPeriod?.toNumber(),
      crank: this.crank ? [...this.crank] : null,
      reward_escrow: this.rewardEscrow ? [...this.rewardEscrow] : null,
      read_charge: this.readCharge?.toString(10),
    };
  }

  static fromJSON(obj: AggregatorSetConfigsJSON) {
    return new AggregatorSetConfigs({
      address: new Uint8Array(obj.address),
      authority: obj.authority,
      queue: new Uint8Array(obj.queue ?? []),
      name: new Uint8Array(obj.name ?? []),
      metadata: new Uint8Array(obj.metadata ?? []),
      batchSize: obj.batchSize,
      minOracleResults: obj.minOracleResults,
      minJobResults: obj.minJobResults,
      minUpdateDelaySeconds: obj.minUpdateDelaySeconds,
      startAfter: obj.startAfter ? new BN(obj.startAfter) : undefined,
      varianceThreshold: obj.varianceThreshold
        ? types.SwitchboardDecimal.fromJSON(obj.varianceThreshold)
        : undefined,
      forceReportPeriod: obj.forceReportPeriod
        ? new BN(obj.forceReportPeriod)
        : undefined,
      crank: new Uint8Array(obj.crank ?? []),
      rewardEscrow: new Uint8Array(obj.rewardEscrow ?? []),
      readCharge: obj.readCharge ? new BN(obj.readCharge) : undefined,
    });
  }

  static fromSerde(obj: AggregatorSetConfigsSerde) {
    return new AggregatorSetConfigs({
      address: new Uint8Array(obj.address),
      authority: obj.authority,
      queue: new Uint8Array(obj.queue ?? []),
      name: new Uint8Array(obj.name ?? []),
      metadata: new Uint8Array(obj.metadata ?? []),
      batchSize: obj.batch_size,
      minOracleResults: obj.min_oracle_results,
      minJobResults: obj.min_job_results,
      minUpdateDelaySeconds: obj.min_update_delay_seconds,
      startAfter: obj.start_after ? new BN(obj.start_after) : null,
      varianceThreshold: obj.variance_threshold
        ? types.SwitchboardDecimal.fromSerde(obj.variance_threshold)
        : null,
      forceReportPeriod: obj.force_report_period
        ? new BN(obj.force_report_period)
        : null,
      crank: new Uint8Array(obj.crank ?? []),
      rewardEscrow: new Uint8Array(obj.reward_escrow ?? []),
      readCharge: obj.read_charge ? new BN(obj.read_charge) : null,
    });
  }
}
