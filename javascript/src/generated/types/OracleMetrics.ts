import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IOracleMetrics {
  consecutiveSuccess: BN;
  consecutiveError: BN;
  consecutiveDisagreement: BN;
  consecutiveLateResponse: BN;
  consecutiveFailure: BN;
  totalSuccess: BN;
  totalError: BN;
  totalDisagreement: BN;
  totalLateResponse: BN;
}

export interface OracleMetricsJSON {
  consecutiveSuccess: string;
  consecutiveError: string;
  consecutiveDisagreement: string;
  consecutiveLateResponse: string;
  consecutiveFailure: string;
  totalSuccess: string;
  totalError: string;
  totalDisagreement: string;
  totalLateResponse: string;
}

export interface OracleMetricsBorsh {
  consecutive_success: number;
  consecutive_error: number;
  consecutive_disagreement: number;
  consecutive_late_response: number;
  consecutive_failure: number;
  total_success: number;
  total_error: number;
  total_disagreement: number;
  total_late_response: number;
}

export class OracleMetrics implements IOracleMetrics {
  readonly consecutiveSuccess: BN;
  readonly consecutiveError: BN;
  readonly consecutiveDisagreement: BN;
  readonly consecutiveLateResponse: BN;
  readonly consecutiveFailure: BN;
  readonly totalSuccess: BN;
  readonly totalError: BN;
  readonly totalDisagreement: BN;
  readonly totalLateResponse: BN;

  constructor(fields: IOracleMetrics) {
    this.consecutiveSuccess = fields.consecutiveSuccess;
    this.consecutiveError = fields.consecutiveError;
    this.consecutiveDisagreement = fields.consecutiveDisagreement;
    this.consecutiveLateResponse = fields.consecutiveLateResponse;
    this.consecutiveFailure = fields.consecutiveFailure;
    this.totalSuccess = fields.totalSuccess;
    this.totalError = fields.totalError;
    this.totalDisagreement = fields.totalDisagreement;
    this.totalLateResponse = fields.totalLateResponse;
  }

  toJSON(): OracleMetricsJSON {
    return {
      consecutiveSuccess: this.consecutiveSuccess.toString(),
      consecutiveError: this.consecutiveError.toString(),
      consecutiveDisagreement: this.consecutiveDisagreement.toString(),
      consecutiveLateResponse: this.consecutiveLateResponse.toString(),
      consecutiveFailure: this.consecutiveFailure.toString(),
      totalSuccess: this.totalSuccess.toString(),
      totalError: this.totalError.toString(),
      totalDisagreement: this.totalDisagreement.toString(),
      totalLateResponse: this.totalLateResponse.toString(),
    };
  }

  toBorsh(): OracleMetricsBorsh {
    return {
      consecutive_success: this.consecutiveSuccess.toNumber(),
      consecutive_error: this.consecutiveError.toNumber(),
      consecutive_disagreement: this.consecutiveDisagreement.toNumber(),
      consecutive_late_response: this.consecutiveLateResponse.toNumber(),
      consecutive_failure: this.consecutiveFailure.toNumber(),
      total_success: this.totalSuccess.toNumber(),
      total_error: this.totalError.toNumber(),
      total_disagreement: this.totalDisagreement.toNumber(),
      total_late_response: this.totalLateResponse.toNumber(),
    };
  }

  static fromJSON(obj: OracleMetricsJSON) {
    return new OracleMetrics({
      consecutiveSuccess: new BN(obj.consecutiveSuccess),
      consecutiveError: new BN(obj.consecutiveError),
      consecutiveDisagreement: new BN(obj.consecutiveDisagreement),
      consecutiveLateResponse: new BN(obj.consecutiveLateResponse),
      consecutiveFailure: new BN(obj.consecutiveFailure),
      totalSuccess: new BN(obj.totalSuccess),
      totalError: new BN(obj.totalError),
      totalDisagreement: new BN(obj.totalDisagreement),
      totalLateResponse: new BN(obj.totalLateResponse),
    });
  }

  static fromBorsh(obj: OracleMetricsBorsh) {
    return new OracleMetrics({
      consecutiveSuccess: new BN(obj.consecutive_success),
      consecutiveError: new BN(obj.consecutive_error),
      consecutiveDisagreement: new BN(obj.consecutive_disagreement),
      consecutiveLateResponse: new BN(obj.consecutive_late_response),
      consecutiveFailure: new BN(obj.consecutive_failure),
      totalSuccess: new BN(obj.total_success),
      totalError: new BN(obj.total_error),
      totalDisagreement: new BN(obj.total_disagreement),
      totalLateResponse: new BN(obj.total_late_response),
    });
  }
}
