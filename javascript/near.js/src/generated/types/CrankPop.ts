import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICrankPop {
  crank: Uint8Array;
  rewardRecipient: Uint8Array;
}

export interface CrankPopJSON {
  crank: Array<number>;
  rewardRecipient: Array<number>;
}

export interface CrankPopBorsh {
  crank: Array<number>;
  reward_recipient: Array<number>;
}

export class CrankPop implements ICrankPop {
  readonly crank: Uint8Array;
  readonly rewardRecipient: Uint8Array;

  constructor(fields: ICrankPop) {
    this.crank = fields.crank;
    this.rewardRecipient = fields.rewardRecipient;
  }

  toJSON(): CrankPopJSON {
    return {
      crank: [...this.crank],
      rewardRecipient: [...this.rewardRecipient],
    };
  }

  toBorsh(): CrankPopBorsh {
    return {
      crank: [...this.crank],
      reward_recipient: [...this.rewardRecipient],
    };
  }

  static fromJSON(obj: CrankPopJSON) {
    return new CrankPop({
      crank: new Uint8Array(obj.crank),
      rewardRecipient: new Uint8Array(obj.rewardRecipient),
    });
  }

  static fromBorsh(obj: CrankPopBorsh) {
    return new CrankPop({
      crank: new Uint8Array(obj.crank),
      rewardRecipient: new Uint8Array(obj.reward_recipient),
    });
  }
}
