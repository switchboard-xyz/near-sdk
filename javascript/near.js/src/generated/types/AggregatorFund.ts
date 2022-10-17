import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorFund {
  address: Uint8Array;
  funder: Uint8Array;
  amount: BN;
}

export interface AggregatorFundJSON {
  address: Array<number>;
  funder: Array<number>;
  amount: string;
}

export interface AggregatorFundSerde {
  address: Array<number>;
  funder: Array<number>;
  amount: string;
}

export class AggregatorFund implements IAggregatorFund {
  readonly address: Uint8Array;
  readonly funder: Uint8Array;
  readonly amount: BN;

  constructor(fields: IAggregatorFund) {
    this.address = fields.address;
    this.funder = fields.funder;
    this.amount = fields.amount;
  }

  toJSON(): AggregatorFundJSON {
    return {
      address: [...this.address],
      funder: [...this.funder],
      amount: this.amount.toString(),
    };
  }

  toSerde(): AggregatorFundSerde {
    return {
      address: [...this.address],
      funder: [...this.funder],
      amount: this.amount.toString(10),
    };
  }

  static fromJSON(obj: AggregatorFundJSON) {
    return new AggregatorFund({
      address: new Uint8Array(obj.address),
      funder: new Uint8Array(obj.funder),
      amount: new BN(obj.amount),
    });
  }

  static fromSerde(obj: AggregatorFundSerde) {
    return new AggregatorFund({
      address: new Uint8Array(obj.address),
      funder: new Uint8Array(obj.funder),
      amount: new BN(obj.amount),
    });
  }
}
