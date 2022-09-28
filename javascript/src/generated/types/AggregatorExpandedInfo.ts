import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorExpandedInfo {
  queue: types.OracleQueueView;
  aggregator: types.AggregatorView;
  jobs: Array<types.Job>;
}

export interface AggregatorExpandedInfoJSON {
  queue: types.OracleQueueViewJSON;
  aggregator: types.AggregatorViewJSON;
  jobs: Array<types.JobJSON>;
}

export interface AggregatorExpandedInfoBorsh {
  queue: types.OracleQueueViewBorsh;
  aggregator: types.AggregatorViewBorsh;
  jobs: Array<types.JobBorsh>;
}

export class AggregatorExpandedInfo implements IAggregatorExpandedInfo {
  readonly queue: types.OracleQueueView;
  readonly aggregator: types.AggregatorView;
  readonly jobs: Array<types.Job>;

  constructor(fields: IAggregatorExpandedInfo) {
    this.queue = fields.queue;
    this.aggregator = fields.aggregator;
    this.jobs = fields.jobs;
  }

  toJSON(): AggregatorExpandedInfoJSON {
    return {
      queue: this.queue.toJSON(),
      aggregator: this.aggregator.toJSON(),
      jobs: this.jobs.map((item) => item.toJSON()),
    };
  }

  toBorsh(): AggregatorExpandedInfoBorsh {
    return {
      queue: this.queue.toBorsh(),
      aggregator: this.aggregator.toBorsh(),
      jobs: this.jobs.map((item) => item.toBorsh()),
    };
  }

  static fromJSON(obj: AggregatorExpandedInfoJSON) {
    return new AggregatorExpandedInfo({
      queue: types.OracleQueueView.fromJSON(obj.queue),
      aggregator: types.AggregatorView.fromJSON(obj.aggregator),
      jobs: obj.jobs.map((item) => types.Job.fromJSON(item)),
    });
  }

  static fromBorsh(obj: AggregatorExpandedInfoBorsh) {
    return new AggregatorExpandedInfo({
      queue: types.OracleQueueView.fromBorsh(obj.queue),
      aggregator: types.AggregatorView.fromBorsh(obj.aggregator),
      jobs: obj.jobs.map((item) => types.Job.fromBorsh(item)),
    });
  }
}
