import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IEscrowWithdraw {
  address: Uint8Array;
  amount: BN;
  destination: string;
}

export interface EscrowWithdrawJSON {
  address: Array<number>;
  amount: string;
  destination: string;
}

export interface EscrowWithdrawSerde {
  address: Array<number>;
  amount: number;
  destination: string;
}

export class EscrowWithdraw implements IEscrowWithdraw {
  readonly address: Uint8Array;
  readonly amount: BN;
  readonly destination: string;

  constructor(fields: IEscrowWithdraw) {
    this.address = fields.address;
    this.amount = fields.amount;
    this.destination = fields.destination;
  }

  toJSON(): EscrowWithdrawJSON {
    return {
      address: [...this.address],
      amount: this.amount.toString(),
      destination: this.destination,
    };
  }

  toSerde(): EscrowWithdrawSerde {
    return {
      address: [...this.address],
      amount: this.amount.toNumber(),
      destination: this.destination,
    };
  }

  static fromJSON(obj: EscrowWithdrawJSON) {
    return new EscrowWithdraw({
      address: new Uint8Array(obj.address),
      amount: new BN(obj.amount),
      destination: obj.destination,
    });
  }

  static fromSerde(obj: EscrowWithdrawSerde) {
    return new EscrowWithdraw({
      address: new Uint8Array(obj.address),
      amount: new BN(
        obj.amount.toLocaleString("fullwide", { useGrouping: false })
      ),
      destination: obj.destination,
    });
  }
}
