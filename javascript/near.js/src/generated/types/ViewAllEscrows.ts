import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IViewAllEscrows {}

export interface ViewAllEscrowsJSON {}

export interface ViewAllEscrowsSerde {}

export class ViewAllEscrows implements IViewAllEscrows {
  constructor(fields: IViewAllEscrows) {}

  toJSON(): ViewAllEscrowsJSON {
    return {};
  }

  toSerde(): ViewAllEscrowsSerde {
    return {};
  }

  static fromJSON(obj: ViewAllEscrowsJSON) {
    return new ViewAllEscrows({});
  }

  static fromSerde(obj: ViewAllEscrowsSerde) {
    return new ViewAllEscrows({});
  }
}
