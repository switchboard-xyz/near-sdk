import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IEscrowInit {
  seed: Uint8Array;
  authority: string;
  mint: string;
}

export interface EscrowInitJSON {
  seed: Array<number>;
  authority: string;
  mint: string;
}

export interface EscrowInitSerde {
  seed: Array<number>;
  authority: string;
  mint: string;
}

export class EscrowInit implements IEscrowInit {
  readonly seed: Uint8Array;
  readonly authority: string;
  readonly mint: string;

  constructor(fields: IEscrowInit) {
    this.seed = fields.seed;
    this.authority = fields.authority;
    this.mint = fields.mint;
  }

  toJSON(): EscrowInitJSON {
    return {
      seed: [...this.seed],
      authority: this.authority,
      mint: this.mint,
    };
  }

  toSerde(): EscrowInitSerde {
    return {
      seed: [...this.seed],
      authority: this.authority,
      mint: this.mint,
    };
  }

  static fromJSON(obj: EscrowInitJSON) {
    return new EscrowInit({
      seed: new Uint8Array(obj.seed),
      authority: obj.authority,
      mint: obj.mint,
    });
  }

  static fromSerde(obj: EscrowInitSerde) {
    return new EscrowInit({
      seed: new Uint8Array(obj.seed),
      authority: obj.authority,
      mint: obj.mint,
    });
  }
}
