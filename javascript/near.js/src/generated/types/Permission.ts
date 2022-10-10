import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IPermission {
  authority: string;
  permissions: number;
  granter: Uint8Array;
  grantee: Uint8Array;
  expiration: BN;
  creationTimestamp: BN;
  updateTimestamp: BN;
  _ebuf: Uint8Array;
  features: Uint8Array;
}

export interface PermissionJSON {
  authority: string;
  permissions: number;
  granter: Array<number>;
  grantee: Array<number>;
  expiration: string;
  creationTimestamp: string;
  updateTimestamp: string;
  _ebuf: Array<number>;
  features: Array<number>;
}

export interface PermissionSerde {
  authority: string;
  permissions: number;
  granter: Array<number>;
  grantee: Array<number>;
  expiration: number;
  creation_timestamp: number;
  update_timestamp: number;
  _ebuf: Array<number>;
  features: Array<number>;
}

export class Permission implements IPermission {
  readonly authority: string;
  readonly permissions: number;
  readonly granter: Uint8Array;
  readonly grantee: Uint8Array;
  readonly expiration: BN;
  readonly creationTimestamp: BN;
  readonly updateTimestamp: BN;
  readonly _ebuf: Uint8Array;
  readonly features: Uint8Array;

  constructor(fields: IPermission) {
    this.authority = fields.authority;
    this.permissions = fields.permissions;
    this.granter = fields.granter;
    this.grantee = fields.grantee;
    this.expiration = fields.expiration;
    this.creationTimestamp = fields.creationTimestamp;
    this.updateTimestamp = fields.updateTimestamp;
    this._ebuf = fields._ebuf;
    this.features = fields.features;
  }

  toJSON(): PermissionJSON {
    return {
      authority: this.authority,
      permissions: this.permissions,
      granter: [...this.granter],
      grantee: [...this.grantee],
      expiration: this.expiration.toString(),
      creationTimestamp: this.creationTimestamp.toString(),
      updateTimestamp: this.updateTimestamp.toString(),
      _ebuf: [...this._ebuf],
      features: [...this.features],
    };
  }

  toSerde(): PermissionSerde {
    return {
      authority: this.authority,
      permissions: this.permissions,
      granter: [...this.granter],
      grantee: [...this.grantee],
      expiration: this.expiration.toNumber(),
      creation_timestamp: this.creationTimestamp.toNumber(),
      update_timestamp: this.updateTimestamp.toNumber(),
      _ebuf: [...this._ebuf],
      features: [...this.features],
    };
  }

  static fromJSON(obj: PermissionJSON) {
    return new Permission({
      authority: obj.authority,
      permissions: obj.permissions,
      granter: new Uint8Array(obj.granter),
      grantee: new Uint8Array(obj.grantee),
      expiration: new BN(obj.expiration),
      creationTimestamp: new BN(obj.creationTimestamp),
      updateTimestamp: new BN(obj.updateTimestamp),
      _ebuf: new Uint8Array(obj._ebuf),
      features: new Uint8Array(obj.features),
    });
  }

  static fromSerde(obj: PermissionSerde) {
    return new Permission({
      authority: obj.authority,
      permissions: obj.permissions,
      granter: new Uint8Array(obj.granter),
      grantee: new Uint8Array(obj.grantee),
      expiration: new BN(
        obj.expiration.toLocaleString("fullwide", { useGrouping: false })
      ),
      creationTimestamp: new BN(
        obj.creation_timestamp.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
      updateTimestamp: new BN(
        obj.update_timestamp.toLocaleString("fullwide", { useGrouping: false })
      ),
      _ebuf: new Uint8Array(obj._ebuf),
      features: new Uint8Array(obj.features),
    });
  }
}
