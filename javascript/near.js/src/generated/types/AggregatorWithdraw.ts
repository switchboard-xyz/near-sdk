import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorWithdraw {
  address: Uint8Array;
  destination: Uint8Array;
  amount: BN;
}

export interface AggregatorWithdrawJSON {
  address: Array<number>;
  destination: Array<number>;
  amount: string;
}

export interface AggregatorWithdrawSerde {
  address: Array<number>;
  destination: Array<number>;
  amount: string;
}

export class AggregatorWithdraw implements IAggregatorWithdraw {
  readonly address: Uint8Array;
  readonly destination: Uint8Array;
  readonly amount: BN;

  constructor(fields: IAggregatorWithdraw) {
    this.address = fields.address;
    this.destination = fields.destination;
    this.amount = fields.amount;
  }

  toJSON(): AggregatorWithdrawJSON {
    return {
      address: [...this.address],
      destination: [...this.destination],
      amount: this.amount.toString(),
    };
  }

  toSerde(): AggregatorWithdrawSerde {
    return {
      address: [...this.address],
      destination: [...this.destination],
      amount: this.amount.toString(10),
    };
  }

  static fromJSON(obj: AggregatorWithdrawJSON) {
    return new AggregatorWithdraw({
      address: new Uint8Array(obj.address),
      destination: new Uint8Array(obj.destination),
      amount: new BN(obj.amount),
    });
  }

  static fromSerde(obj: AggregatorWithdrawSerde) {
    return new AggregatorWithdraw({
      address: new Uint8Array(obj.address),
      destination: new Uint8Array(obj.destination),
      amount: new BN(obj.amount),
    });
  }
}
