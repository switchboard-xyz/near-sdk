import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorOpenRoundEvent {
  feedKey: Uint8Array;
  oracles: Array<Uint8Array>;
  jobs: Array<Uint8Array>;
}

export interface AggregatorOpenRoundEventJSON {
  feedKey: Array<number>;
  oracles: Array<Array<number>>;
  jobs: Array<Array<number>>;
}

export interface AggregatorOpenRoundEventSerde {
  feed_key: Array<number>;
  oracles: Array<Array<number>>;
  jobs: Array<Array<number>>;
}

export class AggregatorOpenRoundEvent implements IAggregatorOpenRoundEvent {
  readonly feedKey: Uint8Array;
  readonly oracles: Array<Uint8Array>;
  readonly jobs: Array<Uint8Array>;

  constructor(fields: IAggregatorOpenRoundEvent) {
    this.feedKey = fields.feedKey;
    this.oracles = fields.oracles;
    this.jobs = fields.jobs;
  }

  toJSON(): AggregatorOpenRoundEventJSON {
    return {
      feedKey: [...this.feedKey],
      oracles: this.oracles.map((item) => [...item]),
      jobs: this.jobs.map((item) => [...item]),
    };
  }

  toSerde(): AggregatorOpenRoundEventSerde {
    return {
      feed_key: [...this.feedKey],
      oracles: this.oracles.map((item) => [...item]),
      jobs: this.jobs.map((item) => [...item]),
    };
  }

  static fromJSON(obj: AggregatorOpenRoundEventJSON) {
    return new AggregatorOpenRoundEvent({
      feedKey: new Uint8Array(obj.feedKey),
      oracles: obj.oracles.map((item) => new Uint8Array(item)),
      jobs: obj.jobs.map((item) => new Uint8Array(item)),
    });
  }

  static fromSerde(obj: AggregatorOpenRoundEventSerde) {
    return new AggregatorOpenRoundEvent({
      feedKey: new Uint8Array(obj.feed_key),
      oracles: obj.oracles.map((item) => new Uint8Array(item)),
      jobs: obj.jobs.map((item) => new Uint8Array(item)),
    });
  }
}
