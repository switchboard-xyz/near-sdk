import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
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

export interface OracleMetricsSerde {
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

  toSerde(): OracleMetricsSerde {
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

  static fromSerde(obj: OracleMetricsSerde) {
    return new OracleMetrics({
      consecutiveSuccess: new BN(
        obj.consecutive_success.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
      consecutiveError: new BN(
        obj.consecutive_error.toLocaleString("fullwide", { useGrouping: false })
      ),
      consecutiveDisagreement: new BN(
        obj.consecutive_disagreement.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
      consecutiveLateResponse: new BN(
        obj.consecutive_late_response.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
      consecutiveFailure: new BN(
        obj.consecutive_failure.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
      totalSuccess: new BN(
        obj.total_success.toLocaleString("fullwide", { useGrouping: false })
      ),
      totalError: new BN(
        obj.total_error.toLocaleString("fullwide", { useGrouping: false })
      ),
      totalDisagreement: new BN(
        obj.total_disagreement.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
      totalLateResponse: new BN(
        obj.total_late_response.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
    });
  }
}
