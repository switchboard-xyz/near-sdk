import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICrankView {
  address: Uint8Array;
  name: Uint8Array;
  metadata: Uint8Array;
  queue: Uint8Array;
  maxRows: BN;
  jitterModifier: number;
  data: Array<types.CrankRow>;
}

export interface CrankViewJSON {
  address: Array<number>;
  name: Array<number>;
  metadata: Array<number>;
  queue: Array<number>;
  maxRows: string;
  jitterModifier: number;
  data: Array<types.CrankRowJSON>;
}

export interface CrankViewSerde {
  address: Array<number>;
  name: Array<number>;
  metadata: Array<number>;
  queue: Array<number>;
  max_rows: number;
  jitter_modifier: number;
  data: Array<types.CrankRowSerde>;
}

export class CrankView implements ICrankView {
  readonly address: Uint8Array;
  readonly name: Uint8Array;
  readonly metadata: Uint8Array;
  readonly queue: Uint8Array;
  readonly maxRows: BN;
  readonly jitterModifier: number;
  readonly data: Array<types.CrankRow>;

  constructor(fields: ICrankView) {
    this.address = fields.address;
    this.name = fields.name;
    this.metadata = fields.metadata;
    this.queue = fields.queue;
    this.maxRows = fields.maxRows;
    this.jitterModifier = fields.jitterModifier;
    this.data = fields.data;
  }

  toJSON(): CrankViewJSON {
    return {
      address: [...this.address],
      name: [...this.name],
      metadata: [...this.metadata],
      queue: [...this.queue],
      maxRows: this.maxRows.toString(),
      jitterModifier: this.jitterModifier,
      data: this.data.map((item) => item.toJSON()),
    };
  }

  toSerde(): CrankViewSerde {
    return {
      address: [...this.address],
      name: [...this.name],
      metadata: [...this.metadata],
      queue: [...this.queue],
      max_rows: this.maxRows.toNumber(),
      jitter_modifier: this.jitterModifier,
      data: this.data.map((item) => item.toSerde()),
    };
  }

  static fromJSON(obj: CrankViewJSON) {
    return new CrankView({
      address: new Uint8Array(obj.address),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      queue: new Uint8Array(obj.queue),
      maxRows: new BN(obj.maxRows),
      jitterModifier: obj.jitterModifier,
      data: obj.data.map((item) => types.CrankRow.fromJSON(item)),
    });
  }

  static fromSerde(obj: CrankViewSerde) {
    return new CrankView({
      address: new Uint8Array(obj.address),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      queue: new Uint8Array(obj.queue),
      maxRows: new BN(
        obj.max_rows.toLocaleString("fullwide", { useGrouping: false })
      ),
      jitterModifier: obj.jitter_modifier,
      data: obj.data.map((item) => types.CrankRow.fromSerde(item)),
    });
  }
}
