import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorOpenRound {
  aggregator: Uint8Array;
  jitter: number;
  rewardRecipient: Uint8Array;
}

export interface AggregatorOpenRoundJSON {
  aggregator: Array<number>;
  jitter: number;
  rewardRecipient: Array<number>;
}

export interface AggregatorOpenRoundSerde {
  aggregator: Array<number>;
  jitter: number;
  reward_recipient: Array<number>;
}

export class AggregatorOpenRound implements IAggregatorOpenRound {
  readonly aggregator: Uint8Array;
  readonly jitter: number;
  readonly rewardRecipient: Uint8Array;

  constructor(fields: IAggregatorOpenRound) {
    this.aggregator = fields.aggregator;
    this.jitter = fields.jitter;
    this.rewardRecipient = fields.rewardRecipient;
  }

  toJSON(): AggregatorOpenRoundJSON {
    return {
      aggregator: [...this.aggregator],
      jitter: this.jitter,
      rewardRecipient: [...this.rewardRecipient],
    };
  }

  toSerde(): AggregatorOpenRoundSerde {
    return {
      aggregator: [...this.aggregator],
      jitter: this.jitter,
      reward_recipient: [...this.rewardRecipient],
    };
  }

  static fromJSON(obj: AggregatorOpenRoundJSON) {
    return new AggregatorOpenRound({
      aggregator: new Uint8Array(obj.aggregator),
      jitter: obj.jitter,
      rewardRecipient: new Uint8Array(obj.rewardRecipient),
    });
  }

  static fromSerde(obj: AggregatorOpenRoundSerde) {
    return new AggregatorOpenRound({
      aggregator: new Uint8Array(obj.aggregator),
      jitter: obj.jitter,
      rewardRecipient: new Uint8Array(obj.reward_recipient),
    });
  }
}
