import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IPermissionSet {
  address: Uint8Array;
  permission: number;
  enable: boolean;
}

export interface PermissionSetJSON {
  address: Array<number>;
  permission: number;
  enable: boolean;
}

export interface PermissionSetSerde {
  address: Array<number>;
  permission: number;
  enable: boolean;
}

export class PermissionSet implements IPermissionSet {
  readonly address: Uint8Array;
  readonly permission: number;
  readonly enable: boolean;

  constructor(fields: IPermissionSet) {
    this.address = fields.address;
    this.permission = fields.permission;
    this.enable = fields.enable;
  }

  toJSON(): PermissionSetJSON {
    return {
      address: [...this.address],
      permission: this.permission,
      enable: this.enable,
    };
  }

  toSerde(): PermissionSetSerde {
    return {
      address: [...this.address],
      permission: this.permission,
      enable: this.enable,
    };
  }

  static fromJSON(obj: PermissionSetJSON) {
    return new PermissionSet({
      address: new Uint8Array(obj.address),
      permission: obj.permission,
      enable: obj.enable,
    });
  }

  static fromSerde(obj: PermissionSetSerde) {
    return new PermissionSet({
      address: new Uint8Array(obj.address),
      permission: obj.permission,
      enable: obj.enable,
    });
  }
}
