import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICrank {
  address: Uint8Array;
  name: Uint8Array;
  metadata: Uint8Array;
  queue: Uint8Array;
  maxRows: BN;
  jitterModifier: number;
  data: Array<types.CrankRow>;
  creationTimestamp: BN;
  _ebuf: Uint8Array;
  features: Uint8Array;
}

export interface CrankJSON {
  address: Array<number>;
  name: Array<number>;
  metadata: Array<number>;
  queue: Array<number>;
  maxRows: string;
  jitterModifier: number;
  data: Array<types.CrankRowJSON>;
  creationTimestamp: string;
  _ebuf: Array<number>;
  features: Array<number>;
}

export interface CrankBorsh {
  address: Array<number>;
  name: Array<number>;
  metadata: Array<number>;
  queue: Array<number>;
  max_rows: number;
  jitter_modifier: number;
  data: Array<types.CrankRowBorsh>;
  creation_timestamp: number;
  _ebuf: Array<number>;
  features: Array<number>;
}

export class Crank implements ICrank {
  readonly address: Uint8Array;
  readonly name: Uint8Array;
  readonly metadata: Uint8Array;
  readonly queue: Uint8Array;
  readonly maxRows: BN;
  readonly jitterModifier: number;
  readonly data: Array<types.CrankRow>;
  readonly creationTimestamp: BN;
  readonly _ebuf: Uint8Array;
  readonly features: Uint8Array;

  constructor(fields: ICrank) {
    this.address = fields.address;
    this.name = fields.name;
    this.metadata = fields.metadata;
    this.queue = fields.queue;
    this.maxRows = fields.maxRows;
    this.jitterModifier = fields.jitterModifier;
    this.data = fields.data;
    this.creationTimestamp = fields.creationTimestamp;
    this._ebuf = fields._ebuf;
    this.features = fields.features;
  }

  toJSON(): CrankJSON {
    return {
      address: [...this.address],
      name: [...this.name],
      metadata: [...this.metadata],
      queue: [...this.queue],
      maxRows: this.maxRows.toString(),
      jitterModifier: this.jitterModifier,
      data: this.data.map((item) => item.toJSON()),
      creationTimestamp: this.creationTimestamp.toString(),
      _ebuf: [...this._ebuf],
      features: [...this.features],
    };
  }

  toBorsh(): CrankBorsh {
    return {
      address: [...this.address],
      name: [...this.name],
      metadata: [...this.metadata],
      queue: [...this.queue],
      max_rows: this.maxRows.toNumber(),
      jitter_modifier: this.jitterModifier,
      data: this.data.map((item) => item.toBorsh()),
      creation_timestamp: this.creationTimestamp.toNumber(),
      _ebuf: [...this._ebuf],
      features: [...this.features],
    };
  }

  static fromJSON(obj: CrankJSON) {
    return new Crank({
      address: new Uint8Array(obj.address),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      queue: new Uint8Array(obj.queue),
      maxRows: new BN(obj.maxRows),
      jitterModifier: obj.jitterModifier,
      data: obj.data.map((item) => types.CrankRow.fromJSON(item)),
      creationTimestamp: new BN(obj.creationTimestamp),
      _ebuf: new Uint8Array(obj._ebuf),
      features: new Uint8Array(obj.features),
    });
  }

  static fromBorsh(obj: CrankBorsh) {
    return new Crank({
      address: new Uint8Array(obj.address),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      queue: new Uint8Array(obj.queue),
      maxRows: new BN(obj.max_rows),
      jitterModifier: obj.jitter_modifier,
      data: obj.data.map((item) => types.CrankRow.fromBorsh(item)),
      creationTimestamp: new BN(obj.creation_timestamp),
      _ebuf: new Uint8Array(obj._ebuf),
      features: new Uint8Array(obj.features),
    });
  }
}
