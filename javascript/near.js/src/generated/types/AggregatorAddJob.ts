import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorAddJob {
  address: Uint8Array;
  job: Uint8Array;
  weight: number;
}

export interface AggregatorAddJobJSON {
  address: Array<number>;
  job: Array<number>;
  weight: number;
}

export interface AggregatorAddJobBorsh {
  address: Array<number>;
  job: Array<number>;
  weight: number;
}

export class AggregatorAddJob implements IAggregatorAddJob {
  readonly address: Uint8Array;
  readonly job: Uint8Array;
  readonly weight: number;

  constructor(fields: IAggregatorAddJob) {
    this.address = fields.address;
    this.job = fields.job;
    this.weight = fields.weight;
  }

  toJSON(): AggregatorAddJobJSON {
    return {
      address: [...this.address],
      job: [...this.job],
      weight: this.weight,
    };
  }

  toBorsh(): AggregatorAddJobBorsh {
    return {
      address: [...this.address],
      job: [...this.job],
      weight: this.weight,
    };
  }

  static fromJSON(obj: AggregatorAddJobJSON) {
    return new AggregatorAddJob({
      address: new Uint8Array(obj.address),
      job: new Uint8Array(obj.job),
      weight: obj.weight,
    });
  }

  static fromBorsh(obj: AggregatorAddJobBorsh) {
    return new AggregatorAddJob({
      address: new Uint8Array(obj.address),
      job: new Uint8Array(obj.job),
      weight: obj.weight,
    });
  }
}
