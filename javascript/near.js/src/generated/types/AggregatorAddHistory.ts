import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorAddHistory {
  address: Uint8Array;
  numRows: number;
}

export interface AggregatorAddHistoryJSON {
  address: Array<number>;
  numRows: number;
}

export interface AggregatorAddHistorySerde {
  address: Array<number>;
  num_rows: number;
}

export class AggregatorAddHistory implements IAggregatorAddHistory {
  readonly address: Uint8Array;
  readonly numRows: number;

  constructor(fields: IAggregatorAddHistory) {
    this.address = fields.address;
    this.numRows = fields.numRows;
  }

  toJSON(): AggregatorAddHistoryJSON {
    return {
      address: [...this.address],
      numRows: this.numRows,
    };
  }

  toSerde(): AggregatorAddHistorySerde {
    return {
      address: [...this.address],
      num_rows: this.numRows,
    };
  }

  static fromJSON(obj: AggregatorAddHistoryJSON) {
    return new AggregatorAddHistory({
      address: new Uint8Array(obj.address),
      numRows: obj.numRows,
    });
  }

  static fromSerde(obj: AggregatorAddHistorySerde) {
    return new AggregatorAddHistory({
      address: new Uint8Array(obj.address),
      numRows: obj.num_rows,
    });
  }
}
