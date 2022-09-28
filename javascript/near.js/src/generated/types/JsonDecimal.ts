import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IJsonDecimal {
  mantissa: BN;
  scale: number;
}

export interface JsonDecimalJSON {
  mantissa: string;
  scale: number;
}

export interface JsonDecimalBorsh {
  mantissa: number;
  scale: number;
}

export class JsonDecimal implements IJsonDecimal {
  readonly mantissa: BN;
  readonly scale: number;

  constructor(fields: IJsonDecimal) {
    this.mantissa = fields.mantissa;
    this.scale = fields.scale;
  }

  toJSON(): JsonDecimalJSON {
    return {
      mantissa: this.mantissa.toString(),
      scale: this.scale,
    };
  }

  toBorsh(): JsonDecimalBorsh {
    return {
      mantissa: this.mantissa.toNumber(),
      scale: this.scale,
    };
  }

  static fromJSON(obj: JsonDecimalJSON) {
    return new JsonDecimal({
      mantissa: new BN(obj.mantissa),
      scale: obj.scale,
    });
  }

  static fromBorsh(obj: JsonDecimalBorsh) {
    return new JsonDecimal({
      mantissa: new BN(obj.mantissa),
      scale: obj.scale,
    });
  }
}
