import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracle {
  address: Uint8Array;
  name: Uint8Array;
  metadata: Uint8Array;
  authority: string;
  lastHeartbeat: BN;
  numInUse: number;
  queue: Uint8Array;
  metrics: types.OracleMetrics;
  creationTimestamp: BN;
  totalDelegatedStake: BN;
  _ebuf: Uint8Array;
  features: Uint8Array;
}

export interface OracleJSON {
  address: Array<number>;
  name: Array<number>;
  metadata: Array<number>;
  authority: string;
  lastHeartbeat: string;
  numInUse: number;
  queue: Array<number>;
  metrics: types.OracleMetricsJSON;
  creationTimestamp: string;
  totalDelegatedStake: string;
  _ebuf: Array<number>;
  features: Array<number>;
}

export interface OracleSerde {
  address: Array<number>;
  name: Array<number>;
  metadata: Array<number>;
  authority: string;
  last_heartbeat: number;
  num_in_use: number;
  queue: Array<number>;
  metrics: types.OracleMetricsSerde;
  creation_timestamp: number;
  total_delegated_stake: number;
  _ebuf: Array<number>;
  features: Array<number>;
}

export class Oracle implements IOracle {
  readonly address: Uint8Array;
  readonly name: Uint8Array;
  readonly metadata: Uint8Array;
  readonly authority: string;
  readonly lastHeartbeat: BN;
  readonly numInUse: number;
  readonly queue: Uint8Array;
  readonly metrics: types.OracleMetrics;
  readonly creationTimestamp: BN;
  readonly totalDelegatedStake: BN;
  readonly _ebuf: Uint8Array;
  readonly features: Uint8Array;

  constructor(fields: IOracle) {
    this.address = fields.address;
    this.name = fields.name;
    this.metadata = fields.metadata;
    this.authority = fields.authority;
    this.lastHeartbeat = fields.lastHeartbeat;
    this.numInUse = fields.numInUse;
    this.queue = fields.queue;
    this.metrics = fields.metrics;
    this.creationTimestamp = fields.creationTimestamp;
    this.totalDelegatedStake = fields.totalDelegatedStake;
    this._ebuf = fields._ebuf;
    this.features = fields.features;
  }

  toJSON(): OracleJSON {
    return {
      address: [...this.address],
      name: [...this.name],
      metadata: [...this.metadata],
      authority: this.authority,
      lastHeartbeat: this.lastHeartbeat.toString(),
      numInUse: this.numInUse,
      queue: [...this.queue],
      metrics: this.metrics.toJSON(),
      creationTimestamp: this.creationTimestamp.toString(),
      totalDelegatedStake: this.totalDelegatedStake.toString(),
      _ebuf: [...this._ebuf],
      features: [...this.features],
    };
  }

  toSerde(): OracleSerde {
    return {
      address: [...this.address],
      name: [...this.name],
      metadata: [...this.metadata],
      authority: this.authority,
      last_heartbeat: this.lastHeartbeat.toNumber(),
      num_in_use: this.numInUse,
      queue: [...this.queue],
      metrics: this.metrics.toSerde(),
      creation_timestamp: this.creationTimestamp.toNumber(),
      total_delegated_stake: this.totalDelegatedStake.toNumber(),
      _ebuf: [...this._ebuf],
      features: [...this.features],
    };
  }

  static fromJSON(obj: OracleJSON) {
    return new Oracle({
      address: new Uint8Array(obj.address),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      authority: obj.authority,
      lastHeartbeat: new BN(obj.lastHeartbeat),
      numInUse: obj.numInUse,
      queue: new Uint8Array(obj.queue),
      metrics: types.OracleMetrics.fromJSON(obj.metrics),
      creationTimestamp: new BN(obj.creationTimestamp),
      totalDelegatedStake: new BN(obj.totalDelegatedStake),
      _ebuf: new Uint8Array(obj._ebuf),
      features: new Uint8Array(obj.features),
    });
  }

  static fromSerde(obj: OracleSerde) {
    return new Oracle({
      address: new Uint8Array(obj.address),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      authority: obj.authority,
      lastHeartbeat: new BN(
        obj.last_heartbeat.toLocaleString("fullwide", { useGrouping: false })
      ),
      numInUse: obj.num_in_use,
      queue: new Uint8Array(obj.queue),
      metrics: types.OracleMetrics.fromSerde(obj.metrics),
      creationTimestamp: new BN(
        obj.creation_timestamp.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
      totalDelegatedStake: new BN(
        obj.total_delegated_stake.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
      _ebuf: new Uint8Array(obj._ebuf),
      features: new Uint8Array(obj.features),
    });
  }
}
