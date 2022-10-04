import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorRead {
  address: Uint8Array;
  payer: Uint8Array;
}

export interface AggregatorReadJSON {
  address: Array<number>;
  payer: Array<number>;
}

export interface AggregatorReadSerde {
  address: Array<number>;
  payer: Array<number>;
}

export class AggregatorRead implements IAggregatorRead {
  readonly address: Uint8Array;
  readonly payer: Uint8Array;

  constructor(fields: IAggregatorRead) {
    this.address = fields.address;
    this.payer = fields.payer;
  }

  toJSON(): AggregatorReadJSON {
    return {
      address: [...this.address],
      payer: [...this.payer],
    };
  }

  toSerde(): AggregatorReadSerde {
    return {
      address: [...this.address],
      payer: [...this.payer],
    };
  }

  static fromJSON(obj: AggregatorReadJSON) {
    return new AggregatorRead({
      address: new Uint8Array(obj.address),
      payer: new Uint8Array(obj.payer),
    });
  }

  static fromSerde(obj: AggregatorReadSerde) {
    return new AggregatorRead({
      address: new Uint8Array(obj.address),
      payer: new Uint8Array(obj.payer),
    });
  }
}
