import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IViewAggregatorHistory {
  address: Uint8Array;
  page: number;
}

export interface ViewAggregatorHistoryJSON {
  address: Array<number>;
  page: number;
}

export interface ViewAggregatorHistorySerde {
  address: Array<number>;
  page: number;
}

export class ViewAggregatorHistory implements IViewAggregatorHistory {
  readonly address: Uint8Array;
  readonly page: number;

  constructor(fields: IViewAggregatorHistory) {
    this.address = fields.address;
    this.page = fields.page;
  }

  toJSON(): ViewAggregatorHistoryJSON {
    return {
      address: [...this.address],
      page: this.page,
    };
  }

  toSerde(): ViewAggregatorHistorySerde {
    return {
      address: [...this.address],
      page: this.page,
    };
  }

  static fromJSON(obj: ViewAggregatorHistoryJSON) {
    return new ViewAggregatorHistory({
      address: new Uint8Array(obj.address),
      page: obj.page,
    });
  }

  static fromSerde(obj: ViewAggregatorHistorySerde) {
    return new ViewAggregatorHistory({
      address: new Uint8Array(obj.address),
      page: obj.page,
    });
  }
}
