import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IContract {
  state: types.State;
  aggregators: Map<Uint8Array, types.Aggregator>;
  queues: Map<Uint8Array, types.OracleQueue>;
  cranks: Map<Uint8Array, types.Crank>;
  oracles: Map<Uint8Array, types.Oracle>;
  jobs: Map<Uint8Array, types.Job>;
  permissions: Map<Uint8Array, types.Permission>;
  escrows: Map<Uint8Array, types.Escrow>;
  _emap: Map<Uint8Array, Uint8Array>;
}

export interface ContractJSON {
  state: types.StateJSON;
  aggregators: Map<Array<number>, types.AggregatorJSON>;
  queues: Map<Array<number>, types.OracleQueueJSON>;
  cranks: Map<Array<number>, types.CrankJSON>;
  oracles: Map<Array<number>, types.OracleJSON>;
  jobs: Map<Array<number>, types.JobJSON>;
  permissions: Map<Array<number>, types.PermissionJSON>;
  escrows: Map<Array<number>, types.EscrowJSON>;
  _emap: Map<Array<number>, Array<number>>;
}

export interface ContractSerde {
  state: types.StateSerde;
  aggregators: Map<Array<number>, types.AggregatorSerde>;
  queues: Map<Array<number>, types.OracleQueueSerde>;
  cranks: Map<Array<number>, types.CrankSerde>;
  oracles: Map<Array<number>, types.OracleSerde>;
  jobs: Map<Array<number>, types.JobSerde>;
  permissions: Map<Array<number>, types.PermissionSerde>;
  escrows: Map<Array<number>, types.EscrowSerde>;
  _emap: Map<Array<number>, Array<number>>;
}

export class Contract implements IContract {
  readonly state: types.State;
  readonly aggregators: Map<Uint8Array, types.Aggregator>;
  readonly queues: Map<Uint8Array, types.OracleQueue>;
  readonly cranks: Map<Uint8Array, types.Crank>;
  readonly oracles: Map<Uint8Array, types.Oracle>;
  readonly jobs: Map<Uint8Array, types.Job>;
  readonly permissions: Map<Uint8Array, types.Permission>;
  readonly escrows: Map<Uint8Array, types.Escrow>;
  readonly _emap: Map<Uint8Array, Uint8Array>;

  constructor(fields: IContract) {
    this.state = fields.state;
    this.aggregators = fields.aggregators;
    this.queues = fields.queues;
    this.cranks = fields.cranks;
    this.oracles = fields.oracles;
    this.jobs = fields.jobs;
    this.permissions = fields.permissions;
    this.escrows = fields.escrows;
    this._emap = fields._emap;
  }

  toJSON(): ContractJSON {
    return {
      state: this.state.toJSON(),
      aggregators: Object.fromEntries(this.aggregators),
      queues: Object.fromEntries(this.queues),
      cranks: Object.fromEntries(this.cranks),
      oracles: Object.fromEntries(this.oracles),
      jobs: Object.fromEntries(this.jobs),
      permissions: Object.fromEntries(this.permissions),
      escrows: Object.fromEntries(this.escrows),
      _emap: Object.fromEntries(this._emap),
    };
  }

  toSerde(): ContractSerde {
    return {
      state: this.state.toSerde(),
      aggregators: Object.fromEntries(this.aggregators),
      queues: Object.fromEntries(this.queues),
      cranks: Object.fromEntries(this.cranks),
      oracles: Object.fromEntries(this.oracles),
      jobs: Object.fromEntries(this.jobs),
      permissions: Object.fromEntries(this.permissions),
      escrows: Object.fromEntries(this.escrows),
      _emap: Object.fromEntries(this._emap),
    };
  }

  static fromJSON(obj: ContractJSON) {
    return new Contract({
      state: types.State.fromJSON(obj.state),
      aggregators: new Map(
        Array.from(obj.aggregators.entries()).map(([k, v]) => [
          new Uint8Array(k),
          types.Aggregator.fromJSON(v),
        ])
      ),
      queues: new Map(
        Array.from(obj.queues.entries()).map(([k, v]) => [
          new Uint8Array(k),
          types.OracleQueue.fromJSON(v),
        ])
      ),
      cranks: new Map(
        Array.from(obj.cranks.entries()).map(([k, v]) => [
          new Uint8Array(k),
          types.Crank.fromJSON(v),
        ])
      ),
      oracles: new Map(
        Array.from(obj.oracles.entries()).map(([k, v]) => [
          new Uint8Array(k),
          types.Oracle.fromJSON(v),
        ])
      ),
      jobs: new Map(
        Array.from(obj.jobs.entries()).map(([k, v]) => [
          new Uint8Array(k),
          types.Job.fromJSON(v),
        ])
      ),
      permissions: new Map(
        Array.from(obj.permissions.entries()).map(([k, v]) => [
          new Uint8Array(k),
          types.Permission.fromJSON(v),
        ])
      ),
      escrows: new Map(
        Array.from(obj.escrows.entries()).map(([k, v]) => [
          new Uint8Array(k),
          types.Escrow.fromJSON(v),
        ])
      ),
      _emap: new Map(
        Array.from(obj._emap.entries()).map(([k, v]) => [
          new Uint8Array(k),
          new Uint8Array(v),
        ])
      ),
    });
  }

  static fromSerde(obj: ContractSerde) {
    return new Contract({
      state: types.State.fromSerde(obj.state),
      aggregators: new Map(
        Array.from(obj.aggregators.entries()).map(([k, v]) => [
          new Uint8Array(k),
          types.Aggregator.fromSerde(v),
        ])
      ),
      queues: new Map(
        Array.from(obj.queues.entries()).map(([k, v]) => [
          new Uint8Array(k),
          types.OracleQueue.fromSerde(v),
        ])
      ),
      cranks: new Map(
        Array.from(obj.cranks.entries()).map(([k, v]) => [
          new Uint8Array(k),
          types.Crank.fromSerde(v),
        ])
      ),
      oracles: new Map(
        Array.from(obj.oracles.entries()).map(([k, v]) => [
          new Uint8Array(k),
          types.Oracle.fromSerde(v),
        ])
      ),
      jobs: new Map(
        Array.from(obj.jobs.entries()).map(([k, v]) => [
          new Uint8Array(k),
          types.Job.fromSerde(v),
        ])
      ),
      permissions: new Map(
        Array.from(obj.permissions.entries()).map(([k, v]) => [
          new Uint8Array(k),
          types.Permission.fromSerde(v),
        ])
      ),
      escrows: new Map(
        Array.from(obj.escrows.entries()).map(([k, v]) => [
          new Uint8Array(k),
          types.Escrow.fromSerde(v),
        ])
      ),
      _emap: new Map(
        Array.from(obj._emap.entries()).map(([k, v]) => [
          new Uint8Array(k),
          new Uint8Array(v),
        ])
      ),
    });
  }
}
