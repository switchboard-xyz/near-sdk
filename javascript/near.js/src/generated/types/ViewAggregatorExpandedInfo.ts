import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IViewAggregatorExpandedInfo {
  address: Uint8Array;
}

export interface ViewAggregatorExpandedInfoJSON {
  address: Array<number>;
}

export interface ViewAggregatorExpandedInfoSerde {
  address: Array<number>;
}

export class ViewAggregatorExpandedInfo implements IViewAggregatorExpandedInfo {
  readonly address: Uint8Array;

  constructor(fields: IViewAggregatorExpandedInfo) {
    this.address = fields.address;
  }

  toJSON(): ViewAggregatorExpandedInfoJSON {
    return {
      address: [...this.address],
    };
  }

  toSerde(): ViewAggregatorExpandedInfoSerde {
    return {
      address: [...this.address],
    };
  }

  static fromJSON(obj: ViewAggregatorExpandedInfoJSON) {
    return new ViewAggregatorExpandedInfo({
      address: new Uint8Array(obj.address),
    });
  }

  static fromSerde(obj: ViewAggregatorExpandedInfoSerde) {
    return new ViewAggregatorExpandedInfo({
      address: new Uint8Array(obj.address),
    });
  }
}
