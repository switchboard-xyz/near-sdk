import * as types from "./generated/index.js";
import { FinalExecutionOutcome } from "near-api-js/lib/providers";
import { Action, functionCall } from "near-api-js/lib/transaction";
import { DEFAULT_FUNCTION_CALL_GAS } from "./sbv2.js";
import BN from "bn.js";

export function getDefaultGas(action: string): BN {
  switch (action) {
    case "escrow_init":
      return new BN("10000000000000");
    default:
      return DEFAULT_FUNCTION_CALL_GAS;
  }
}

export const ACTION_GAS_MAP = new Map<string, BN>([
  ["escrow_init", new BN("20000000000000")],
]);

export abstract class SwitchboardAction<
  T extends
    | {
        toSerde(): Record<string, any>;
      }
    | {
        toJSON(): Record<string, any>;
      }
> {
  readonly action: Action;

  constructor(
    readonly name: string,
    params: T,
    gas = DEFAULT_FUNCTION_CALL_GAS,
    deposit = new BN(0)
  ) {
    const ix =
      "toSerde" in params
        ? params.toSerde()
        : "toJSON" in params
        ? params.toJSON()
        : undefined;

    if (!ix) {
      throw new Error(`Failed to get instruction arguements`);
    }

    this.action = functionCall(
      this.name,
      {
        ix,
      },
      gas,
      deposit
    );
  }

  async send<
    T extends {
      sendAction(action: Action): Promise<FinalExecutionOutcome>;
    }
  >(program: T): Promise<FinalExecutionOutcome> {
    return await program.sendAction(this.action);
  }
}

export class AggregatorCreateAction extends SwitchboardAction<types.AggregatorInit> {
  static action_name = "aggregator_init";

  constructor(
    params: types.AggregatorInit,
    gas = DEFAULT_FUNCTION_CALL_GAS,
    deposit = new BN(0)
  ) {
    super(AggregatorCreateAction.action_name, params, gas, deposit);
  }
}

export class AggregatorSetConfigsAction extends SwitchboardAction<types.AggregatorSetConfigs> {
  static action_name = "aggregator_set_configs";

  constructor(
    params: types.AggregatorSetConfigs,
    gas = DEFAULT_FUNCTION_CALL_GAS,
    deposit = new BN(0)
  ) {
    super(AggregatorSetConfigsAction.action_name, params, gas, deposit);
  }
}

export class AggregatorOpenRoundAction extends SwitchboardAction<types.AggregatorOpenRound> {
  static action_name = "aggregator_open_round";

  constructor(
    params: types.AggregatorOpenRound,
    gas = DEFAULT_FUNCTION_CALL_GAS,
    deposit = new BN(0)
  ) {
    super(AggregatorOpenRoundAction.action_name, params, gas, deposit);
  }
}

export class AggregatorSaveResultAction extends SwitchboardAction<types.AggregatorSaveResult> {
  static action_name = "aggregator_save_result";

  constructor(
    params: types.AggregatorSaveResult,
    gas = DEFAULT_FUNCTION_CALL_GAS,
    deposit = new BN(0)
  ) {
    super(AggregatorSaveResultAction.action_name, params, gas, deposit);
  }
}

export class AggregatorFundAction extends SwitchboardAction<types.AggregatorFund> {
  static action_name = "aggregator_fund";

  constructor(
    params: types.AggregatorFund,
    gas = DEFAULT_FUNCTION_CALL_GAS,
    deposit = new BN(0)
  ) {
    super(AggregatorFundAction.action_name, params, gas, deposit);
  }
}

export class AggregatorAddJobAction extends SwitchboardAction<types.AggregatorAddJob> {
  static action_name = "aggregator_add_job";

  constructor(
    params: types.AggregatorAddJob,
    gas = DEFAULT_FUNCTION_CALL_GAS,
    deposit = new BN(0)
  ) {
    super(AggregatorAddJobAction.action_name, params, gas, deposit);
  }
}

export class AggregatorRemoveJobAction extends SwitchboardAction<types.AggregatorRemoveJob> {
  static action_name = "aggregator_remove_job";

  constructor(
    params: types.AggregatorRemoveJob,
    gas = DEFAULT_FUNCTION_CALL_GAS,
    deposit = new BN(0)
  ) {
    super(AggregatorRemoveJobAction.action_name, params, gas, deposit);
  }
}

export class OracleQueueInitAction extends SwitchboardAction<types.OracleQueueInit> {
  static action_name = "oracle_queue_init";

  constructor(
    params: types.OracleQueueInit,
    gas = DEFAULT_FUNCTION_CALL_GAS,
    deposit = new BN(0)
  ) {
    super(OracleQueueInitAction.action_name, params, gas, deposit);
  }
}

export class OracleInitInitAction extends SwitchboardAction<types.OracleInit> {
  static action_name = "oracle_init";

  constructor(
    params: types.OracleInit,
    gas = DEFAULT_FUNCTION_CALL_GAS,
    deposit = new BN(0)
  ) {
    super(OracleInitInitAction.action_name, params, gas, deposit);
  }
}

export class OracleHeartbeatAction extends SwitchboardAction<types.OracleHeartbeat> {
  static action_name = "oracle_heartbeat";

  constructor(
    params: types.OracleHeartbeat,
    gas = DEFAULT_FUNCTION_CALL_GAS,
    deposit = new BN(0)
  ) {
    super(OracleHeartbeatAction.action_name, params, gas, deposit);
  }
}

export class CrankInitAction extends SwitchboardAction<types.CrankInit> {
  static action_name = "crank_init";

  constructor(
    params: types.CrankInit,
    gas = DEFAULT_FUNCTION_CALL_GAS,
    deposit = new BN(0)
  ) {
    super(CrankInitAction.action_name, params, gas, deposit);
  }
}

export class CrankPushAction extends SwitchboardAction<types.CrankPush> {
  static action_name = "crank_push";

  constructor(
    params: types.CrankPush,
    gas = DEFAULT_FUNCTION_CALL_GAS,
    deposit = new BN(0)
  ) {
    super(CrankPushAction.action_name, params, gas, deposit);
  }
}

export class CrankPopAction extends SwitchboardAction<types.CrankPop> {
  static action_name = "crank_pop";

  constructor(
    params: types.CrankPop,
    gas = DEFAULT_FUNCTION_CALL_GAS,
    deposit = new BN(0)
  ) {
    super(CrankPopAction.action_name, params, gas, deposit);
  }
}

export class EscrowInitAction extends SwitchboardAction<types.EscrowInit> {
  static action_name = "escrow_init";

  constructor(
    params: types.EscrowInit,
    gas = DEFAULT_FUNCTION_CALL_GAS,
    deposit = new BN(0)
  ) {
    super(EscrowInitAction.action_name, params, gas, deposit);
  }
}

export class EscrowFundAction extends SwitchboardAction<types.EscrowFund> {
  static action_name = "escrow_fund";

  constructor(
    params: types.EscrowFund,
    gas = DEFAULT_FUNCTION_CALL_GAS,
    deposit = new BN(0)
  ) {
    super(EscrowFundAction.action_name, params, gas, deposit);
  }
}

export class EscrowWithdrawAction extends SwitchboardAction<types.EscrowWithdraw> {
  static action_name = "escrow_withdraw";

  constructor(
    params: types.EscrowWithdraw,
    gas = DEFAULT_FUNCTION_CALL_GAS,
    deposit = new BN(0)
  ) {
    super(EscrowWithdrawAction.action_name, params, gas, deposit);
  }
}
