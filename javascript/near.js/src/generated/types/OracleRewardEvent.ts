import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleRewardEvent {
  feedKey: Uint8Array;
  oracleKey: Uint8Array;
  amount: BN;
  roundId: BN;
  timestamp: BN;
}

export interface OracleRewardEventJSON {
  feedKey: Array<number>;
  oracleKey: Array<number>;
  amount: string;
  roundId: string;
  timestamp: string;
}

export interface OracleRewardEventSerde {
  feed_key: Array<number>;
  oracle_key: Array<number>;
  amount: number;
  round_id: number;
  timestamp: number;
}

export class OracleRewardEvent implements IOracleRewardEvent {
  readonly feedKey: Uint8Array;
  readonly oracleKey: Uint8Array;
  readonly amount: BN;
  readonly roundId: BN;
  readonly timestamp: BN;

  constructor(fields: IOracleRewardEvent) {
    this.feedKey = fields.feedKey;
    this.oracleKey = fields.oracleKey;
    this.amount = fields.amount;
    this.roundId = fields.roundId;
    this.timestamp = fields.timestamp;
  }

  toJSON(): OracleRewardEventJSON {
    return {
      feedKey: [...this.feedKey],
      oracleKey: [...this.oracleKey],
      amount: this.amount.toString(),
      roundId: this.roundId.toString(),
      timestamp: this.timestamp.toString(),
    };
  }

  toSerde(): OracleRewardEventSerde {
    return {
      feed_key: [...this.feedKey],
      oracle_key: [...this.oracleKey],
      amount: this.amount.toNumber(),
      round_id: this.roundId.toNumber(),
      timestamp: this.timestamp.toNumber(),
    };
  }

  static fromJSON(obj: OracleRewardEventJSON) {
    return new OracleRewardEvent({
      feedKey: new Uint8Array(obj.feedKey),
      oracleKey: new Uint8Array(obj.oracleKey),
      amount: new BN(obj.amount),
      roundId: new BN(obj.roundId),
      timestamp: new BN(obj.timestamp),
    });
  }

  static fromSerde(obj: OracleRewardEventSerde) {
    return new OracleRewardEvent({
      feedKey: new Uint8Array(obj.feed_key),
      oracleKey: new Uint8Array(obj.oracle_key),
      amount: new BN(
        obj.amount.toLocaleString("fullwide", { useGrouping: false })
      ),
      roundId: new BN(
        obj.round_id.toLocaleString("fullwide", { useGrouping: false })
      ),
      timestamp: new BN(
        obj.timestamp.toLocaleString("fullwide", { useGrouping: false })
      ),
    });
  }
}
