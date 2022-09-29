import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export enum OracleResponseTypeEnum {
  TypeNone = 0,
  TypeSuccess = 1,
  TypeError = 2,
  TypeDisagreement = 3,
  TypeNoResponse = 4,
}
export interface OracleResponseTypeJSON {
  kind:
    | "TypeNone"
    | "TypeSuccess"
    | "TypeError"
    | "TypeDisagreement"
    | "TypeNoResponse";
}
export class OracleResponseType {
  constructor(readonly obj: OracleResponseTypeEnum) {}

  toJSON() {
    return {
      kind: OracleResponseTypeEnum[this.obj] as any,
    };
  }

  static fromJSON(obj: OracleResponseTypeJSON) {
    return new OracleResponseType(obj as any);
  }
}
