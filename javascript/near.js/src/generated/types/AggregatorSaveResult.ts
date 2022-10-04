import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorSaveResult {
  aggregatorKey: Uint8Array;
  oracleIdx: number;
  error: boolean;
  value: types.JsonDecimal;
  jobsChecksum: Uint8Array;
  minResponse: types.JsonDecimal;
  maxResponse: types.JsonDecimal;
}

export interface AggregatorSaveResultJSON {
  aggregatorKey: Array<number>;
  oracleIdx: number;
  error: boolean;
  value: types.JsonDecimalJSON;
  jobsChecksum: Array<number>;
  minResponse: types.JsonDecimalJSON;
  maxResponse: types.JsonDecimalJSON;
}

export interface AggregatorSaveResultSerde {
  aggregator_key: Array<number>;
  oracle_idx: number;
  error: boolean;
  value: types.JsonDecimalSerde;
  jobs_checksum: Array<number>;
  min_response: types.JsonDecimalSerde;
  max_response: types.JsonDecimalSerde;
}

export class AggregatorSaveResult implements IAggregatorSaveResult {
  readonly aggregatorKey: Uint8Array;
  readonly oracleIdx: number;
  readonly error: boolean;
  readonly value: types.JsonDecimal;
  readonly jobsChecksum: Uint8Array;
  readonly minResponse: types.JsonDecimal;
  readonly maxResponse: types.JsonDecimal;

  constructor(fields: IAggregatorSaveResult) {
    this.aggregatorKey = fields.aggregatorKey;
    this.oracleIdx = fields.oracleIdx;
    this.error = fields.error;
    this.value = fields.value;
    this.jobsChecksum = fields.jobsChecksum;
    this.minResponse = fields.minResponse;
    this.maxResponse = fields.maxResponse;
  }

  toJSON(): AggregatorSaveResultJSON {
    return {
      aggregatorKey: [...this.aggregatorKey],
      oracleIdx: this.oracleIdx,
      error: this.error,
      value: this.value.toJSON(),
      jobsChecksum: [...this.jobsChecksum],
      minResponse: this.minResponse.toJSON(),
      maxResponse: this.maxResponse.toJSON(),
    };
  }

  toSerde(): AggregatorSaveResultSerde {
    return {
      aggregator_key: [...this.aggregatorKey],
      oracle_idx: this.oracleIdx,
      error: this.error,
      value: this.value.toSerde(),
      jobs_checksum: [...this.jobsChecksum],
      min_response: this.minResponse.toSerde(),
      max_response: this.maxResponse.toSerde(),
    };
  }

  static fromJSON(obj: AggregatorSaveResultJSON) {
    return new AggregatorSaveResult({
      aggregatorKey: new Uint8Array(obj.aggregatorKey),
      oracleIdx: obj.oracleIdx,
      error: obj.error,
      value: types.JsonDecimal.fromJSON(obj.value),
      jobsChecksum: new Uint8Array(obj.jobsChecksum),
      minResponse: types.JsonDecimal.fromJSON(obj.minResponse),
      maxResponse: types.JsonDecimal.fromJSON(obj.maxResponse),
    });
  }

  static fromSerde(obj: AggregatorSaveResultSerde) {
    return new AggregatorSaveResult({
      aggregatorKey: new Uint8Array(obj.aggregator_key),
      oracleIdx: obj.oracle_idx,
      error: obj.error,
      value: types.JsonDecimal.fromSerde(obj.value),
      jobsChecksum: new Uint8Array(obj.jobs_checksum),
      minResponse: types.JsonDecimal.fromSerde(obj.min_response),
      maxResponse: types.JsonDecimal.fromSerde(obj.max_response),
    });
  }
}
