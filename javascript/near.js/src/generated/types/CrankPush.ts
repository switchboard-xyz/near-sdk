import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICrankPush {
  crank: Uint8Array;
  aggregator: Uint8Array;
}

export interface CrankPushJSON {
  crank: Array<number>;
  aggregator: Array<number>;
}

export interface CrankPushBorsh {
  crank: Array<number>;
  aggregator: Array<number>;
}

export class CrankPush implements ICrankPush {
  readonly crank: Uint8Array;
  readonly aggregator: Uint8Array;

  constructor(fields: ICrankPush) {
    this.crank = fields.crank;
    this.aggregator = fields.aggregator;
  }

  toJSON(): CrankPushJSON {
    return {
      crank: [...this.crank],
      aggregator: [...this.aggregator],
    };
  }

  toBorsh(): CrankPushBorsh {
    return {
      crank: [...this.crank],
      aggregator: [...this.aggregator],
    };
  }

  static fromJSON(obj: CrankPushJSON) {
    return new CrankPush({
      crank: new Uint8Array(obj.crank),
      aggregator: new Uint8Array(obj.aggregator),
    });
  }

  static fromBorsh(obj: CrankPushBorsh) {
    return new CrankPush({
      crank: new Uint8Array(obj.crank),
      aggregator: new Uint8Array(obj.aggregator),
    });
  }
}
