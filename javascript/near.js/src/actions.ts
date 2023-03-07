import * as types from "./generated/index.js";
import { handleReceipt } from "./errors.js";
import {
  DEFAULT_FUNCTION_CALL_GAS,
  DEFAULT_FUNCTION_CALL_STORAGE_DEPOSIT,
  STORAGE_COST_PER_BYTE,
} from "./sbv2.js";

import BN from "bn.js";
import { providers, transactions } from "near-api-js";
import { Gas, NEAR } from "near-units";

const ZERO_NEAR = NEAR.parse("0");
const ONE_YOCTO = NEAR.parse("0.000000000000000000000001");

export type SwitchboardActionType =
  | "aggregator_add_history"
  | "aggregator_add_job"
  | "aggregator_fund"
  | "aggregator_init"
  | "aggregator_open_round"
  | "aggregator_read"
  | "aggregator_remove_job"
  | "aggregator_save_result"
  | "aggregator_set_configs"
  | "aggregator_withdraw"
  | "crank_init"
  | "crank_pop"
  | "crank_push"
  | "escrow_fund"
  | "escrow_init"
  | "escrow_withdraw"
  | "job_init"
  | "oracle_heartbeat"
  | "oracle_init"
  | "oracle_stake"
  | "oracle_unstake"
  | "permission_init"
  | "permission_set"
  | "oracle_queue_init"
  | "oracle_queue_set_configs";

export interface ISwitchboardAction {
  name: SwitchboardActionType;
  gas: Gas;
  storageDeposit: NEAR;
}

export abstract class SwitchboardAction<
  T extends
    | {
        toSerde(): Record<string, any>;
      }
    | {
        toJSON(): Record<string, any>;
      }
> implements ISwitchboardAction
{
  readonly action: transactions.Action;

  constructor(
    readonly name: SwitchboardActionType,
    params: T,
    readonly gas: Gas,
    readonly storageDeposit: NEAR
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

    this.action = transactions.functionCall(
      this.name,
      {
        ix,
      },
      gas,
      storageDeposit
    );
  }

  async send<
    T extends {
      sendAction(
        action: transactions.Action
      ): Promise<providers.FinalExecutionOutcome>;
    }
  >(program: T): Promise<providers.FinalExecutionOutcome> {
    const txnReceipt = await program.sendAction(this.action);
    const result = handleReceipt(txnReceipt);
    if (result instanceof types.SwitchboardError || result instanceof Error) {
      throw result;
    }

    return txnReceipt;
  }
}

/** AGGREGATOR ACTIONS */

export class AggregatorAddHistoryAction extends SwitchboardAction<types.AggregatorAddHistory> {
  static actionName: SwitchboardActionType = "aggregator_add_history";
  static gas = Gas.parse(`300 Tgas`);
  static storageDeposit = STORAGE_COST_PER_BYTE.mul(new BN(124)); // per row, do not lower

  constructor(
    params: types.AggregatorAddHistory,
    gas = AggregatorAddHistoryAction.gas,
    storage = AggregatorAddHistoryAction.storageDeposit // per row amount, we'll handle the conversion
  ) {
    super(
      AggregatorAddHistoryAction.actionName,
      params,
      gas,
      storage.mul(new BN(params.numRows))
    );
  }
}

export class AggregatorAddJobAction extends SwitchboardAction<types.AggregatorAddJob> {
  static actionName: SwitchboardActionType = "aggregator_add_job";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = STORAGE_COST_PER_BYTE.mul(new BN(200)); // maybe 65

  constructor(
    params: types.AggregatorAddJob,
    gas = AggregatorAddJobAction.gas,
    storage = AggregatorAddJobAction.storageDeposit
  ) {
    super(AggregatorAddJobAction.actionName, params, gas, storage);
  }
}

export class AggregatorFundAction extends SwitchboardAction<types.AggregatorFund> {
  static actionName: SwitchboardActionType = "aggregator_fund";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = ONE_YOCTO;

  constructor(
    params: types.AggregatorFund,
    gas = AggregatorFundAction.gas,
    storage = AggregatorFundAction.storageDeposit
  ) {
    super(AggregatorFundAction.actionName, params, gas, storage);
  }
}

export class AggregatorInitAction extends SwitchboardAction<types.AggregatorInit> {
  static actionName: SwitchboardActionType = "aggregator_init";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = STORAGE_COST_PER_BYTE.mul(new BN(3000));

  constructor(
    params: types.AggregatorInit,
    gas = AggregatorInitAction.gas,
    storage = AggregatorInitAction.storageDeposit
  ) {
    super(AggregatorInitAction.actionName, params, gas, storage);
  }
}

export class AggregatorOpenRoundAction extends SwitchboardAction<types.AggregatorOpenRound> {
  static actionName: SwitchboardActionType = "aggregator_open_round";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = STORAGE_COST_PER_BYTE.mul(new BN(250));

  constructor(
    params: types.AggregatorOpenRound,
    gas = AggregatorOpenRoundAction.gas,
    storage = AggregatorOpenRoundAction.storageDeposit
  ) {
    super(AggregatorOpenRoundAction.actionName, params, gas, storage);
  }
}

export class AggregatorReadAction extends SwitchboardAction<types.AggregatorRead> {
  static actionName: SwitchboardActionType = "aggregator_read";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = ONE_YOCTO;

  constructor(
    params: types.AggregatorRead,
    gas = AggregatorReadAction.gas,
    storage = AggregatorReadAction.storageDeposit
  ) {
    super(AggregatorReadAction.actionName, params, gas, storage);
  }
}

export class AggregatorRemoveJobAction extends SwitchboardAction<types.AggregatorRemoveJob> {
  static actionName: SwitchboardActionType = "aggregator_remove_job";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = ZERO_NEAR;

  constructor(
    params: types.AggregatorRemoveJob,
    gas = AggregatorRemoveJobAction.gas,
    storage = AggregatorRemoveJobAction.storageDeposit
  ) {
    super(AggregatorRemoveJobAction.actionName, params, gas, storage);
  }
}

export class AggregatorSaveResultAction extends SwitchboardAction<types.AggregatorSaveResult> {
  static actionName: SwitchboardActionType = "aggregator_save_result";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = STORAGE_COST_PER_BYTE.mul(new BN(400));

  constructor(
    params: types.AggregatorSaveResult,
    gas = AggregatorSaveResultAction.gas,
    storage = AggregatorSaveResultAction.storageDeposit
  ) {
    super(AggregatorSaveResultAction.actionName, params, gas, storage);
  }
}

export class AggregatorSetConfigsAction extends SwitchboardAction<types.AggregatorSetConfigs> {
  static actionName: SwitchboardActionType = "aggregator_set_configs";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = STORAGE_COST_PER_BYTE.mul(new BN(100));

  constructor(
    params: types.AggregatorSetConfigs,
    gas = AggregatorSetConfigsAction.gas,
    storage = AggregatorSetConfigsAction.storageDeposit
  ) {
    super(AggregatorSetConfigsAction.actionName, params, gas, storage);
  }
}

export class AggregatorWithdrawAction extends SwitchboardAction<types.AggregatorWithdraw> {
  static actionName: SwitchboardActionType = "aggregator_withdraw";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = ONE_YOCTO;

  constructor(
    params: types.AggregatorWithdraw,
    gas = AggregatorWithdrawAction.gas,
    storage = AggregatorWithdrawAction.storageDeposit
  ) {
    super(AggregatorWithdrawAction.actionName, params, gas, storage);
  }
}

/** CRANK ACTIONS */

export class CrankInitAction extends SwitchboardAction<types.CrankInit> {
  static actionName: SwitchboardActionType = "crank_init";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = STORAGE_COST_PER_BYTE.mul(new BN(500));

  constructor(
    params: types.CrankInit,
    gas = CrankInitAction.gas,
    storage = CrankInitAction.storageDeposit
  ) {
    super(CrankInitAction.actionName, params, gas, storage);
  }
}

export class CrankPopAction extends SwitchboardAction<types.CrankPop> {
  static actionName: SwitchboardActionType = "crank_pop";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = STORAGE_COST_PER_BYTE.mul(new BN(200));

  constructor(
    params: types.CrankPop,
    gas = CrankPopAction.gas,
    storage = CrankPopAction.storageDeposit
  ) {
    super(CrankPopAction.actionName, params, gas, storage);
  }
}

export class CrankPushAction extends SwitchboardAction<types.CrankPush> {
  static actionName: SwitchboardActionType = "crank_push";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = STORAGE_COST_PER_BYTE.mul(new BN(120));

  constructor(
    params: types.CrankPush,
    gas = CrankPushAction.gas,
    storage = CrankPushAction.storageDeposit
  ) {
    super(CrankPushAction.actionName, params, gas, storage);
  }
}

/** ESCROW ACTIONS */

export class EscrowFundAction extends SwitchboardAction<types.EscrowFund> {
  static actionName: SwitchboardActionType = "escrow_fund";
  static gas = Gas.parse("40 Tgas");
  static storageDeposit = ONE_YOCTO;

  constructor(
    params: types.EscrowFund,
    gas = EscrowFundAction.gas,
    storage = EscrowFundAction.storageDeposit
  ) {
    super(EscrowFundAction.actionName, params, gas, storage);
  }
}

export class EscrowInitAction extends SwitchboardAction<types.EscrowInit> {
  static actionName: SwitchboardActionType = "escrow_init";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = STORAGE_COST_PER_BYTE.mul(new BN(1000));

  constructor(
    params: types.EscrowInit,
    gas = EscrowInitAction.gas,
    storage = EscrowInitAction.storageDeposit
  ) {
    super(EscrowInitAction.actionName, params, gas, storage);
  }
}

export class EscrowWithdrawAction extends SwitchboardAction<types.EscrowWithdraw> {
  static actionName: SwitchboardActionType = "escrow_withdraw";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = ONE_YOCTO;

  constructor(
    params: types.EscrowWithdraw,
    gas = EscrowWithdrawAction.gas,
    storage = EscrowWithdrawAction.storageDeposit
  ) {
    super(EscrowWithdrawAction.actionName, params, gas, storage);
  }
}

/** JOB ACTIONS */

export class JobInitAction extends SwitchboardAction<types.JobInit> {
  static actionName: SwitchboardActionType = "job_init";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = DEFAULT_FUNCTION_CALL_STORAGE_DEPOSIT;

  constructor(
    params: types.JobInit,
    gas = JobInitAction.gas,
    storage = JobInitAction.storageDeposit
  ) {
    super(JobInitAction.actionName, params, gas, storage);
  }
}

/** ORACLE ACTIONS */

export class OracleHeartbeatAction extends SwitchboardAction<types.OracleHeartbeat> {
  static actionName: SwitchboardActionType = "oracle_heartbeat";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = STORAGE_COST_PER_BYTE.mul(new BN(250));

  constructor(
    params: types.OracleHeartbeat,
    gas = OracleHeartbeatAction.gas,
    storage = OracleHeartbeatAction.storageDeposit
  ) {
    super(OracleHeartbeatAction.actionName, params, gas, storage);
  }
}

export class OracleInitAction extends SwitchboardAction<types.OracleInit> {
  static actionName: SwitchboardActionType = "oracle_init";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = STORAGE_COST_PER_BYTE.mul(new BN(2000));

  constructor(
    params: types.OracleInit,
    gas = OracleInitAction.gas,
    storage = OracleInitAction.storageDeposit
  ) {
    super(OracleInitAction.actionName, params, gas, storage);
  }
}

export class OracleStakeAction extends SwitchboardAction<types.OracleStake> {
  static actionName: SwitchboardActionType = "oracle_stake";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = ONE_YOCTO;

  constructor(
    params: types.OracleStake,
    gas = OracleStakeAction.gas,
    storage = OracleStakeAction.storageDeposit
  ) {
    super(OracleStakeAction.actionName, params, gas, storage);
  }
}

export class OracleUnstakeAction extends SwitchboardAction<types.OracleUnstake> {
  static actionName: SwitchboardActionType = "oracle_unstake";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = ONE_YOCTO;

  constructor(
    params: types.OracleUnstake,
    gas = OracleUnstakeAction.gas,
    storage = OracleUnstakeAction.storageDeposit
  ) {
    super(OracleUnstakeAction.actionName, params, gas, storage);
  }
}

/** PERMISSION ACTIONS */

export class PermissionInitAction extends SwitchboardAction<types.PermissionInit> {
  static actionName: SwitchboardActionType = "permission_init";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = STORAGE_COST_PER_BYTE.mul(new BN(500));

  constructor(
    params: types.PermissionInit,
    gas = PermissionInitAction.gas,
    storage = PermissionInitAction.storageDeposit
  ) {
    super(PermissionInitAction.actionName, params, gas, storage);
  }
}

export class PermissionSetAction extends SwitchboardAction<types.PermissionSet> {
  static actionName: SwitchboardActionType = "permission_set";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = STORAGE_COST_PER_BYTE.mul(new BN(50));

  constructor(
    params: types.PermissionSet,
    gas = PermissionSetAction.gas,
    storage = PermissionSetAction.storageDeposit
  ) {
    super(PermissionSetAction.actionName, params, gas, storage);
  }
}

/** ORACLE QUEUE ACTIONS */

export class OracleQueueInitAction extends SwitchboardAction<types.OracleQueueInit> {
  static actionName: SwitchboardActionType = "oracle_queue_init";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = DEFAULT_FUNCTION_CALL_STORAGE_DEPOSIT;

  constructor(
    params: types.OracleQueueInit,
    gas = OracleQueueInitAction.gas,
    storage = OracleQueueInitAction.storageDeposit
  ) {
    super(OracleQueueInitAction.actionName, params, gas, storage);
  }
}

export class OracleQueueSetConfigsAction extends SwitchboardAction<types.OracleQueueSetConfigs> {
  static actionName: SwitchboardActionType = "oracle_queue_set_configs";
  static gas = DEFAULT_FUNCTION_CALL_GAS;
  static storageDeposit = DEFAULT_FUNCTION_CALL_STORAGE_DEPOSIT;

  constructor(
    params: types.OracleQueueSetConfigs,
    gas = OracleQueueSetConfigsAction.gas,
    storage = OracleQueueSetConfigsAction.storageDeposit
  ) {
    super(OracleQueueSetConfigsAction.actionName, params, gas, storage);
  }
}
