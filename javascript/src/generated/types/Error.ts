export type SwitchboardError =
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
  | InvalidAmount;

export class Generic extends Error {
  static readonly code = 6000;
  readonly code = 6000;
  readonly name = "Generic";
  readonly msg = "Generic";

  constructor(readonly logs?: string[]) {
    super("6000: Generic");
  }
}

export class AggregatorInvalidBatchSize extends Error {
  static readonly code = 6001;
  readonly code = 6001;
  readonly name = "AggregatorInvalidBatchSize";
  readonly msg = "AggregatorInvalidBatchSize";

  constructor(readonly logs?: string[]) {
    super("6001: AggregatorInvalidBatchSize");
  }
}

export class InvalidUpdatePeriod extends Error {
  static readonly code = 6002;
  readonly code = 6002;
  readonly name = "InvalidUpdatePeriod";
  readonly msg = "InvalidUpdatePeriod";

  constructor(readonly logs?: string[]) {
    super("6002: InvalidUpdatePeriod");
  }
}

export class InvalidExpiration extends Error {
  static readonly code = 6003;
  readonly code = 6003;
  readonly name = "InvalidExpiration";
  readonly msg = "InvalidExpiration";

  constructor(readonly logs?: string[]) {
    super("6003: InvalidExpiration");
  }
}

export class InvalidAggregator extends Error {
  static readonly code = 6004;
  readonly code = 6004;
  readonly name = "InvalidAggregator";
  readonly msg = "InvalidAggregator";

  constructor(readonly logs?: string[]) {
    super("6004: InvalidAggregator");
  }
}

export class InvalidCrank extends Error {
  static readonly code = 6005;
  readonly code = 6005;
  readonly name = "InvalidCrank";
  readonly msg = "InvalidCrank";

  constructor(readonly logs?: string[]) {
    super("6005: InvalidCrank");
  }
}

export class InvalidJob extends Error {
  static readonly code = 6006;
  readonly code = 6006;
  readonly name = "InvalidJob";
  readonly msg = "InvalidJob";

  constructor(readonly logs?: string[]) {
    super("6006: InvalidJob");
  }
}

export class InvalidOracle extends Error {
  static readonly code = 6007;
  readonly code = 6007;
  readonly name = "InvalidOracle";
  readonly msg = "InvalidOracle";

  constructor(readonly logs?: string[]) {
    super("6007: InvalidOracle");
  }
}

export class InvalidPermission extends Error {
  static readonly code = 6008;
  readonly code = 6008;
  readonly name = "InvalidPermission";
  readonly msg = "InvalidPermission";

  constructor(readonly logs?: string[]) {
    super("6008: InvalidPermission");
  }
}

export class InvalidQueue extends Error {
  static readonly code = 6009;
  readonly code = 6009;
  readonly name = "InvalidQueue";
  readonly msg = "InvalidQueue";

  constructor(readonly logs?: string[]) {
    super("6009: InvalidQueue");
  }
}

export class InvalidAggregatorRound extends Error {
  static readonly code = 6010;
  readonly code = 6010;
  readonly name = "InvalidAggregatorRound";
  readonly msg = "InvalidAggregatorRound";

  constructor(readonly logs?: string[]) {
    super("6010: InvalidAggregatorRound");
  }
}

export class NoResult extends Error {
  static readonly code = 6011;
  readonly code = 6011;
  readonly name = "NoResult";
  readonly msg = "NoResult";

  constructor(readonly logs?: string[]) {
    super("6011: NoResult");
  }
}

export class MathOverflow extends Error {
  static readonly code = 6012;
  readonly code = 6012;
  readonly name = "MathOverflow";
  readonly msg = "MathOverflow";

  constructor(readonly logs?: string[]) {
    super("6012: MathOverflow");
  }
}

export class MathUnderflow extends Error {
  static readonly code = 6013;
  readonly code = 6013;
  readonly name = "MathUnderflow";
  readonly msg = "MathUnderflow";

  constructor(readonly logs?: string[]) {
    super("6013: MathUnderflow");
  }
}

export class DecimalConversionError extends Error {
  static readonly code = 6014;
  readonly code = 6014;
  readonly name = "DecimalConversionError";
  readonly msg = "DecimalConversionError";

  constructor(readonly logs?: string[]) {
    super("6014: DecimalConversionError");
  }
}

export class NoAggregatorJobsFound extends Error {
  static readonly code = 6015;
  readonly code = 6015;
  readonly name = "NoAggregatorJobsFound";
  readonly msg = "NoAggregatorJobsFound";

  constructor(readonly logs?: string[]) {
    super("6015: NoAggregatorJobsFound");
  }
}

export class PermissionDenied extends Error {
  static readonly code = 6016;
  readonly code = 6016;
  readonly name = "PermissionDenied";
  readonly msg = "PermissionDenied";

  constructor(readonly logs?: string[]) {
    super("6016: PermissionDenied");
  }
}

export class ArrayOverflow extends Error {
  static readonly code = 6017;
  readonly code = 6017;
  readonly name = "ArrayOverflow";
  readonly msg = "ArrayOverflow";

  constructor(readonly logs?: string[]) {
    super("6017: ArrayOverflow");
  }
}

export class OracleMismatch extends Error {
  static readonly code = 6018;
  readonly code = 6018;
  readonly name = "OracleMismatch";
  readonly msg = "OracleMismatch";

  constructor(readonly logs?: string[]) {
    super("6018: OracleMismatch");
  }
}

export class InsufficientQueueSize extends Error {
  static readonly code = 6019;
  readonly code = 6019;
  readonly name = "InsufficientQueueSize";
  readonly msg = "InsufficientQueueSize";

  constructor(readonly logs?: string[]) {
    super("6019: InsufficientQueueSize");
  }
}

export class CrankMaxCapacity extends Error {
  static readonly code = 6020;
  readonly code = 6020;
  readonly name = "CrankMaxCapacity";
  readonly msg = "CrankMaxCapacity";

  constructor(readonly logs?: string[]) {
    super("6020: CrankMaxCapacity");
  }
}

export class CrankEmptyError extends Error {
  static readonly code = 6021;
  readonly code = 6021;
  readonly name = "CrankEmptyError";
  readonly msg = "CrankEmptyError";

  constructor(readonly logs?: string[]) {
    super("6021: CrankEmptyError");
  }
}

export class InvalidAuthority extends Error {
  static readonly code = 6022;
  readonly code = 6022;
  readonly name = "InvalidAuthority";
  readonly msg = "InvalidAuthority";

  constructor(readonly logs?: string[]) {
    super("6022: InvalidAuthority");
  }
}

export class OracleAlreadyResponded extends Error {
  static readonly code = 6023;
  readonly code = 6023;
  readonly name = "OracleAlreadyResponded";
  readonly msg = "OracleAlreadyResponded";

  constructor(readonly logs?: string[]) {
    super("6023: OracleAlreadyResponded");
  }
}

export class JobChecksumMismatch extends Error {
  static readonly code = 6024;
  readonly code = 6024;
  readonly name = "JobChecksumMismatch";
  readonly msg = "JobChecksumMismatch";

  constructor(readonly logs?: string[]) {
    super("6024: JobChecksumMismatch");
  }
}

export class IntegerOverflow extends Error {
  static readonly code = 6025;
  readonly code = 6025;
  readonly name = "IntegerOverflow";
  readonly msg = "IntegerOverflow";

  constructor(readonly logs?: string[]) {
    super("6025: IntegerOverflow");
  }
}

export class AggregatorIllegalRoundOpenCall extends Error {
  static readonly code = 6026;
  readonly code = 6026;
  readonly name = "AggregatorIllegalRoundOpenCall";
  readonly msg = "AggregatorIllegalRoundOpenCall";

  constructor(readonly logs?: string[]) {
    super("6026: AggregatorIllegalRoundOpenCall");
  }
}

export class InvalidEscrow extends Error {
  static readonly code = 6027;
  readonly code = 6027;
  readonly name = "InvalidEscrow";
  readonly msg = "InvalidEscrow";

  constructor(readonly logs?: string[]) {
    super("6027: InvalidEscrow");
  }
}

export class InsufficientBalance extends Error {
  static readonly code = 6028;
  readonly code = 6028;
  readonly name = "InsufficientBalance";
  readonly msg = "InsufficientBalance";

  constructor(readonly logs?: string[]) {
    super("6028: InsufficientBalance");
  }
}

export class MintMismatch extends Error {
  static readonly code = 6029;
  readonly code = 6029;
  readonly name = "MintMismatch";
  readonly msg = "MintMismatch";

  constructor(readonly logs?: string[]) {
    super("6029: MintMismatch");
  }
}

export class InsufficientStake extends Error {
  static readonly code = 6030;
  readonly code = 6030;
  readonly name = "InsufficientStake";
  readonly msg = "InsufficientStake";

  constructor(readonly logs?: string[]) {
    super("6030: InsufficientStake");
  }
}

export class ExcessiveCrankPushes extends Error {
  static readonly code = 6031;
  readonly code = 6031;
  readonly name = "ExcessiveCrankPushes";
  readonly msg = "ExcessiveCrankPushes";

  constructor(readonly logs?: string[]) {
    super("6031: ExcessiveCrankPushes");
  }
}

export class CrankNoElementsReady extends Error {
  static readonly code = 6032;
  readonly code = 6032;
  readonly name = "CrankNoElementsReady";
  readonly msg = "CrankNoElementsReady";

  constructor(readonly logs?: string[]) {
    super("6032: CrankNoElementsReady");
  }
}

export class InvalidKey extends Error {
  static readonly code = 6033;
  readonly code = 6033;
  readonly name = "InvalidKey";
  readonly msg = "InvalidKey";

  constructor(readonly logs?: string[]) {
    super("6033: InvalidKey");
  }
}

export class Unimplemented extends Error {
  static readonly code = 6034;
  readonly code = 6034;
  readonly name = "Unimplemented";
  readonly msg = "Unimplemented";

  constructor(readonly logs?: string[]) {
    super("6034: Unimplemented");
  }
}

export class SelfInvokeRequired extends Error {
  static readonly code = 6035;
  readonly code = 6035;
  readonly name = "SelfInvokeRequired";
  readonly msg = "SelfInvokeRequired";

  constructor(readonly logs?: string[]) {
    super("6035: SelfInvokeRequired");
  }
}

export class InsufficientGas extends Error {
  static readonly code = 6036;
  readonly code = 6036;
  readonly name = "InsufficientGas";
  readonly msg = "InsufficientGas";

  constructor(readonly logs?: string[]) {
    super("6036: InsufficientGas");
  }
}

export class AggregatorEmpty extends Error {
  static readonly code = 6037;
  readonly code = 6037;
  readonly name = "AggregatorEmpty";
  readonly msg = "AggregatorEmpty";

  constructor(readonly logs?: string[]) {
    super("6037: AggregatorEmpty");
  }
}

export class NotAllowedInPromise extends Error {
  static readonly code = 6038;
  readonly code = 6038;
  readonly name = "NotAllowedInPromise";
  readonly msg = "NotAllowedInPromise";

  constructor(readonly logs?: string[]) {
    super("6038: NotAllowedInPromise");
  }
}

export class ViewOnlyFunction extends Error {
  static readonly code = 6039;
  readonly code = 6039;
  readonly name = "ViewOnlyFunction";
  readonly msg = "ViewOnlyFunction";

  constructor(readonly logs?: string[]) {
    super("6039: ViewOnlyFunction");
  }
}

export class PredecessorFailed extends Error {
  static readonly code = 6040;
  readonly code = 6040;
  readonly name = "PredecessorFailed";
  readonly msg = "PredecessorFailed";

  constructor(readonly logs?: string[]) {
    super("6040: PredecessorFailed");
  }
}

export class InvalidAmount extends Error {
  static readonly code = 6041;
  readonly code = 6041;
  readonly name = "InvalidAmount";
  readonly msg = "InvalidAmount";

  constructor(readonly logs?: string[]) {
    super("6041: InvalidAmount");
  }
}
