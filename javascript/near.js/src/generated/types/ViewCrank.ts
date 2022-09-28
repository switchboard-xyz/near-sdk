import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IViewCrank {
  address: Uint8Array;
}

export interface ViewCrankJSON {
  address: Array<number>;
}

export interface ViewCrankBorsh {
  address: Array<number>;
}

export class ViewCrank implements IViewCrank {
  readonly address: Uint8Array;

  constructor(fields: IViewCrank) {
    this.address = fields.address;
  }

  toJSON(): ViewCrankJSON {
    return {
      address: [...this.address],
    };
  }

  toBorsh(): ViewCrankBorsh {
    return {
      address: [...this.address],
    };
  }

  static fromJSON(obj: ViewCrankJSON) {
    return new ViewCrank({
      address: new Uint8Array(obj.address),
    });
  }

  static fromBorsh(obj: ViewCrankBorsh) {
    return new ViewCrank({
      address: new Uint8Array(obj.address),
    });
  }
}
