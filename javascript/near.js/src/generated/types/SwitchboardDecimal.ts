import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ISwitchboardDecimal {
  mantissa: BN;
  scale: number;
}

export interface SwitchboardDecimalJSON {
  mantissa: string;
  scale: number;
}

export interface SwitchboardDecimalSerde {
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

  toSerde(): SwitchboardDecimalSerde {
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

  static fromSerde(obj: SwitchboardDecimalSerde) {
    return new SwitchboardDecimal({
      mantissa: new BN(
        obj.mantissa.toLocaleString("fullwide", { useGrouping: false })
      ),
      scale: obj.scale,
    });
  }
}
