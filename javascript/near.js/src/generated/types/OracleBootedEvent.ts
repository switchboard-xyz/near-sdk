import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleBootedEvent {
  oracle: Uint8Array;
  queue: Uint8Array;
  timestamp: BN;
}

export interface OracleBootedEventJSON {
  oracle: Array<number>;
  queue: Array<number>;
  timestamp: string;
}

export interface OracleBootedEventSerde {
  oracle: Array<number>;
  queue: Array<number>;
  timestamp: number;
}

export class OracleBootedEvent implements IOracleBootedEvent {
  readonly oracle: Uint8Array;
  readonly queue: Uint8Array;
  readonly timestamp: BN;

  constructor(fields: IOracleBootedEvent) {
    this.oracle = fields.oracle;
    this.queue = fields.queue;
    this.timestamp = fields.timestamp;
  }

  toJSON(): OracleBootedEventJSON {
    return {
      oracle: [...this.oracle],
      queue: [...this.queue],
      timestamp: this.timestamp.toString(),
    };
  }

  toSerde(): OracleBootedEventSerde {
    return {
      oracle: [...this.oracle],
      queue: [...this.queue],
      timestamp: this.timestamp.toNumber(),
    };
  }

  static fromJSON(obj: OracleBootedEventJSON) {
    return new OracleBootedEvent({
      oracle: new Uint8Array(obj.oracle),
      queue: new Uint8Array(obj.queue),
      timestamp: new BN(obj.timestamp),
    });
  }

  static fromSerde(obj: OracleBootedEventSerde) {
    return new OracleBootedEvent({
      oracle: new Uint8Array(obj.oracle),
      queue: new Uint8Array(obj.queue),
      timestamp: new BN(
        obj.timestamp.toLocaleString("fullwide", { useGrouping: false })
      ),
    });
  }
}
