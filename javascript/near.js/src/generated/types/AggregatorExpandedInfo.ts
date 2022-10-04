import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
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

export interface AggregatorExpandedInfoSerde {
  queue: types.OracleQueueViewSerde;
  aggregator: types.AggregatorViewSerde;
  jobs: Array<types.JobSerde>;
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

  toSerde(): AggregatorExpandedInfoSerde {
    return {
      queue: this.queue.toSerde(),
      aggregator: this.aggregator.toSerde(),
      jobs: this.jobs.map((item) => item.toSerde()),
    };
  }

  static fromJSON(obj: AggregatorExpandedInfoJSON) {
    return new AggregatorExpandedInfo({
      queue: types.OracleQueueView.fromJSON(obj.queue),
      aggregator: types.AggregatorView.fromJSON(obj.aggregator),
      jobs: obj.jobs.map((item) => types.Job.fromJSON(item)),
    });
  }

  static fromSerde(obj: AggregatorExpandedInfoSerde) {
    return new AggregatorExpandedInfo({
      queue: types.OracleQueueView.fromSerde(obj.queue),
      aggregator: types.AggregatorView.fromSerde(obj.aggregator),
      jobs: obj.jobs.map((item) => types.Job.fromSerde(item)),
    });
  }
}
