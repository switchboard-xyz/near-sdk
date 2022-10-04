import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorRemoveJob {
  address: Uint8Array;
  idx: number;
}

export interface AggregatorRemoveJobJSON {
  address: Array<number>;
  idx: number;
}

export interface AggregatorRemoveJobSerde {
  address: Array<number>;
  idx: number;
}

export class AggregatorRemoveJob implements IAggregatorRemoveJob {
  readonly address: Uint8Array;
  readonly idx: number;

  constructor(fields: IAggregatorRemoveJob) {
    this.address = fields.address;
    this.idx = fields.idx;
  }

  toJSON(): AggregatorRemoveJobJSON {
    return {
      address: [...this.address],
      idx: this.idx,
    };
  }

  toSerde(): AggregatorRemoveJobSerde {
    return {
      address: [...this.address],
      idx: this.idx,
    };
  }

  static fromJSON(obj: AggregatorRemoveJobJSON) {
    return new AggregatorRemoveJob({
      address: new Uint8Array(obj.address),
      idx: obj.idx,
    });
  }

  static fromSerde(obj: AggregatorRemoveJobSerde) {
    return new AggregatorRemoveJob({
      address: new Uint8Array(obj.address),
      idx: obj.idx,
    });
  }
}
