import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export enum SwitchboardPermissionEnum {
  None = 0,
  PermitOracleHeartbeat = 1,
  PermitOracleQueueUsage = 2,
  PermitVrfRequests = 3,
}
export interface SwitchboardPermissionJSON {
  kind:
    | "None"
    | "PermitOracleHeartbeat"
    | "PermitOracleQueueUsage"
    | "PermitVrfRequests";
}
export class SwitchboardPermission {
  constructor(readonly obj: SwitchboardPermissionEnum) {}

  toJSON() {
    return {
      kind: SwitchboardPermissionEnum[this.obj] as any,
    };
  }

  static fromJSON(obj: SwitchboardPermissionJSON) {
    return new SwitchboardPermission(obj as any);
  }
}
