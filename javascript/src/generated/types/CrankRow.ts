import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICrankRow {
  uuid: Uint8Array;
  nextTimestamp: BN;
}

export interface CrankRowJSON {
  uuid: Array<number>;
  nextTimestamp: string;
}

export interface CrankRowBorsh {
  uuid: Array<number>;
  next_timestamp: number;
}

export class CrankRow implements ICrankRow {
  readonly uuid: Uint8Array;
  readonly nextTimestamp: BN;

  constructor(fields: ICrankRow) {
    this.uuid = fields.uuid;
    this.nextTimestamp = fields.nextTimestamp;
  }

  toJSON(): CrankRowJSON {
    return {
      uuid: [...this.uuid],
      nextTimestamp: this.nextTimestamp.toString(),
    };
  }

  toBorsh(): CrankRowBorsh {
    return {
      uuid: [...this.uuid],
      next_timestamp: this.nextTimestamp.toNumber(),
    };
  }

  static fromJSON(obj: CrankRowJSON) {
    return new CrankRow({
      uuid: new Uint8Array(obj.uuid),
      nextTimestamp: new BN(obj.nextTimestamp),
    });
  }

  static fromBorsh(obj: CrankRowBorsh) {
    return new CrankRow({
      uuid: new Uint8Array(obj.uuid),
      nextTimestamp: new BN(obj.next_timestamp),
    });
  }
}
