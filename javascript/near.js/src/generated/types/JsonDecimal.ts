import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IJsonDecimal {
  mantissa: BN;
  scale: number;
}

export interface JsonDecimalJSON {
  mantissa: string;
  scale: number;
}

export interface JsonDecimalSerde {
  mantissa: string;
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

  toSerde(): JsonDecimalSerde {
    return {
      mantissa: this.mantissa.toString(10),
      scale: this.scale,
    };
  }

  static fromJSON(obj: JsonDecimalJSON) {
    return new JsonDecimal({
      mantissa: new BN(obj.mantissa),
      scale: obj.scale,
    });
  }

  static fromSerde(obj: JsonDecimalSerde) {
    return new JsonDecimal({
      mantissa: new BN(obj.mantissa),
      scale: obj.scale,
    });
  }
}
