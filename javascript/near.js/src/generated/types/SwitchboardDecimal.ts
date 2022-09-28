import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ISwitchboardDecimal {
  mantissa: BN;
  scale: number;
}

export interface SwitchboardDecimalJSON {
  mantissa: string;
  scale: number;
}

export interface SwitchboardDecimalBorsh {
  mantissa: number;
  scale: number;
}

export class SwitchboardDecimal implements ISwitchboardDecimal {
  readonly mantissa: BN;
  readonly scale: number;

  constructor(fields: ISwitchboardDecimal) {
    this.mantissa = fields.mantissa;
    this.scale = fields.scale;
  }

  toJSON(): SwitchboardDecimalJSON {
    return {
      mantissa: this.mantissa.toString(),
      scale: this.scale,
    };
  }

  toBorsh(): SwitchboardDecimalBorsh {
    return {
      mantissa: this.mantissa.toNumber(),
      scale: this.scale,
    };
  }

  static fromJSON(obj: SwitchboardDecimalJSON) {
    return new SwitchboardDecimal({
      mantissa: new BN(obj.mantissa),
      scale: obj.scale,
    });
  }

  static fromBorsh(obj: SwitchboardDecimalBorsh) {
    return new SwitchboardDecimal({
      mantissa: new BN(obj.mantissa),
      scale: obj.scale,
    });
  }
}
