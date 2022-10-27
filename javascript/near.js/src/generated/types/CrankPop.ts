import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ICrankPop {
  crank: Uint8Array;
  rewardRecipient: Uint8Array;
  popIdx: BN | undefined;
}

export interface CrankPopJSON {
  crank: Array<number>;
  rewardRecipient: Array<number>;
  popIdx: string | undefined;
}

export interface CrankPopSerde {
  crank: Array<number>;
  reward_recipient: Array<number>;
  pop_idx: number | null;
}

export class CrankPop implements ICrankPop {
  readonly crank: Uint8Array;
  readonly rewardRecipient: Uint8Array;
  readonly popIdx: BN | undefined;

  constructor(fields: ICrankPop) {
    this.crank = fields.crank;
    this.rewardRecipient = fields.rewardRecipient;
    this.popIdx = fields.popIdx;
  }

  toJSON(): CrankPopJSON {
    return {
      crank: [...this.crank],
      rewardRecipient: [...this.rewardRecipient],
      popIdx: this.popIdx?.toString(),
    };
  }

  toSerde(): CrankPopSerde {
    return {
      crank: [...this.crank],
      reward_recipient: [...this.rewardRecipient],
      pop_idx: this.popIdx?.toNumber(),
    };
  }

  static fromJSON(obj: CrankPopJSON) {
    return new CrankPop({
      crank: new Uint8Array(obj.crank),
      rewardRecipient: new Uint8Array(obj.rewardRecipient),
      popIdx: obj.popIdx ? new BN(obj.popIdx) : undefined,
    });
  }

  static fromSerde(obj: CrankPopSerde) {
    return new CrankPop({
      crank: new Uint8Array(obj.crank),
      rewardRecipient: new Uint8Array(obj.reward_recipient),
      popIdx: obj.pop_idx ? new BN(obj.pop_idx) : null,
    });
  }
}
