import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleHeartbeat {
  address: Uint8Array;
}

export interface OracleHeartbeatJSON {
  address: Array<number>;
}

export interface OracleHeartbeatSerde {
  address: Array<number>;
}

export class OracleHeartbeat implements IOracleHeartbeat {
  readonly address: Uint8Array;

  constructor(fields: IOracleHeartbeat) {
    this.address = fields.address;
  }

  toJSON(): OracleHeartbeatJSON {
    return {
      address: [...this.address],
    };
  }

  toSerde(): OracleHeartbeatSerde {
    return {
      address: [...this.address],
    };
  }

  static fromJSON(obj: OracleHeartbeatJSON) {
    return new OracleHeartbeat({
      address: new Uint8Array(obj.address),
    });
  }

  static fromSerde(obj: OracleHeartbeatSerde) {
    return new OracleHeartbeat({
      address: new Uint8Array(obj.address),
    });
  }
}
