import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IViewJob {
  address: Uint8Array;
}

export interface ViewJobJSON {
  address: Array<number>;
}

export interface ViewJobSerde {
  address: Array<number>;
}

export class ViewJob implements IViewJob {
  readonly address: Uint8Array;

  constructor(fields: IViewJob) {
    this.address = fields.address;
  }

  toJSON(): ViewJobJSON {
    return {
      address: [...this.address],
    };
  }

  toSerde(): ViewJobSerde {
    return {
      address: [...this.address],
    };
  }

  static fromJSON(obj: ViewJobJSON) {
    return new ViewJob({
      address: new Uint8Array(obj.address),
    });
  }

  static fromSerde(obj: ViewJobSerde) {
    return new ViewJob({
      address: new Uint8Array(obj.address),
    });
  }
}
