import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorRemoveJob {
  address: Uint8Array;
  idx: number;
}

export interface AggregatorRemoveJobJSON {
  address: Array<number>;
  idx: number;
}

export interface AggregatorRemoveJobBorsh {
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

  toBorsh(): AggregatorRemoveJobBorsh {
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

  static fromBorsh(obj: AggregatorRemoveJobBorsh) {
    return new AggregatorRemoveJob({
      address: new Uint8Array(obj.address),
      idx: obj.idx,
    });
  }
}
