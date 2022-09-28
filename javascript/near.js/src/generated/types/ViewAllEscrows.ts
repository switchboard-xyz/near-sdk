import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IViewAllEscrows {}

export interface ViewAllEscrowsJSON {}

export interface ViewAllEscrowsBorsh {}

export class ViewAllEscrows implements IViewAllEscrows {
  constructor(fields: IViewAllEscrows) {}

  toJSON(): ViewAllEscrowsJSON {
    return {};
  }

  toBorsh(): ViewAllEscrowsBorsh {
    return {};
  }

  static fromJSON(obj: ViewAllEscrowsJSON) {
    return new ViewAllEscrows({});
  }

  static fromBorsh(obj: ViewAllEscrowsBorsh) {
    return new ViewAllEscrows({});
  }
}
