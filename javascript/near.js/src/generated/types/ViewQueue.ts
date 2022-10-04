import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IViewQueue {
  address: Uint8Array;
}

export interface ViewQueueJSON {
  address: Array<number>;
}

export interface ViewQueueSerde {
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

  toSerde(): ViewQueueSerde {
    return {
      address: [...this.address],
    };
  }

  static fromJSON(obj: ViewQueueJSON) {
    return new ViewQueue({
      address: new Uint8Array(obj.address),
    });
  }

  static fromSerde(obj: ViewQueueSerde) {
    return new ViewQueue({
      address: new Uint8Array(obj.address),
    });
  }
}
