import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorHistoryRow {
  roundId: BN;
  timestamp: BN;
  value: types.SwitchboardDecimal;
}

export interface AggregatorHistoryRowJSON {
  roundId: string;
  timestamp: string;
  value: types.SwitchboardDecimalJSON;
}

export interface AggregatorHistoryRowSerde {
  round_id: number;
  timestamp: number;
  value: types.SwitchboardDecimalSerde;
}

export class AggregatorHistoryRow implements IAggregatorHistoryRow {
  readonly roundId: BN;
  readonly timestamp: BN;
  readonly value: types.SwitchboardDecimal;

  constructor(fields: IAggregatorHistoryRow) {
    this.roundId = fields.roundId;
    this.timestamp = fields.timestamp;
    this.value = fields.value;
  }

  toJSON(): AggregatorHistoryRowJSON {
    return {
      roundId: this.roundId.toString(),
      timestamp: this.timestamp.toString(),
      value: this.value.toJSON(),
    };
  }

  toSerde(): AggregatorHistoryRowSerde {
    return {
      round_id: this.roundId.toNumber(),
      timestamp: this.timestamp.toNumber(),
      value: this.value.toSerde(),
    };
  }

  static fromJSON(obj: AggregatorHistoryRowJSON) {
    return new AggregatorHistoryRow({
      roundId: new BN(obj.roundId),
      timestamp: new BN(obj.timestamp),
      value: types.SwitchboardDecimal.fromJSON(obj.value),
    });
  }

  static fromSerde(obj: AggregatorHistoryRowSerde) {
    return new AggregatorHistoryRow({
      roundId: new BN(
        obj.round_id.toLocaleString("fullwide", { useGrouping: false })
      ),
      timestamp: new BN(
        obj.timestamp.toLocaleString("fullwide", { useGrouping: false })
      ),
      value: types.SwitchboardDecimal.fromSerde(obj.value),
    });
  }
}
