import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleUnstake {
  oracle: Uint8Array;
  destination: Uint8Array;
  amount: BN;
  delegate: boolean;
}

export interface OracleUnstakeJSON {
  oracle: Array<number>;
  destination: Array<number>;
  amount: string;
  delegate: boolean;
}

export interface OracleUnstakeSerde {
  oracle: Array<number>;
  destination: Array<number>;
  amount: string;
  delegate: boolean;
}

export class OracleUnstake implements IOracleUnstake {
  readonly oracle: Uint8Array;
  readonly destination: Uint8Array;
  readonly amount: BN;
  readonly delegate: boolean;

  constructor(fields: IOracleUnstake) {
    this.oracle = fields.oracle;
    this.destination = fields.destination;
    this.amount = fields.amount;
    this.delegate = fields.delegate;
  }

  toJSON(): OracleUnstakeJSON {
    return {
      oracle: [...this.oracle],
      destination: [...this.destination],
      amount: this.amount.toString(),
      delegate: this.delegate,
    };
  }

  toSerde(): OracleUnstakeSerde {
    return {
      oracle: [...this.oracle],
      destination: [...this.destination],
      amount: this.amount.toString(10),
      delegate: this.delegate,
    };
  }

  static fromJSON(obj: OracleUnstakeJSON) {
    return new OracleUnstake({
      oracle: new Uint8Array(obj.oracle),
      destination: new Uint8Array(obj.destination),
      amount: new BN(obj.amount),
      delegate: obj.delegate,
    });
  }

  static fromSerde(obj: OracleUnstakeSerde) {
    return new OracleUnstake({
      oracle: new Uint8Array(obj.oracle),
      destination: new Uint8Array(obj.destination),
      amount: new BN(obj.amount),
      delegate: obj.delegate,
    });
  }
}
