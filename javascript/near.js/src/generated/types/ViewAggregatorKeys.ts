import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IViewAggregatorKeys {}

export interface ViewAggregatorKeysJSON {}

export interface ViewAggregatorKeysSerde {}

export class ViewAggregatorKeys implements IViewAggregatorKeys {
  constructor(fields: IViewAggregatorKeys) {}

  toJSON(): ViewAggregatorKeysJSON {
    return {};
  }

  toSerde(): ViewAggregatorKeysSerde {
    return {};
  }

  static fromJSON(obj: ViewAggregatorKeysJSON) {
    return new ViewAggregatorKeys({});
  }

  static fromSerde(obj: ViewAggregatorKeysSerde) {
    return new ViewAggregatorKeys({});
  }
}
