import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleInit {
  address: Uint8Array;
  authority: string;
  queue: Uint8Array;
  name: Uint8Array;
  metadata: Uint8Array;
}

export interface OracleInitJSON {
  address: Array<number>;
  authority: string;
  queue: Array<number>;
  name: Array<number>;
  metadata: Array<number>;
}

export interface OracleInitSerde {
  address: Array<number>;
  authority: string;
  queue: Array<number>;
  name: Array<number>;
  metadata: Array<number>;
}

export class OracleInit implements IOracleInit {
  readonly address: Uint8Array;
  readonly authority: string;
  readonly queue: Uint8Array;
  readonly name: Uint8Array;
  readonly metadata: Uint8Array;

  constructor(fields: IOracleInit) {
    this.address = fields.address;
    this.authority = fields.authority;
    this.queue = fields.queue;
    this.name = fields.name;
    this.metadata = fields.metadata;
  }

  toJSON(): OracleInitJSON {
    return {
      address: [...this.address],
      authority: this.authority,
      queue: [...this.queue],
      name: [...this.name],
      metadata: [...this.metadata],
    };
  }

  toSerde(): OracleInitSerde {
    return {
      address: [...this.address],
      authority: this.authority,
      queue: [...this.queue],
      name: [...this.name],
      metadata: [...this.metadata],
    };
  }

  static fromJSON(obj: OracleInitJSON) {
    return new OracleInit({
      address: new Uint8Array(obj.address),
      authority: obj.authority,
      queue: new Uint8Array(obj.queue),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
    });
  }

  static fromSerde(obj: OracleInitSerde) {
    return new OracleInit({
      address: new Uint8Array(obj.address),
      authority: obj.authority,
      queue: new Uint8Array(obj.queue),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
    });
  }
}
