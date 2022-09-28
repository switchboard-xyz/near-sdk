import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IViewPermission {
  address: Uint8Array;
}

export interface ViewPermissionJSON {
  address: Array<number>;
}

export interface ViewPermissionBorsh {
  address: Array<number>;
}

export class ViewPermission implements IViewPermission {
  readonly address: Uint8Array;

  constructor(fields: IViewPermission) {
    this.address = fields.address;
  }

  toJSON(): ViewPermissionJSON {
    return {
      address: [...this.address],
    };
  }

  toBorsh(): ViewPermissionBorsh {
    return {
      address: [...this.address],
    };
  }

  static fromJSON(obj: ViewPermissionJSON) {
    return new ViewPermission({
      address: new Uint8Array(obj.address),
    });
  }

  static fromBorsh(obj: ViewPermissionBorsh) {
    return new ViewPermission({
      address: new Uint8Array(obj.address),
    });
  }
}
