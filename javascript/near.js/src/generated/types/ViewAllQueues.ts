import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IViewAllQueues {}

export interface ViewAllQueuesJSON {}

export interface ViewAllQueuesBorsh {}

export class ViewAllQueues implements IViewAllQueues {
  constructor(fields: IViewAllQueues) {}

  toJSON(): ViewAllQueuesJSON {
    return {};
  }

  toBorsh(): ViewAllQueuesBorsh {
    return {};
  }

  static fromJSON(obj: ViewAllQueuesJSON) {
    return new ViewAllQueues({});
  }

  static fromBorsh(obj: ViewAllQueuesBorsh) {
    return new ViewAllQueues({});
  }
}
