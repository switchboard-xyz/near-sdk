import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorHistoryPageView {
  address: Uint8Array;
  history: Array<types.AggregatorHistoryRow>;
  historyWriteIdx: BN;
  historyLimit: BN;
  page: number;
  startingIdx: number;
  endingIdx: number;
}

export interface AggregatorHistoryPageViewJSON {
  address: Array<number>;
  history: Array<types.AggregatorHistoryRowJSON>;
  historyWriteIdx: string;
  historyLimit: string;
  page: number;
  startingIdx: number;
  endingIdx: number;
}

export interface AggregatorHistoryPageViewSerde {
  address: Array<number>;
  history: Array<types.AggregatorHistoryRowSerde>;
  history_write_idx: number;
  history_limit: number;
  page: number;
  starting_idx: number;
  ending_idx: number;
}

export class AggregatorHistoryPageView implements IAggregatorHistoryPageView {
  readonly address: Uint8Array;
  readonly history: Array<types.AggregatorHistoryRow>;
  readonly historyWriteIdx: BN;
  readonly historyLimit: BN;
  readonly page: number;
  readonly startingIdx: number;
  readonly endingIdx: number;

  constructor(fields: IAggregatorHistoryPageView) {
    this.address = fields.address;
    this.history = fields.history;
    this.historyWriteIdx = fields.historyWriteIdx;
    this.historyLimit = fields.historyLimit;
    this.page = fields.page;
    this.startingIdx = fields.startingIdx;
    this.endingIdx = fields.endingIdx;
  }

  toJSON(): AggregatorHistoryPageViewJSON {
    return {
      address: [...this.address],
      history: this.history.map((item) => item.toJSON()),
      historyWriteIdx: this.historyWriteIdx.toString(),
      historyLimit: this.historyLimit.toString(),
      page: this.page,
      startingIdx: this.startingIdx,
      endingIdx: this.endingIdx,
    };
  }

  toSerde(): AggregatorHistoryPageViewSerde {
    return {
      address: [...this.address],
      history: this.history.map((item) => item.toSerde()),
      history_write_idx: this.historyWriteIdx.toNumber(),
      history_limit: this.historyLimit.toNumber(),
      page: this.page,
      starting_idx: this.startingIdx,
      ending_idx: this.endingIdx,
    };
  }

  static fromJSON(obj: AggregatorHistoryPageViewJSON) {
    return new AggregatorHistoryPageView({
      address: new Uint8Array(obj.address),
      history: obj.history.map((item) =>
        types.AggregatorHistoryRow.fromJSON(item)
      ),
      historyWriteIdx: new BN(obj.historyWriteIdx),
      historyLimit: new BN(obj.historyLimit),
      page: obj.page,
      startingIdx: obj.startingIdx,
      endingIdx: obj.endingIdx,
    });
  }

  static fromSerde(obj: AggregatorHistoryPageViewSerde) {
    return new AggregatorHistoryPageView({
      address: new Uint8Array(obj.address),
      history: obj.history.map((item) =>
        types.AggregatorHistoryRow.fromSerde(item)
      ),
      historyWriteIdx: new BN(
        obj.history_write_idx.toLocaleString("fullwide", { useGrouping: false })
      ),
      historyLimit: new BN(
        obj.history_limit.toLocaleString("fullwide", { useGrouping: false })
      ),
      page: obj.page,
      startingIdx: obj.starting_idx,
      endingIdx: obj.ending_idx,
    });
  }
}
