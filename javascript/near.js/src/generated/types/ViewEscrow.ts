import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IViewEscrow {
  address: Uint8Array;
}

export interface ViewEscrowJSON {
  address: Array<number>;
}

export interface ViewEscrowSerde {
  address: Array<number>;
}

export class ViewEscrow implements IViewEscrow {
  readonly address: Uint8Array;

  constructor(fields: IViewEscrow) {
    this.address = fields.address;
  }

  toJSON(): ViewEscrowJSON {
    return {
      address: [...this.address],
    };
  }

  toSerde(): ViewEscrowSerde {
    return {
      address: [...this.address],
    };
  }

  static fromJSON(obj: ViewEscrowJSON) {
    return new ViewEscrow({
      address: new Uint8Array(obj.address),
    });
  }

  static fromSerde(obj: ViewEscrowSerde) {
    return new ViewEscrow({
      address: new Uint8Array(obj.address),
    });
  }
}
