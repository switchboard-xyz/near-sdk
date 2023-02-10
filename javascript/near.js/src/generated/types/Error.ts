import { providers, transactions } from "near-api-js";

export enum SwitchboardErrorEnum {
  Generic = "Generic",
  AggregatorInvalidBatchSize = "AggregatorInvalidBatchSize",
  InvalidUpdatePeriod = "InvalidUpdatePeriod",
  InvalidExpiration = "InvalidExpiration",
  InvalidAggregator = "InvalidAggregator",
  InvalidCrank = "InvalidCrank",
  InvalidJob = "InvalidJob",
  InvalidOracle = "InvalidOracle",
  InvalidPermission = "InvalidPermission",
  InvalidQueue = "InvalidQueue",
  InvalidAggregatorRound = "InvalidAggregatorRound",
  NoResult = "NoResult",
  MathOverflow = "MathOverflow",
  MathUnderflow = "MathUnderflow",
  DecimalConversionError = "DecimalConversionError",
  NoAggregatorJobsFound = "NoAggregatorJobsFound",
  PermissionDenied = "PermissionDenied",
  ArrayOverflow = "ArrayOverflow",
  OracleMismatch = "OracleMismatch",
  InsufficientQueueSize = "InsufficientQueueSize",
  CrankMaxCapacity = "CrankMaxCapacity",
  CrankEmptyError = "CrankEmptyError",
  InvalidAuthority = "InvalidAuthority",
  OracleAlreadyResponded = "OracleAlreadyResponded",
  JobChecksumMismatch = "JobChecksumMismatch",
  IntegerOverflow = "IntegerOverflow",
  AggregatorIllegalRoundOpenCall = "AggregatorIllegalRoundOpenCall",
  InvalidEscrow = "InvalidEscrow",
  InsufficientBalance = "InsufficientBalance",
  MintMismatch = "MintMismatch",
  InsufficientStake = "InsufficientStake",
  ExcessiveCrankPushes = "ExcessiveCrankPushes",
  CrankNoElementsReady = "CrankNoElementsReady",
  InvalidKey = "InvalidKey",
  Unimplemented = "Unimplemented",
  SelfInvokeRequired = "SelfInvokeRequired",
  InsufficientGas = "InsufficientGas",
  AggregatorEmpty = "AggregatorEmpty",
  NotAllowedInPromise = "NotAllowedInPromise",
  ViewOnlyFunction = "ViewOnlyFunction",
  PredecessorFailed = "PredecessorFailed",
  InvalidAmount = "InvalidAmount",
  InsufficientDeposit = "InsufficientDeposit",
  InvalidNumberOfHistoryRows = "InvalidNumberOfHistoryRows",
}
export const SwitchboardErrorTypes: string[] =
  Object.keys(SwitchboardErrorEnum);

export type SwitchboardErrorType =
  | Generic
  | AggregatorInvalidBatchSize
  | InvalidUpdatePeriod
  | InvalidExpiration
  | InvalidAggregator
  | InvalidCrank
  | InvalidJob
  | InvalidOracle
  | InvalidPermission
  | InvalidQueue
  | InvalidAggregatorRound
  | NoResult
  | MathOverflow
  | MathUnderflow
  | DecimalConversionError
  | NoAggregatorJobsFound
  | PermissionDenied
  | ArrayOverflow
  | OracleMismatch
  | InsufficientQueueSize
  | CrankMaxCapacity
  | CrankEmptyError
  | InvalidAuthority
  | OracleAlreadyResponded
  | JobChecksumMismatch
  | IntegerOverflow
  | AggregatorIllegalRoundOpenCall
  | InvalidEscrow
  | InsufficientBalance
  | MintMismatch
  | InsufficientStake
  | ExcessiveCrankPushes
  | CrankNoElementsReady
  | InvalidKey
  | Unimplemented
  | SelfInvokeRequired
  | InsufficientGas
  | AggregatorEmpty
  | NotAllowedInPromise
  | ViewOnlyFunction
  | PredecessorFailed
  | InvalidAmount
  | InsufficientDeposit
  | InvalidNumberOfHistoryRows;

export abstract class SwitchboardError extends Error {
  readonly action?: transactions.Action;
  readonly logs?: string[];
  readonly txnReceipt: providers.FinalExecutionOutcome;

  constructor(
    readonly code: number,
    readonly name: string,
    txnReceipt: providers.FinalExecutionOutcome,
    readonly msg?: string,
    action?: transactions.Action,
    logs?: string[]
  ) {
    super(`${code}: ${name}${msg ? " - " + msg : ""}`);
    this.action = action;
    this.logs = logs;
    this.txnReceipt = txnReceipt;
  }

  static fromErrorType(
    errorType: string,
    txnReceipt: providers.FinalExecutionOutcome,
    action?: transactions.Action,
    logs?: string[]
  ): SwitchboardError {
    switch (errorType) {
      case "Generic":
        return new Generic(txnReceipt, action, logs);
      case "AggregatorInvalidBatchSize":
        return new AggregatorInvalidBatchSize(txnReceipt, action, logs);
      case "InvalidUpdatePeriod":
        return new InvalidUpdatePeriod(txnReceipt, action, logs);
      case "InvalidExpiration":
        return new InvalidExpiration(txnReceipt, action, logs);
      case "InvalidAggregator":
        return new InvalidAggregator(txnReceipt, action, logs);
      case "InvalidCrank":
        return new InvalidCrank(txnReceipt, action, logs);
      case "InvalidJob":
        return new InvalidJob(txnReceipt, action, logs);
      case "InvalidOracle":
        return new InvalidOracle(txnReceipt, action, logs);
      case "InvalidPermission":
        return new InvalidPermission(txnReceipt, action, logs);
      case "InvalidQueue":
        return new InvalidQueue(txnReceipt, action, logs);
      case "InvalidAggregatorRound":
        return new InvalidAggregatorRound(txnReceipt, action, logs);
      case "NoResult":
        return new NoResult(txnReceipt, action, logs);
      case "MathOverflow":
        return new MathOverflow(txnReceipt, action, logs);
      case "MathUnderflow":
        return new MathUnderflow(txnReceipt, action, logs);
      case "DecimalConversionError":
        return new DecimalConversionError(txnReceipt, action, logs);
      case "NoAggregatorJobsFound":
        return new NoAggregatorJobsFound(txnReceipt, action, logs);
      case "PermissionDenied":
        return new PermissionDenied(txnReceipt, action, logs);
      case "ArrayOverflow":
        return new ArrayOverflow(txnReceipt, action, logs);
      case "OracleMismatch":
        return new OracleMismatch(txnReceipt, action, logs);
      case "InsufficientQueueSize":
        return new InsufficientQueueSize(txnReceipt, action, logs);
      case "CrankMaxCapacity":
        return new CrankMaxCapacity(txnReceipt, action, logs);
      case "CrankEmptyError":
        return new CrankEmptyError(txnReceipt, action, logs);
      case "InvalidAuthority":
        return new InvalidAuthority(txnReceipt, action, logs);
      case "OracleAlreadyResponded":
        return new OracleAlreadyResponded(txnReceipt, action, logs);
      case "JobChecksumMismatch":
        return new JobChecksumMismatch(txnReceipt, action, logs);
      case "IntegerOverflow":
        return new IntegerOverflow(txnReceipt, action, logs);
      case "AggregatorIllegalRoundOpenCall":
        return new AggregatorIllegalRoundOpenCall(txnReceipt, action, logs);
      case "InvalidEscrow":
        return new InvalidEscrow(txnReceipt, action, logs);
      case "InsufficientBalance":
        return new InsufficientBalance(txnReceipt, action, logs);
      case "MintMismatch":
        return new MintMismatch(txnReceipt, action, logs);
      case "InsufficientStake":
        return new InsufficientStake(txnReceipt, action, logs);
      case "ExcessiveCrankPushes":
        return new ExcessiveCrankPushes(txnReceipt, action, logs);
      case "CrankNoElementsReady":
        return new CrankNoElementsReady(txnReceipt, action, logs);
      case "InvalidKey":
        return new InvalidKey(txnReceipt, action, logs);
      case "Unimplemented":
        return new Unimplemented(txnReceipt, action, logs);
      case "SelfInvokeRequired":
        return new SelfInvokeRequired(txnReceipt, action, logs);
      case "InsufficientGas":
        return new InsufficientGas(txnReceipt, action, logs);
      case "AggregatorEmpty":
        return new AggregatorEmpty(txnReceipt, action, logs);
      case "NotAllowedInPromise":
        return new NotAllowedInPromise(txnReceipt, action, logs);
      case "ViewOnlyFunction":
        return new ViewOnlyFunction(txnReceipt, action, logs);
      case "PredecessorFailed":
        return new PredecessorFailed(txnReceipt, action, logs);
      case "InvalidAmount":
        return new InvalidAmount(txnReceipt, action, logs);
      case "InsufficientDeposit":
        return new InsufficientDeposit(txnReceipt, action, logs);
      case "InvalidNumberOfHistoryRows":
        return new InvalidNumberOfHistoryRows(txnReceipt, action, logs);
      default:
        return new Generic(txnReceipt, action, logs);
    }
  }
}

export class Generic extends SwitchboardError {
  static readonly code = 6000;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6000, "Generic", txnReceipt, undefined, action, logs);
  }
}

export class AggregatorInvalidBatchSize extends SwitchboardError {
  static readonly code = 6001;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(
      6001,
      "AggregatorInvalidBatchSize",
      txnReceipt,
      undefined,
      action,
      logs
    );
  }
}

export class InvalidUpdatePeriod extends SwitchboardError {
  static readonly code = 6002;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6002, "InvalidUpdatePeriod", txnReceipt, undefined, action, logs);
  }
}

export class InvalidExpiration extends SwitchboardError {
  static readonly code = 6003;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6003, "InvalidExpiration", txnReceipt, undefined, action, logs);
  }
}

export class InvalidAggregator extends SwitchboardError {
  static readonly code = 6004;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6004, "InvalidAggregator", txnReceipt, undefined, action, logs);
  }
}

export class InvalidCrank extends SwitchboardError {
  static readonly code = 6005;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6005, "InvalidCrank", txnReceipt, undefined, action, logs);
  }
}

export class InvalidJob extends SwitchboardError {
  static readonly code = 6006;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6006, "InvalidJob", txnReceipt, undefined, action, logs);
  }
}

export class InvalidOracle extends SwitchboardError {
  static readonly code = 6007;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6007, "InvalidOracle", txnReceipt, undefined, action, logs);
  }
}

export class InvalidPermission extends SwitchboardError {
  static readonly code = 6008;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6008, "InvalidPermission", txnReceipt, undefined, action, logs);
  }
}

export class InvalidQueue extends SwitchboardError {
  static readonly code = 6009;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6009, "InvalidQueue", txnReceipt, undefined, action, logs);
  }
}

export class InvalidAggregatorRound extends SwitchboardError {
  static readonly code = 6010;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6010, "InvalidAggregatorRound", txnReceipt, undefined, action, logs);
  }
}

export class NoResult extends SwitchboardError {
  static readonly code = 6011;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6011, "NoResult", txnReceipt, undefined, action, logs);
  }
}

export class MathOverflow extends SwitchboardError {
  static readonly code = 6012;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6012, "MathOverflow", txnReceipt, undefined, action, logs);
  }
}

export class MathUnderflow extends SwitchboardError {
  static readonly code = 6013;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6013, "MathUnderflow", txnReceipt, undefined, action, logs);
  }
}

export class DecimalConversionError extends SwitchboardError {
  static readonly code = 6014;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6014, "DecimalConversionError", txnReceipt, undefined, action, logs);
  }
}

export class NoAggregatorJobsFound extends SwitchboardError {
  static readonly code = 6015;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6015, "NoAggregatorJobsFound", txnReceipt, undefined, action, logs);
  }
}

export class PermissionDenied extends SwitchboardError {
  static readonly code = 6016;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6016, "PermissionDenied", txnReceipt, undefined, action, logs);
  }
}

export class ArrayOverflow extends SwitchboardError {
  static readonly code = 6017;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6017, "ArrayOverflow", txnReceipt, undefined, action, logs);
  }
}

export class OracleMismatch extends SwitchboardError {
  static readonly code = 6018;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6018, "OracleMismatch", txnReceipt, undefined, action, logs);
  }
}

export class InsufficientQueueSize extends SwitchboardError {
  static readonly code = 6019;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6019, "InsufficientQueueSize", txnReceipt, undefined, action, logs);
  }
}

export class CrankMaxCapacity extends SwitchboardError {
  static readonly code = 6020;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6020, "CrankMaxCapacity", txnReceipt, undefined, action, logs);
  }
}

export class CrankEmptyError extends SwitchboardError {
  static readonly code = 6021;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6021, "CrankEmptyError", txnReceipt, undefined, action, logs);
  }
}

export class InvalidAuthority extends SwitchboardError {
  static readonly code = 6022;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6022, "InvalidAuthority", txnReceipt, undefined, action, logs);
  }
}

export class OracleAlreadyResponded extends SwitchboardError {
  static readonly code = 6023;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6023, "OracleAlreadyResponded", txnReceipt, undefined, action, logs);
  }
}

export class JobChecksumMismatch extends SwitchboardError {
  static readonly code = 6024;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6024, "JobChecksumMismatch", txnReceipt, undefined, action, logs);
  }
}

export class IntegerOverflow extends SwitchboardError {
  static readonly code = 6025;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6025, "IntegerOverflow", txnReceipt, undefined, action, logs);
  }
}

export class AggregatorIllegalRoundOpenCall extends SwitchboardError {
  static readonly code = 6026;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(
      6026,
      "AggregatorIllegalRoundOpenCall",
      txnReceipt,
      undefined,
      action,
      logs
    );
  }
}

export class InvalidEscrow extends SwitchboardError {
  static readonly code = 6027;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6027, "InvalidEscrow", txnReceipt, undefined, action, logs);
  }
}

export class InsufficientBalance extends SwitchboardError {
  static readonly code = 6028;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6028, "InsufficientBalance", txnReceipt, undefined, action, logs);
  }
}

export class MintMismatch extends SwitchboardError {
  static readonly code = 6029;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6029, "MintMismatch", txnReceipt, undefined, action, logs);
  }
}

export class InsufficientStake extends SwitchboardError {
  static readonly code = 6030;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6030, "InsufficientStake", txnReceipt, undefined, action, logs);
  }
}

export class ExcessiveCrankPushes extends SwitchboardError {
  static readonly code = 6031;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6031, "ExcessiveCrankPushes", txnReceipt, undefined, action, logs);
  }
}

export class CrankNoElementsReady extends SwitchboardError {
  static readonly code = 6032;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6032, "CrankNoElementsReady", txnReceipt, undefined, action, logs);
  }
}

export class InvalidKey extends SwitchboardError {
  static readonly code = 6033;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6033, "InvalidKey", txnReceipt, undefined, action, logs);
  }
}

export class Unimplemented extends SwitchboardError {
  static readonly code = 6034;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6034, "Unimplemented", txnReceipt, undefined, action, logs);
  }
}

export class SelfInvokeRequired extends SwitchboardError {
  static readonly code = 6035;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6035, "SelfInvokeRequired", txnReceipt, undefined, action, logs);
  }
}

export class InsufficientGas extends SwitchboardError {
  static readonly code = 6036;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6036, "InsufficientGas", txnReceipt, undefined, action, logs);
  }
}

export class AggregatorEmpty extends SwitchboardError {
  static readonly code = 6037;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6037, "AggregatorEmpty", txnReceipt, undefined, action, logs);
  }
}

export class NotAllowedInPromise extends SwitchboardError {
  static readonly code = 6038;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6038, "NotAllowedInPromise", txnReceipt, undefined, action, logs);
  }
}

export class ViewOnlyFunction extends SwitchboardError {
  static readonly code = 6039;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6039, "ViewOnlyFunction", txnReceipt, undefined, action, logs);
  }
}

export class PredecessorFailed extends SwitchboardError {
  static readonly code = 6040;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6040, "PredecessorFailed", txnReceipt, undefined, action, logs);
  }
}

export class InvalidAmount extends SwitchboardError {
  static readonly code = 6041;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6041, "InvalidAmount", txnReceipt, undefined, action, logs);
  }
}

export class InsufficientDeposit extends SwitchboardError {
  static readonly code = 6042;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(6042, "InsufficientDeposit", txnReceipt, undefined, action, logs);
  }
}

export class InvalidNumberOfHistoryRows extends SwitchboardError {
  static readonly code = 6043;

  constructor(
    readonly txnReceipt: providers.FinalExecutionOutcome,
    readonly action?: transactions.Action,
    readonly logs?: string[]
  ) {
    super(
      6043,
      "InvalidNumberOfHistoryRows",
      txnReceipt,
      undefined,
      action,
      logs
    );
  }
}
