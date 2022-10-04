import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IPermissionInit {
  authority: string;
  granter: Uint8Array;
  grantee: Uint8Array;
}

export interface PermissionInitJSON {
  authority: string;
  granter: Array<number>;
  grantee: Array<number>;
}

export interface PermissionInitSerde {
  authority: string;
  granter: Array<number>;
  grantee: Array<number>;
}

export class PermissionInit implements IPermissionInit {
  readonly authority: string;
  readonly granter: Uint8Array;
  readonly grantee: Uint8Array;

  constructor(fields: IPermissionInit) {
    this.authority = fields.authority;
    this.granter = fields.granter;
    this.grantee = fields.grantee;
  }

  toJSON(): PermissionInitJSON {
    return {
      authority: this.authority,
      granter: [...this.granter],
      grantee: [...this.grantee],
    };
  }

  toSerde(): PermissionInitSerde {
    return {
      authority: this.authority,
      granter: [...this.granter],
      grantee: [...this.grantee],
    };
  }

  static fromJSON(obj: PermissionInitJSON) {
    return new PermissionInit({
      authority: obj.authority,
      granter: new Uint8Array(obj.granter),
      grantee: new Uint8Array(obj.grantee),
    });
  }

  static fromSerde(obj: PermissionInitSerde) {
    return new PermissionInit({
      authority: obj.authority,
      granter: new Uint8Array(obj.granter),
      grantee: new Uint8Array(obj.grantee),
    });
  }
}
