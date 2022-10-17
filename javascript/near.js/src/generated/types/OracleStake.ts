import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleStake {
  address: Uint8Array;
  funder: Uint8Array;
  amount: BN;
}

export interface OracleStakeJSON {
  address: Array<number>;
  funder: Array<number>;
  amount: string;
}

export interface OracleStakeSerde {
  address: Array<number>;
  funder: Array<number>;
  amount: string;
}

export class OracleStake implements IOracleStake {
  readonly address: Uint8Array;
  readonly funder: Uint8Array;
  readonly amount: BN;

  constructor(fields: IOracleStake) {
    this.address = fields.address;
    this.funder = fields.funder;
    this.amount = fields.amount;
  }

  toJSON(): OracleStakeJSON {
    return {
      address: [...this.address],
      funder: [...this.funder],
      amount: this.amount.toString(),
    };
  }

  toSerde(): OracleStakeSerde {
    return {
      address: [...this.address],
      funder: [...this.funder],
      amount: this.amount.toString(10),
    };
  }

  static fromJSON(obj: OracleStakeJSON) {
    return new OracleStake({
      address: new Uint8Array(obj.address),
      funder: new Uint8Array(obj.funder),
      amount: new BN(obj.amount),
    });
  }

  static fromSerde(obj: OracleStakeSerde) {
    return new OracleStake({
      address: new Uint8Array(obj.address),
      funder: new Uint8Array(obj.funder),
      amount: new BN(obj.amount),
    });
  }
}
