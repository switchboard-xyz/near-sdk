import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICrankInit {
  address: Uint8Array;
  name: Uint8Array;
  metadata: Uint8Array;
  queue: Uint8Array;
  maxRows: BN;
}

export interface CrankInitJSON {
  address: Array<number>;
  name: Array<number>;
  metadata: Array<number>;
  queue: Array<number>;
  maxRows: string;
}

export interface CrankInitSerde {
  address: Array<number>;
  name: Array<number>;
  metadata: Array<number>;
  queue: Array<number>;
  max_rows: number;
}

export class CrankInit implements ICrankInit {
  readonly address: Uint8Array;
  readonly name: Uint8Array;
  readonly metadata: Uint8Array;
  readonly queue: Uint8Array;
  readonly maxRows: BN;

  constructor(fields: ICrankInit) {
    this.address = fields.address;
    this.name = fields.name;
    this.metadata = fields.metadata;
    this.queue = fields.queue;
    this.maxRows = fields.maxRows;
  }

  toJSON(): CrankInitJSON {
    return {
      address: [...this.address],
      name: [...this.name],
      metadata: [...this.metadata],
      queue: [...this.queue],
      maxRows: this.maxRows.toString(),
    };
  }

  toSerde(): CrankInitSerde {
    return {
      address: [...this.address],
      name: [...this.name],
      metadata: [...this.metadata],
      queue: [...this.queue],
      max_rows: this.maxRows.toNumber(),
    };
  }

  static fromJSON(obj: CrankInitJSON) {
    return new CrankInit({
      address: new Uint8Array(obj.address),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      queue: new Uint8Array(obj.queue),
      maxRows: new BN(obj.maxRows),
    });
  }

  static fromSerde(obj: CrankInitSerde) {
    return new CrankInit({
      address: new Uint8Array(obj.address),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      queue: new Uint8Array(obj.queue),
      maxRows: new BN(
        obj.max_rows.toLocaleString("fullwide", { useGrouping: false })
      ),
    });
  }
}
