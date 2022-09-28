import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IViewOracle {
  address: Uint8Array;
}

export interface ViewOracleJSON {
  address: Array<number>;
}

export interface ViewOracleBorsh {
  address: Array<number>;
}

export class ViewOracle implements IViewOracle {
  readonly address: Uint8Array;

  constructor(fields: IViewOracle) {
    this.address = fields.address;
  }

  toJSON(): ViewOracleJSON {
    return {
      address: [...this.address],
    };
  }

  toBorsh(): ViewOracleBorsh {
    return {
      address: [...this.address],
    };
  }

  static fromJSON(obj: ViewOracleJSON) {
    return new ViewOracle({
      address: new Uint8Array(obj.address),
    });
  }

  static fromBorsh(obj: ViewOracleBorsh) {
    return new ViewOracle({
      address: new Uint8Array(obj.address),
    });
  }
}
