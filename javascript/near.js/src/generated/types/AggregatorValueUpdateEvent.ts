import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorValueUpdateEvent {
  feedKey: Uint8Array;
  oracles: Array<Uint8Array>;
  oracleValues: Array<types.SwitchboardDecimal>;
  timestamp: BN;
  roundId: BN;
  value: types.SwitchboardDecimal;
}

export interface AggregatorValueUpdateEventJSON {
  feedKey: Array<number>;
  oracles: Array<Array<number>>;
  oracleValues: Array<types.SwitchboardDecimalJSON>;
  timestamp: string;
  roundId: string;
  value: types.SwitchboardDecimalJSON;
}

export interface AggregatorValueUpdateEventSerde {
  feed_key: Array<number>;
  oracles: Array<Array<number>>;
  oracle_values: Array<types.SwitchboardDecimalSerde>;
  timestamp: number;
  round_id: number;
  value: types.SwitchboardDecimalSerde;
}

export class AggregatorValueUpdateEvent implements IAggregatorValueUpdateEvent {
  readonly feedKey: Uint8Array;
  readonly oracles: Array<Uint8Array>;
  readonly oracleValues: Array<types.SwitchboardDecimal>;
  readonly timestamp: BN;
  readonly roundId: BN;
  readonly value: types.SwitchboardDecimal;

  constructor(fields: IAggregatorValueUpdateEvent) {
    this.feedKey = fields.feedKey;
    this.oracles = fields.oracles;
    this.oracleValues = fields.oracleValues;
    this.timestamp = fields.timestamp;
    this.roundId = fields.roundId;
    this.value = fields.value;
  }

  toJSON(): AggregatorValueUpdateEventJSON {
    return {
      feedKey: [...this.feedKey],
      oracles: this.oracles.map((item) => [...item]),
      oracleValues: this.oracleValues.map((item) => item.toJSON()),
      timestamp: this.timestamp.toString(),
      roundId: this.roundId.toString(),
      value: this.value.toJSON(),
    };
  }

  toSerde(): AggregatorValueUpdateEventSerde {
    return {
      feed_key: [...this.feedKey],
      oracles: this.oracles.map((item) => [...item]),
      oracle_values: this.oracleValues.map((item) => item.toSerde()),
      timestamp: this.timestamp.toNumber(),
      round_id: this.roundId.toNumber(),
      value: this.value.toSerde(),
    };
  }

  static fromJSON(obj: AggregatorValueUpdateEventJSON) {
    return new AggregatorValueUpdateEvent({
      feedKey: new Uint8Array(obj.feedKey),
      oracles: obj.oracles.map((item) => new Uint8Array(item)),
      oracleValues: obj.oracleValues.map((item) =>
        types.SwitchboardDecimal.fromJSON(item)
      ),
      timestamp: new BN(obj.timestamp),
      roundId: new BN(obj.roundId),
      value: types.SwitchboardDecimal.fromJSON(obj.value),
    });
  }

  static fromSerde(obj: AggregatorValueUpdateEventSerde) {
    return new AggregatorValueUpdateEvent({
      feedKey: new Uint8Array(obj.feed_key),
      oracles: obj.oracles.map((item) => new Uint8Array(item)),
      oracleValues: obj.oracle_values.map((item) =>
        types.SwitchboardDecimal.fromSerde(item)
      ),
      timestamp: new BN(
        obj.timestamp.toLocaleString("fullwide", { useGrouping: false })
      ),
      roundId: new BN(
        obj.round_id.toLocaleString("fullwide", { useGrouping: false })
      ),
      value: types.SwitchboardDecimal.fromSerde(obj.value),
    });
  }
}
