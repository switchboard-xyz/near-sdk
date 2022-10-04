import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IViewAggregator {
  address: Uint8Array;
}

export interface ViewAggregatorJSON {
  address: Array<number>;
}

export interface ViewAggregatorSerde {
  address: Array<number>;
}

export class ViewAggregator implements IViewAggregator {
  readonly address: Uint8Array;

  constructor(fields: IViewAggregator) {
    this.address = fields.address;
  }

  toJSON(): ViewAggregatorJSON {
    return {
      address: [...this.address],
    };
  }

  toSerde(): ViewAggregatorSerde {
    return {
      address: [...this.address],
    };
  }

  static fromJSON(obj: ViewAggregatorJSON) {
    return new ViewAggregator({
      address: new Uint8Array(obj.address),
    });
  }

  static fromSerde(obj: ViewAggregatorSerde) {
    return new ViewAggregator({
      address: new Uint8Array(obj.address),
    });
  }
}
