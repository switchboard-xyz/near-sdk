import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleSlashEvent {
  feed: Uint8Array;
  oracle: Uint8Array;
  amount: BN;
  roundId: BN;
  timestamp: BN;
}

export interface OracleSlashEventJSON {
  feed: Array<number>;
  oracle: Array<number>;
  amount: string;
  roundId: string;
  timestamp: string;
}

export interface OracleSlashEventSerde {
  feed: Array<number>;
  oracle: Array<number>;
  amount: number;
  round_id: number;
  timestamp: number;
}

export class OracleSlashEvent implements IOracleSlashEvent {
  readonly feed: Uint8Array;
  readonly oracle: Uint8Array;
  readonly amount: BN;
  readonly roundId: BN;
  readonly timestamp: BN;

  constructor(fields: IOracleSlashEvent) {
    this.feed = fields.feed;
    this.oracle = fields.oracle;
    this.amount = fields.amount;
    this.roundId = fields.roundId;
    this.timestamp = fields.timestamp;
  }

  toJSON(): OracleSlashEventJSON {
    return {
      feed: [...this.feed],
      oracle: [...this.oracle],
      amount: this.amount.toString(),
      roundId: this.roundId.toString(),
      timestamp: this.timestamp.toString(),
    };
  }

  toSerde(): OracleSlashEventSerde {
    return {
      feed: [...this.feed],
      oracle: [...this.oracle],
      amount: this.amount.toNumber(),
      round_id: this.roundId.toNumber(),
      timestamp: this.timestamp.toNumber(),
    };
  }

  static fromJSON(obj: OracleSlashEventJSON) {
    return new OracleSlashEvent({
      feed: new Uint8Array(obj.feed),
      oracle: new Uint8Array(obj.oracle),
      amount: new BN(obj.amount),
      roundId: new BN(obj.roundId),
      timestamp: new BN(obj.timestamp),
    });
  }

  static fromSerde(obj: OracleSlashEventSerde) {
    return new OracleSlashEvent({
      feed: new Uint8Array(obj.feed),
      oracle: new Uint8Array(obj.oracle),
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
