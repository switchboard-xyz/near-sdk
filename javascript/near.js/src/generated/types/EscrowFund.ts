import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IEscrowFund {
  address: Uint8Array;
  amount: BN;
}

export interface EscrowFundJSON {
  address: Array<number>;
  amount: string;
}

export interface EscrowFundSerde {
  address: Array<number>;
  amount: string;
}

export class EscrowFund implements IEscrowFund {
  readonly address: Uint8Array;
  readonly amount: BN;

  constructor(fields: IEscrowFund) {
    this.address = fields.address;
    this.amount = fields.amount;
  }

  toJSON(): EscrowFundJSON {
    return {
      address: [...this.address],
      amount: this.amount.toString(),
    };
  }

  toSerde(): EscrowFundSerde {
    return {
      address: [...this.address],
      amount: this.amount.toString(10),
    };
  }

  static fromJSON(obj: EscrowFundJSON) {
    return new EscrowFund({
      address: new Uint8Array(obj.address),
      amount: new BN(obj.amount),
    });
  }

  static fromSerde(obj: EscrowFundSerde) {
    return new EscrowFund({
      address: new Uint8Array(obj.address),
      amount: new BN(obj.amount),
    });
  }
}
