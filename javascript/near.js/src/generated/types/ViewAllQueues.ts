import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IViewAllQueues {}

export interface ViewAllQueuesJSON {}

export interface ViewAllQueuesSerde {}

export class ViewAllQueues implements IViewAllQueues {
  constructor(fields: IViewAllQueues) {}

  toJSON(): ViewAllQueuesJSON {
    return {};
  }

  toSerde(): ViewAllQueuesSerde {
    return {};
  }

  static fromJSON(obj: ViewAllQueuesJSON) {
    return new ViewAllQueues({});
  }

  static fromSerde(obj: ViewAllQueuesSerde) {
    return new ViewAllQueues({});
  }
}
