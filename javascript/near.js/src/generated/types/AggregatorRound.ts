import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IAggregatorRound {
  id: BN;
  numSuccess: number;
  numError: number;
  isClosed: boolean;
  roundOpenSlot: BN;
  roundOpenTimestamp: BN;
  result: types.SwitchboardDecimal;
  stdDeviation: types.SwitchboardDecimal;
  minResponse: types.SwitchboardDecimal;
  maxResponse: types.SwitchboardDecimal;
  oracles: Array<Uint8Array>;
  mediansData: Array<types.SwitchboardDecimal>;
  currentPayout: Array<BN>;
  mediansFulfilled: Array<boolean>;
  errorsFulfilled: Array<boolean>;
  _ebuf: Uint8Array;
  features: Uint8Array;
}

export interface AggregatorRoundJSON {
  id: string;
  numSuccess: number;
  numError: number;
  isClosed: boolean;
  roundOpenSlot: string;
  roundOpenTimestamp: string;
  result: types.SwitchboardDecimalJSON;
  stdDeviation: types.SwitchboardDecimalJSON;
  minResponse: types.SwitchboardDecimalJSON;
  maxResponse: types.SwitchboardDecimalJSON;
  oracles: Array<Array<number>>;
  mediansData: Array<types.SwitchboardDecimalJSON>;
  currentPayout: Array<string>;
  mediansFulfilled: Array<boolean>;
  errorsFulfilled: Array<boolean>;
  _ebuf: Array<number>;
  features: Array<number>;
}

export interface AggregatorRoundSerde {
  id: number;
  num_success: number;
  num_error: number;
  is_closed: boolean;
  round_open_slot: number;
  round_open_timestamp: number;
  result: types.SwitchboardDecimalSerde;
  std_deviation: types.SwitchboardDecimalSerde;
  min_response: types.SwitchboardDecimalSerde;
  max_response: types.SwitchboardDecimalSerde;
  oracles: Array<Array<number>>;
  medians_data: Array<types.SwitchboardDecimalSerde>;
  current_payout: Array<number>;
  medians_fulfilled: Array<boolean>;
  errors_fulfilled: Array<boolean>;
  _ebuf: Array<number>;
  features: Array<number>;
}

export class AggregatorRound implements IAggregatorRound {
  readonly id: BN;
  readonly numSuccess: number;
  readonly numError: number;
  readonly isClosed: boolean;
  readonly roundOpenSlot: BN;
  readonly roundOpenTimestamp: BN;
  readonly result: types.SwitchboardDecimal;
  readonly stdDeviation: types.SwitchboardDecimal;
  readonly minResponse: types.SwitchboardDecimal;
  readonly maxResponse: types.SwitchboardDecimal;
  readonly oracles: Array<Uint8Array>;
  readonly mediansData: Array<types.SwitchboardDecimal>;
  readonly currentPayout: Array<BN>;
  readonly mediansFulfilled: Array<boolean>;
  readonly errorsFulfilled: Array<boolean>;
  readonly _ebuf: Uint8Array;
  readonly features: Uint8Array;

  constructor(fields: IAggregatorRound) {
    this.id = fields.id;
    this.numSuccess = fields.numSuccess;
    this.numError = fields.numError;
    this.isClosed = fields.isClosed;
    this.roundOpenSlot = fields.roundOpenSlot;
    this.roundOpenTimestamp = fields.roundOpenTimestamp;
    this.result = fields.result;
    this.stdDeviation = fields.stdDeviation;
    this.minResponse = fields.minResponse;
    this.maxResponse = fields.maxResponse;
    this.oracles = fields.oracles;
    this.mediansData = fields.mediansData;
    this.currentPayout = fields.currentPayout;
    this.mediansFulfilled = fields.mediansFulfilled;
    this.errorsFulfilled = fields.errorsFulfilled;
    this._ebuf = fields._ebuf;
    this.features = fields.features;
  }

  toJSON(): AggregatorRoundJSON {
    return {
      id: this.id.toString(),
      numSuccess: this.numSuccess,
      numError: this.numError,
      isClosed: this.isClosed,
      roundOpenSlot: this.roundOpenSlot.toString(),
      roundOpenTimestamp: this.roundOpenTimestamp.toString(),
      result: this.result.toJSON(),
      stdDeviation: this.stdDeviation.toJSON(),
      minResponse: this.minResponse.toJSON(),
      maxResponse: this.maxResponse.toJSON(),
      oracles: this.oracles.map((item) => [...item]),
      mediansData: this.mediansData.map((item) => item.toJSON()),
      currentPayout: this.currentPayout.map((item) => item.toString()),
      mediansFulfilled: this.mediansFulfilled.map((item) => item),
      errorsFulfilled: this.errorsFulfilled.map((item) => item),
      _ebuf: [...this._ebuf],
      features: [...this.features],
    };
  }

  toSerde(): AggregatorRoundSerde {
    return {
      id: this.id.toNumber(),
      num_success: this.numSuccess,
      num_error: this.numError,
      is_closed: this.isClosed,
      round_open_slot: this.roundOpenSlot.toNumber(),
      round_open_timestamp: this.roundOpenTimestamp.toNumber(),
      result: this.result.toSerde(),
      std_deviation: this.stdDeviation.toSerde(),
      min_response: this.minResponse.toSerde(),
      max_response: this.maxResponse.toSerde(),
      oracles: this.oracles.map((item) => [...item]),
      medians_data: this.mediansData.map((item) => item.toSerde()),
      current_payout: this.currentPayout.map((item) => item.toNumber()),
      medians_fulfilled: this.mediansFulfilled.map((item) => item),
      errors_fulfilled: this.errorsFulfilled.map((item) => item),
      _ebuf: [...this._ebuf],
      features: [...this.features],
    };
  }

  static fromJSON(obj: AggregatorRoundJSON) {
    return new AggregatorRound({
      id: new BN(obj.id),
      numSuccess: obj.numSuccess,
      numError: obj.numError,
      isClosed: obj.isClosed,
      roundOpenSlot: new BN(obj.roundOpenSlot),
      roundOpenTimestamp: new BN(obj.roundOpenTimestamp),
      result: types.SwitchboardDecimal.fromJSON(obj.result),
      stdDeviation: types.SwitchboardDecimal.fromJSON(obj.stdDeviation),
      minResponse: types.SwitchboardDecimal.fromJSON(obj.minResponse),
      maxResponse: types.SwitchboardDecimal.fromJSON(obj.maxResponse),
      oracles: obj.oracles.map((item) => new Uint8Array(item)),
      mediansData: obj.mediansData.map((item) =>
        types.SwitchboardDecimal.fromJSON(item)
      ),
      currentPayout: obj.currentPayout.map((item) => new BN(item)),
      mediansFulfilled: obj.mediansFulfilled.map((item) => item),
      errorsFulfilled: obj.errorsFulfilled.map((item) => item),
      _ebuf: new Uint8Array(obj._ebuf),
      features: new Uint8Array(obj.features),
    });
  }

  static fromSerde(obj: AggregatorRoundSerde) {
    return new AggregatorRound({
      id: new BN(obj.id.toLocaleString("fullwide", { useGrouping: false })),
      numSuccess: obj.num_success,
      numError: obj.num_error,
      isClosed: obj.is_closed,
      roundOpenSlot: new BN(
        obj.round_open_slot.toLocaleString("fullwide", { useGrouping: false })
      ),
      roundOpenTimestamp: new BN(
        obj.round_open_timestamp.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
      result: types.SwitchboardDecimal.fromSerde(obj.result),
      stdDeviation: types.SwitchboardDecimal.fromSerde(obj.std_deviation),
      minResponse: types.SwitchboardDecimal.fromSerde(obj.min_response),
      maxResponse: types.SwitchboardDecimal.fromSerde(obj.max_response),
      oracles: obj.oracles.map((item) => new Uint8Array(item)),
      mediansData: obj.medians_data.map((item) =>
        types.SwitchboardDecimal.fromSerde(item)
      ),
      currentPayout: obj.current_payout.map((item) => new BN(item)),
      mediansFulfilled: obj.medians_fulfilled.map((item) => item),
      errorsFulfilled: obj.errors_fulfilled.map((item) => item),
      _ebuf: new Uint8Array(obj._ebuf),
      features: new Uint8Array(obj.features),
    });
  }
}
