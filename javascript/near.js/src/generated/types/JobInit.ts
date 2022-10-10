import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IJobInit {
  address: Uint8Array;
  authority: string;
  name: Uint8Array;
  metadata: Uint8Array;
  data: Uint8Array;
  expiration: BN;
}

export interface JobInitJSON {
  address: Array<number>;
  authority: string;
  name: Array<number>;
  metadata: Array<number>;
  data: Array<number>;
  expiration: string;
}

export interface JobInitSerde {
  address: Array<number>;
  authority: string;
  name: Array<number>;
  metadata: Array<number>;
  data: Array<number>;
  expiration: number;
}

export class JobInit implements IJobInit {
  readonly address: Uint8Array;
  readonly authority: string;
  readonly name: Uint8Array;
  readonly metadata: Uint8Array;
  readonly data: Uint8Array;
  readonly expiration: BN;

  constructor(fields: IJobInit) {
    this.address = fields.address;
    this.authority = fields.authority;
    this.name = fields.name;
    this.metadata = fields.metadata;
    this.data = fields.data;
    this.expiration = fields.expiration;
  }

  toJSON(): JobInitJSON {
    return {
      address: [...this.address],
      authority: this.authority,
      name: [...this.name],
      metadata: [...this.metadata],
      data: [...this.data],
      expiration: this.expiration.toString(),
    };
  }

  toSerde(): JobInitSerde {
    return {
      address: [...this.address],
      authority: this.authority,
      name: [...this.name],
      metadata: [...this.metadata],
      data: [...this.data],
      expiration: this.expiration.toNumber(),
    };
  }

  static fromJSON(obj: JobInitJSON) {
    return new JobInit({
      address: new Uint8Array(obj.address),
      authority: obj.authority,
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      data: new Uint8Array(obj.data),
      expiration: new BN(obj.expiration),
    });
  }

  static fromSerde(obj: JobInitSerde) {
    return new JobInit({
      address: new Uint8Array(obj.address),
      authority: obj.authority,
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      data: new Uint8Array(obj.data),
      expiration: new BN(
        obj.expiration.toLocaleString("fullwide", { useGrouping: false })
      ),
    });
  }
}
