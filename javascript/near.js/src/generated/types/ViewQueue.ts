import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IViewQueue {
  address: Uint8Array;
}

export interface ViewQueueJSON {
  address: Array<number>;
}

export interface ViewQueueBorsh {
  address: Array<number>;
}

export class ViewQueue implements IViewQueue {
  readonly address: Uint8Array;

  constructor(fields: IViewQueue) {
    this.address = fields.address;
  }

  toJSON(): ViewQueueJSON {
    return {
      address: [...this.address],
    };
  }

  toBorsh(): ViewQueueBorsh {
    return {
      address: [...this.address],
    };
  }

  static fromJSON(obj: ViewQueueJSON) {
    return new ViewQueue({
      address: new Uint8Array(obj.address),
    });
  }

  static fromBorsh(obj: ViewQueueBorsh) {
    return new ViewQueue({
      address: new Uint8Array(obj.address),
    });
  }
}
