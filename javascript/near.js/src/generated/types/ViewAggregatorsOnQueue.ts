import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IViewAggregatorsOnQueue {
  queue: Uint8Array;
}

export interface ViewAggregatorsOnQueueJSON {
  queue: Array<number>;
}

export interface ViewAggregatorsOnQueueSerde {
  queue: Array<number>;
}

export class ViewAggregatorsOnQueue implements IViewAggregatorsOnQueue {
  readonly queue: Uint8Array;

  constructor(fields: IViewAggregatorsOnQueue) {
    this.queue = fields.queue;
  }

  toJSON(): ViewAggregatorsOnQueueJSON {
    return {
      queue: [...this.queue],
    };
  }

  toSerde(): ViewAggregatorsOnQueueSerde {
    return {
      queue: [...this.queue],
    };
  }

  static fromJSON(obj: ViewAggregatorsOnQueueJSON) {
    return new ViewAggregatorsOnQueue({
      queue: new Uint8Array(obj.queue),
    });
  }

  static fromSerde(obj: ViewAggregatorsOnQueueSerde) {
    return new ViewAggregatorsOnQueue({
      queue: new Uint8Array(obj.queue),
    });
  }
}
