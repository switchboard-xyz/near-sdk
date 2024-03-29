import { AggregatorView, AggregatorViewSerde } from "./generated/index.js";
import { SwitchboardDecimal } from "./generated/types/SwitchboardDecimal.js";
import * as actions from "./actions.js";
import { types } from "./index.js";
import { roClient, SwitchboardProgram } from "./program.js";
import { DEFAULT_FT_STORAGE_DEPOSIT_NUMBER } from "./token";
import { fromBase58, isBase58, parseAddressString } from "./utils.js";

import { OracleJob } from "@switchboard-xyz/common";
import Big from "big.js";
import BN from "bn.js";
import * as crypto from "crypto";
import _ from "lodash";
import { KeyPair, providers, transactions, utils } from "near-api-js";
import { Gas, NEAR } from "near-units";

export { SwitchboardDecimal } from "./generated/types/SwitchboardDecimal.js";

Big.DP = 40;

export const TRANSACTION_MAX_GAS = Gas.parse(`300 Tgas`);

export const DEFAULT_FUNCTION_CALL_GAS = Gas.parse(`20 Tgas`);
export const MINIMAL_FUNCTION_CALL_GAS = Gas.parse(`10 TGas`);

export const DEFAULT_FUNCTION_CALL_STORAGE_DEPOSIT = NEAR.parse("0.025");
export const STORAGE_COST_PER_BYTE = NEAR.parse("0.00001");

export const DEFAULT_ESCROW_SEED: string = "DefaultEscrowSeed";

export interface AccountParams {
  program: SwitchboardProgram;
  address: Uint8Array;
}

export class AggregatorAccount {
  program: SwitchboardProgram;
  address: Uint8Array;

  /**
   * AggregatorAccount constructor
   * @param params initialization params.
   */
  public constructor(params: AccountParams) {
    this.program = params.program;
    this.address = params.address;
  }

  get escrow(): EscrowAccount {
    const hash = crypto
      .createHash("sha256")
      .update(Buffer.from("AggregatorEscrow"))
      .update(this.program.mint.address)
      .update(this.address);
    return new EscrowAccount({
      program: this.program,
      address: new Uint8Array(hash.digest()),
    });
  }

  public static async create(
    program: SwitchboardProgram,
    params: {
      authority: string;
      queue: Uint8Array;
      name: Buffer;
      metadata: Buffer;
      batchSize: number;
      minOracleResults: number;
      minJobResults: number;
      minUpdateDelaySeconds: number;
      startAfter: number;
      varianceThreshold: SwitchboardDecimal;
      forceReportPeriod: number;
      rewardEscrow?: Uint8Array;
      crank?: Uint8Array;
      maxGasCost?: number;
      readCharge?: number;
    }
  ): Promise<AggregatorAccount> {
    const [action, aggregator] = AggregatorAccount.createAction(
      program,
      params
    );
    const txnReceipt = await program.sendAction(action);
    // TODO: do we want to handle failure case?
    return aggregator;
  }

  public static createAction(
    program: SwitchboardProgram,
    params: {
      authority: string;
      queue: Uint8Array;
      name: Buffer;
      metadata: Buffer;
      batchSize: number;
      minOracleResults: number;
      minJobResults: number;
      minUpdateDelaySeconds: number;
      startAfter: number;
      varianceThreshold: SwitchboardDecimal;
      forceReportPeriod: number;
      rewardEscrow?: Uint8Array;
      crank?: Uint8Array;
      maxGasCost?: number;
      readCharge?: number;
    }
  ): [transactions.Action, AggregatorAccount] {
    const address = KeyPair.fromRandom("ed25519").getPublicKey().data;
    const action = transactions.functionCall(
      actions.AggregatorInitAction.actionName,
      {
        ix: new types.AggregatorInit({
          address: address,
          authority: params.authority,
          queue: params.queue,
          name: params.name,
          metadata: params.metadata,
          batchSize: params.batchSize,
          minOracleResults: params.minOracleResults,
          minJobResults: params.minJobResults,
          minUpdateDelaySeconds: params.minUpdateDelaySeconds,
          startAfter: new BN(params.startAfter),
          varianceThreshold: new SwitchboardDecimal(
            params.varianceThreshold.mantissa,
            params.varianceThreshold.scale
          ),
          forceReportPeriod: new BN(params.forceReportPeriod),
          crank: params.crank ?? new Uint8Array(32),
          expiration: new BN(0),
          rewardEscrow: params.rewardEscrow ?? new Uint8Array(32),
          maxGasCost: NEAR.parse(`${params.maxGasCost ?? 0} N`),
          readCharge: NEAR.parse(`${params.readCharge ?? 0} N`),
        }).toSerde(),
      },
      actions.AggregatorInitAction.gas,
      actions.AggregatorInitAction.storageDeposit
    );
    const aggregator = new AggregatorAccount({ program, address });
    return [action, aggregator];
  }

  static async loadAuthorityKeys(
    program: SwitchboardProgram,
    authority: string
  ): Promise<Array<Uint8Array>> {
    const data = await roClient(program.connection).viewFunction({
      contractId: program.programId,
      methodName: "view_aggregators_with_authority",
      args: {
        ix: new types.ViewAggregatorsWithAuthority({
          authority: authority,
        }).toSerde(),
      },
    });
    return (data as number[][]).map((bytes) => new Uint8Array(bytes));
  }

  static async loadFromAuthority(
    program: SwitchboardProgram,
    authority: string
  ): Promise<Array<[AggregatorAccount, AggregatorView]>> {
    const data = await roClient(program.connection).viewFunction({
      contractId: program.programId,
      methodName: "view_aggregators_state_with_authority",
      args: {
        ix: new types.ViewAggregatorsStateWithAuthority({
          authority: authority,
        }).toSerde(),
      },
    });

    return (data as AggregatorViewSerde[]).map((a) => [
      new AggregatorAccount({ program, address: new Uint8Array(a.address) }),
      AggregatorView.fromSerde(a),
    ]);
  }

  async loadData(): Promise<types.AggregatorView> {
    const data: types.AggregatorViewSerde = await roClient(
      this.program.connection
    ).viewFunction({
      contractId: this.program.programId,
      methodName: "view_aggregator",
      args: {
        ix: new types.ViewAggregator({ address: this.address }).toSerde(),
      },
    });
    return types.AggregatorView.fromSerde(data);
  }

  async loadHistoryPage(
    page: number
  ): Promise<types.AggregatorHistoryPageView> {
    const data: types.AggregatorHistoryPageViewSerde = await roClient(
      this.program.connection
    ).viewFunction({
      contractId: this.program.programId,
      methodName: "view_aggregator_history",
      args: {
        ix: new types.ViewAggregatorHistory({
          address: this.address,
          page: page,
        }).toSerde(),
      },
    });
    return types.AggregatorHistoryPageView.fromSerde(data);
  }

  async loadHistory(): Promise<Array<types.AggregatorHistoryRow>> {
    const aggregator = await this.loadData();
    const numPages = Math.ceil(aggregator.historyLimit.toNumber() / 1000);
    const pages: types.AggregatorHistoryPageView[] = await Promise.all(
      Array.from(Array(numPages).keys()).map((n) => this.loadHistoryPage(n))
    );
    const history = pages
      .reduce(
        (
          rows: Array<types.AggregatorHistoryRow>,
          page: types.AggregatorHistoryPageView
        ) => {
          rows.push(...page.history);
          return rows;
        },
        []
      )
      .filter((r) => r.roundId.gt(new BN(0)))
      .sort((a, b) => b.roundId.cmp(a.roundId));
    return history;
  }

  async setConfigs(params: {
    authority?: string;
    queue?: Uint8Array;
    name?: Buffer;
    metadata?: Buffer;
    batchSize?: number;
    minOracleResults?: number;
    minJobResults?: number;
    minUpdateDelaySeconds?: number;
    startAfter?: number;
    varianceThreshold?: SwitchboardDecimal;
    forceReportPeriod?: number;
    crank?: Uint8Array;
  }): Promise<providers.FinalExecutionOutcome> {
    const txnReceipt = await this.program.sendAction(
      this.setConfigsAction(params)
    );
    return txnReceipt;
  }

  setConfigsAction(params: {
    authority?: string;
    queue?: Uint8Array;
    name?: Buffer;
    metadata?: Buffer;
    batchSize?: number;
    minOracleResults?: number;
    minJobResults?: number;
    minUpdateDelaySeconds?: number;
    startAfter?: number;
    varianceThreshold?: SwitchboardDecimal;
    forceReportPeriod?: number;
    crank?: Uint8Array;
    rewardEscrow?: Uint8Array;
    readCharge?: BN;
  }): transactions.Action {
    return transactions.functionCall(
      actions.AggregatorSetConfigsAction.actionName,
      {
        ix: new types.AggregatorSetConfigs({
          address: this.address,
          authority: params.authority,
          queue: params.queue,
          name: params.name,
          metadata: params.metadata,
          batchSize: params.batchSize,
          minOracleResults: params.minOracleResults,
          minJobResults: params.minJobResults,
          minUpdateDelaySeconds: params.minUpdateDelaySeconds,
          startAfter:
            params === undefined ? undefined : new BN(params.startAfter),
          varianceThreshold: params.varianceThreshold
            ? new SwitchboardDecimal(
                params.varianceThreshold.mantissa,
                params.varianceThreshold.scale
              )
            : undefined,
          forceReportPeriod:
            params.forceReportPeriod === undefined
              ? undefined
              : new BN(params.forceReportPeriod),
          crank: params.crank,
          rewardEscrow: params.rewardEscrow,
          readCharge: params.readCharge ?? new BN(0),
        }).toSerde(),
      },
      actions.AggregatorSetConfigsAction.gas,
      actions.AggregatorSetConfigsAction.storageDeposit
    );
  }

  async openRound(params: {
    rewardRecipient: Uint8Array;
  }): Promise<providers.FinalExecutionOutcome> {
    const txnReceipt = await this.program.sendAction(
      this.openRoundAction(params)
    );
    return txnReceipt;
  }

  openRoundAction(params: {
    rewardRecipient: Uint8Array;
  }): transactions.Action {
    return transactions.functionCall(
      actions.AggregatorOpenRoundAction.actionName,
      {
        ix: new types.AggregatorOpenRound({
          aggregator: this.address,
          jitter: 0,
          rewardRecipient: params.rewardRecipient,
        }).toSerde(),
      },
      actions.AggregatorOpenRoundAction.gas,
      actions.AggregatorOpenRoundAction.storageDeposit
    );
  }

  async saveResult(params: {
    oracleIdx: number;
    error: boolean;
    value: SwitchboardDecimal;
    jobsChecksum: Uint8Array;
    minResponse: SwitchboardDecimal;
    maxResponse: SwitchboardDecimal;
  }): Promise<providers.FinalExecutionOutcome> {
    const txnReceipt = await this.program.sendAction(
      this.saveResultAction(params)
    );
    return txnReceipt;
  }

  saveResultAction(params: {
    oracleIdx: number;
    error: boolean;
    value: SwitchboardDecimal;
    jobsChecksum: Uint8Array;
    minResponse: SwitchboardDecimal;
    maxResponse: SwitchboardDecimal;
  }): transactions.Action {
    return transactions.functionCall(
      actions.AggregatorSaveResultAction.actionName,
      {
        ix: new types.AggregatorSaveResult({
          aggregatorKey: this.address,
          oracleIdx: params.oracleIdx,
          error: params.error,
          jobsChecksum: params.jobsChecksum,
          value: new types.JsonDecimal({
            mantissa: params.value.mantissa,
            scale: params.value.scale,
          }),
          minResponse: new types.JsonDecimal({
            mantissa: params.minResponse.mantissa,
            scale: params.minResponse.scale,
          }),
          maxResponse: new types.JsonDecimal({
            mantissa: params.maxResponse.mantissa,
            scale: params.maxResponse.scale,
          }),
        }).toSerde(),
      },
      actions.AggregatorSaveResultAction.gas,
      actions.AggregatorSaveResultAction.storageDeposit
    );
  }

  async fund(params: {
    funder: Uint8Array;
    amount: number;
  }): Promise<providers.FinalExecutionOutcome> {
    const txnReceipt = await this.program.sendAction(this.fundAction(params));
    return txnReceipt;
  }

  fundAction(params: {
    funder: Uint8Array;
    amount: number;
  }): transactions.Action {
    return transactions.functionCall(
      actions.AggregatorFundAction.actionName,
      {
        ix: new types.AggregatorFund({
          address: this.address,
          funder: params.funder,
          amount: NEAR.parse(params.amount.toFixed(20)),
        }).toSerde(),
      },
      actions.AggregatorFundAction.gas,
      actions.AggregatorFundAction.storageDeposit
    );
  }

  async withdraw(params: {
    authority: Uint8Array;
    amount: number;
  }): Promise<providers.FinalExecutionOutcome> {
    return this.program.sendAction(this.withdrawAction(params));
  }

  withdrawAction(params: {
    authority: Uint8Array;
    amount: number;
  }): transactions.Action {
    return transactions.functionCall(
      actions.AggregatorWithdrawAction.actionName,
      {
        ix: new types.AggregatorWithdraw({
          address: this.address,
          destination: params.authority,
          amount: NEAR.parse(params.amount.toFixed(20)),
        }).toSerde(),
      },
      actions.AggregatorWithdrawAction.gas,
      actions.AggregatorWithdrawAction.storageDeposit
    );
  }

  async addJob(params: {
    job: Uint8Array;
    weight?: number;
  }): Promise<providers.FinalExecutionOutcome> {
    const txnReceipt = await this.program.sendAction(this.addJobAction(params));
    return txnReceipt;
  }

  addJobAction(params: {
    job: Uint8Array;
    weight?: number;
  }): transactions.Action {
    return transactions.functionCall(
      actions.AggregatorAddJobAction.actionName,
      {
        ix: new types.AggregatorAddJob({
          address: this.address,
          job: params.job,
          weight: params.weight ?? 1,
        }).toSerde(),
      },
      actions.AggregatorAddJobAction.gas,
      actions.AggregatorAddJobAction.storageDeposit
    );
  }

  async removeJob(params: {
    idx: number;
  }): Promise<providers.FinalExecutionOutcome> {
    const txnReceipt = await this.program.sendAction(
      this.removeJobAction(params)
    );
    return txnReceipt;
  }

  removeJobAction(params: { idx: number }): transactions.Action {
    return transactions.functionCall(
      actions.AggregatorRemoveJobAction.actionName,
      {
        ix: new types.AggregatorRemoveJob({
          address: this.address,
          idx: params.idx,
        }).toSerde(),
      },
      actions.AggregatorRemoveJobAction.gas,
      actions.AggregatorRemoveJobAction.storageDeposit
    );
  }

  async addHistory(params: {
    numRows: number;
  }): Promise<providers.FinalExecutionOutcome> {
    const txnReceipt = await this.program.sendAction(
      this.addHistoryAction(params)
    );
    return txnReceipt;
  }

  addHistoryAction(params: { numRows: number }): transactions.Action {
    const switchboardAction = new actions.AggregatorAddHistoryAction(
      new types.AggregatorAddHistory({
        address: this.address,
        numRows: params.numRows,
      })
    );
    return switchboardAction.action;
  }

  static shouldReportValue(
    value: Big,
    aggregator: types.AggregatorView
  ): boolean {
    if ((aggregator.latestConfirmedRound?.numSuccess ?? 0) === 0) {
      return true;
    }
    const timestamp = new BN(Math.floor(Date.now() / 1000), 10);
    const startAfter = new BN(aggregator.startAfter, 10);
    if (startAfter.gt(timestamp)) {
      return false;
    }

    const varianceThreshold = new SwitchboardDecimal(
      aggregator.varianceThreshold.mantissa,
      aggregator.varianceThreshold.scale
    ).toBig();

    const latestResult = new SwitchboardDecimal(
      aggregator.latestConfirmedRound.result.mantissa,
      aggregator.latestConfirmedRound.result.scale
    ).toBig();

    if (
      aggregator.latestConfirmedRound.roundOpenTimestamp
        .add(aggregator.forceReportPeriod)
        .lt(timestamp)
    ) {
      return true;
    }

    let diff = safeDiv(latestResult, value);
    if (diff.abs().gt(1)) {
      diff = safeDiv(value, latestResult);
    }

    // I dont want to think about variance percentage when values cross 0.
    // Changes the scale of what we consider a "percentage".
    if (diff.lt(0)) {
      return true;
    }
    const change = new Big(1).minus(diff);
    return change.gt(varianceThreshold);
  }
}

function safeDiv(number_: Big, denominator: Big, decimals = 20): Big {
  const oldDp = Big.DP;
  Big.DP = decimals;
  const result = number_.div(denominator);
  Big.DP = oldDp;
  return result;
}

export class QueueAccount {
  program: SwitchboardProgram;
  address: Uint8Array;

  /**
   * QueueAccount constructor
   * @param params initialization params.
   */
  public constructor(params: AccountParams) {
    this.program = params.program;
    this.address = params.address;
  }

  public async createAggregatorFromJSON(params: {
    // queueAddress?: string;
    crankAddress?: string;
    authority?: string;
    name?: string;
    metadata?: string;
    // defaults to 1
    batchSize?: number;
    // defaults to 1
    minOracleResults: number;
    minJobResults?: number;
    minUpdateDelaySeconds: number;
    startAfter?: number;
    varianceThreshold?: Big;
    forceReportPeriod?: number;
    expiration?: number;
    disableCrank?: boolean;
    historySize?: number;
    rewardEscrow?: Uint8Array;
    maxGasCost?: number;
    // amount to pre-fund the lease with
    // fundUpTo?: number;
    // if queue requires it, whether to enable permissions
    enable?: boolean;
    jobs: (
      | {
          authority?: string;
          name?: string;
          metadata?: string;
          expiration?: number;
          tasks: Record<string, any>[]; // required
        }
      | string
    )[];
  }): Promise<{
    aggregator: AggregatorAccount;
    permission: PermissionAccount;
    jobs: JobAccount[];
    actions: [string, transactions.Action][];
    batches: transactions.Action[][];
  }> {
    const actions: [string, transactions.Action][] = [];

    const queue = await this.loadData();

    const [escrowAccount, createEscrowAction] =
      await EscrowAccount.getOrCreateStaticAccountAction(this.program);
    if (createEscrowAction) {
      actions.push(["escrow_init", createEscrowAction]);
    }

    const jobs: JobAccount[] = [];
    if (!params.jobs || params.jobs.length === 0) {
      throw new Error(
        `Need to provide at least one job in order to create an aggregator`
      );
    }
    // create createJob and addJob actions
    for (const jobDefinition of params.jobs) {
      if (typeof jobDefinition === "string") {
        const jobAccount = new JobAccount({
          program: this.program,
          address: isBase58(jobDefinition)
            ? fromBase58(jobDefinition)
            : new Uint8Array(JSON.parse(jobDefinition)),
        });
        const jobData = await jobAccount.loadData(); // make sure it exist
        jobs.push(jobAccount);
        continue;
      }
      const oracleJob = OracleJob.fromObject(jobDefinition);
      if (oracleJob.tasks.length === 0) {
        throw new Error(
          `Job definition has 0 tasks defined: ${JSON.stringify(
            jobDefinition
          )} => ${JSON.stringify(oracleJob.toJSON())}`
        );
      }
      const [createJobAction, jobAccount] = JobAccount.createAction(
        this.program,
        {
          authority:
            jobDefinition.authority ??
            params.authority ??
            this.program.account.accountId,
          data: Buffer.from(OracleJob.encodeDelimited(oracleJob).finish()),
        }
      );
      actions.push(["job_init", createJobAction]);
      jobs.push(jobAccount);
    }

    // create the feed
    const [createFeedAction, aggregator] = AggregatorAccount.createAction(
      this.program,
      {
        queue: this.address,
        crank: params.crankAddress
          ? parseAddressString(params.crankAddress)
          : undefined,
        authority: params.authority ?? this.program.account.accountId,
        name: Buffer.from(params.name ?? ""),
        metadata: Buffer.from(params.metadata ?? ""),
        batchSize: params.batchSize ?? 1,
        minOracleResults: params.minOracleResults ?? 1,
        minJobResults: params.minJobResults ?? 1,
        minUpdateDelaySeconds: params.minUpdateDelaySeconds ?? 30,
        startAfter: params.startAfter ?? 0,
        rewardEscrow: params.rewardEscrow ?? undefined,
        varianceThreshold: params.varianceThreshold
          ? SwitchboardDecimal.fromBig(params.varianceThreshold)
          : SwitchboardDecimal.fromBig(new Big(0)),
        forceReportPeriod: params.forceReportPeriod ?? 0,
      }
    );
    actions.push(["aggregator_init", createFeedAction]);

    // create permissions
    const [createPermissionAction, permission] = PermissionAccount.createAction(
      this.program,
      {
        authority: params.authority ?? this.program.account.accountId,
        granter: this.address,
        grantee: aggregator.address,
      }
    );
    actions.push(["permission_init", createPermissionAction]);

    // set permissions if required
    let setPermissionAction: transactions.Action | undefined;
    if (!queue.unpermissionedFeedsEnabled && params.enable) {
      setPermissionAction = permission.setAction({
        permission: SwitchboardPermission.PERMIT_ORACLE_QUEUE_USAGE,
        enable: true,
      });
      actions.push(["permission_set", setPermissionAction]);
    }

    // add to crank
    let crankPushAction: transactions.Action | undefined;
    if (params.crankAddress) {
      const crankAccount = new CrankAccount({
        program: this.program,
        address: parseAddressString(params.crankAddress),
      });
      crankPushAction = crankAccount.pushAction({
        aggregator: aggregator.address,
      });
      actions.push(["crank_push", crankPushAction]);
    }

    jobs.forEach((job) =>
      actions.push([
        "aggregator_add_job",
        aggregator.addJobAction({ job: job.address }),
      ])
    );

    return {
      aggregator,
      permission,
      jobs,
      actions,
      batches: _.chunk(
        actions.map((a) => a[1]),
        15
      ),
    };
  }

  async loadAggregatorKeys(): Promise<Array<Uint8Array>> {
    const data = await roClient(this.program.connection).viewFunction({
      contractId: this.program.programId,
      methodName: "view_aggregators_on_queue",
      args: {
        ix: new types.ViewAggregatorsOnQueue({ queue: this.address }).toSerde(),
      },
    });
    return (data as number[][]).map((bytes) => new Uint8Array(bytes));
  }

  async loadAggregators(): Promise<Array<AggregatorAccount>> {
    const addresses = await this.loadAggregatorKeys();
    return addresses.map(
      (address) => new AggregatorAccount({ program: this.program, address })
    );
  }

  public static async create(
    program: SwitchboardProgram,
    params: {
      authority: string;
      mint: string;
      reward: number;
      minStake: number;
      queueSize: number;
      oracleTimeout: number;
      name?: Buffer;
      metadata?: Buffer;
      varianceToleranceMultiplier?: SwitchboardDecimal;
      feedProbationPeriod?: number;
      slashingEnabled?: boolean;
      consecutiveFeedFailureLimit?: BN;
      consecutiveOracleFailureLimit?: BN;
      unpermissionedFeeds?: boolean;
      unpermissionedVrf?: boolean;
      enableBufferRelayers?: boolean;
      maxGasCost?: number;
    }
  ): Promise<QueueAccount> {
    const [action, queue] = QueueAccount.createAction(program, params);
    const txnReceipt = await program.sendAction(action);
    return queue;
  }

  public static createAction(
    program: SwitchboardProgram,
    params: {
      authority: string;
      mint: string;
      reward: number;
      minStake: number;
      queueSize: number;
      oracleTimeout: number;
      name?: Buffer;
      metadata?: Buffer;
      varianceToleranceMultiplier?: SwitchboardDecimal;
      feedProbationPeriod?: number;
      slashingEnabled?: boolean;
      consecutiveFeedFailureLimit?: BN;
      consecutiveOracleFailureLimit?: BN;
      unpermissionedFeeds?: boolean;
      unpermissionedVrf?: boolean;
      enableBufferRelayers?: boolean;
      maxGasCost?: number;
    }
  ): [transactions.Action, QueueAccount] {
    const address = KeyPair.fromRandom("ed25519").getPublicKey().data;
    const action = transactions.functionCall(
      actions.OracleQueueInitAction.actionName,
      {
        ix: new types.OracleQueueInit({
          address: address,
          authority: params.authority,
          mint: params.mint,
          reward: NEAR.parse(`${params.reward ?? 0} N`),
          minStake: NEAR.parse(`${params.minStake ?? 0} N`),
          queueSize: params.queueSize,
          oracleTimeout: params.oracleTimeout,
          name: (params.name ?? Buffer.from("")).slice(0, 32),
          metadata: params.metadata ?? Buffer.from(""),
          varianceToleranceMultiplier: new SwitchboardDecimal(new BN(0), 0),
          feedProbationPeriod: params.feedProbationPeriod ?? 0,
          slashingEnabled: params.slashingEnabled ?? false,
          consecutiveFeedFailureLimit: new BN(
            params.consecutiveFeedFailureLimit ?? 0
          ),
          consecutiveOracleFailureLimit: new BN(
            params.consecutiveOracleFailureLimit ?? 0
          ),
          unpermissionedFeeds: params.unpermissionedFeeds ?? false,
          unpermissionedVrf: params.unpermissionedVrf ?? false,
          enableBufferRelayers: params.enableBufferRelayers ?? false,
          maxGasCost: NEAR.parse(`${params.maxGasCost ?? 0} N`),
        }).toSerde(),
      },
      actions.OracleQueueInitAction.gas,
      actions.OracleQueueInitAction.storageDeposit
    );
    const queue = new QueueAccount({ program, address });
    return [action, queue];
  }

  async loadData(): Promise<types.OracleQueueView> {
    const data: types.OracleQueueViewSerde = await roClient(
      this.program.connection
    ).viewFunction({
      contractId: this.program.programId,
      methodName: "view_queue",
      args: { ix: new types.ViewQueue({ address: this.address }).toSerde() },
    });
    return types.OracleQueueView.fromSerde(data);
  }

  setConfigsAction(
    params: Partial<{
      authority: string;
      mint: string;
      name: Buffer;
      metadata: Buffer;
      reward: number;
      minStake: number;
      feedProbationPeriod: number;
      oracleTimeout: number;
      slashingEnabled: boolean;
      varianceToleranceMultiplier: SwitchboardDecimal;
      consecutiveFeedFailureLimit: BN;
      consecutiveOracleFailureLimit: BN;
      unpermissionedFeeds: boolean;
      unpermissionedVrf: boolean;
      enableBufferRelayers: boolean;
      maxGasCost: number;
    }>
  ): transactions.Action {
    return transactions.functionCall(
      actions.OracleQueueSetConfigsAction.actionName,
      {
        ix: new types.OracleQueueSetConfigs({
          address: this.address,
          authority: params.authority,
          mint: params.mint,
          name: params.name,
          metadata: params.metadata,
          reward:
            params.reward !== undefined
              ? NEAR.parse(`${params.reward ?? 0} N`)
              : undefined,
          minStake:
            params.minStake !== undefined
              ? NEAR.parse(`${params.minStake ?? 0} N`)
              : undefined,
          feedProbationPeriod: params.feedProbationPeriod,
          oracleTimeout: params.oracleTimeout,
          slashingEnabled: params.slashingEnabled,
          varianceToleranceMultiplier:
            params.varianceToleranceMultiplier !== undefined
              ? new SwitchboardDecimal(
                  params.varianceToleranceMultiplier.mantissa,
                  params.varianceToleranceMultiplier.scale
                )
              : undefined,
          consecutiveFeedFailureLimit: params.consecutiveFeedFailureLimit,
          consecutiveOracleFailureLimit: params.consecutiveOracleFailureLimit,
          unpermissionedFeeds: params.unpermissionedFeeds,
          unpermissionedVrf: params.unpermissionedVrf,
          enableBufferRelayers: params.enableBufferRelayers,
          maxGasCost:
            params.maxGasCost !== undefined
              ? NEAR.parse(`${params.maxGasCost ?? 0} N`)
              : undefined,
        }).toSerde(),
      },
      actions.OracleQueueSetConfigsAction.gas,
      actions.OracleQueueSetConfigsAction.storageDeposit
    );
  }

  async setConfigs(
    params: Partial<{
      authority: string;
      mint: string;
      name: Buffer;
      metadata: Buffer;
      reward: number;
      minStake: number;
      feedProbationPeriod: number;
      oracleTimeout: number;
      slashingEnabled: boolean;
      varianceToleranceMultiplier: SwitchboardDecimal;
      consecutiveFeedFailureLimit: BN;
      consecutiveOracleFailureLimit: BN;
      unpermissionedFeeds: boolean;
      unpermissionedVrf: boolean;
      enableBufferRelayers: boolean;
      maxGasCost: number;
    }>
  ): Promise<providers.FinalExecutionOutcome> {
    const txnReceipt = await this.program.sendAction(
      this.setConfigsAction(params)
    );
    return txnReceipt;
  }
}

export class CrankAccount {
  program: SwitchboardProgram;
  address: Uint8Array;

  /**
   * CrankAccount constructor
   * @param params initialization params.
   */
  public constructor(params: AccountParams) {
    this.program = params.program;
    this.address = params.address;
  }

  public static async create(
    program: SwitchboardProgram,
    params: {
      queue: Uint8Array;
      maxRows: number;
      name?: Buffer;
      metadata?: Buffer;
    }
  ): Promise<CrankAccount> {
    const [action, crank] = CrankAccount.createAction(program, params);
    const txnReceipt = await program.sendAction(action);
    return crank;
  }

  public static createAction(
    program: SwitchboardProgram,
    params: {
      queue: Uint8Array;
      maxRows: number;
      name?: Buffer;
      metadata?: Buffer;
    }
  ): [transactions.Action, CrankAccount] {
    const address = KeyPair.fromRandom("ed25519").getPublicKey().data;
    const action = transactions.functionCall(
      actions.CrankInitAction.actionName,
      {
        ix: new types.CrankInit({
          address: address,
          name: params.name ?? new Uint8Array(),
          metadata: params.metadata ?? new Uint8Array(),
          queue: params.queue,
          maxRows: new BN(params.maxRows),
        }).toSerde(),
      },
      actions.CrankInitAction.gas,
      actions.CrankInitAction.storageDeposit
    );
    const crank = new CrankAccount({ program, address });
    return [action, crank];
  }

  async loadData(): Promise<types.CrankView> {
    const data: types.CrankViewSerde = await roClient(
      this.program.connection
    ).viewFunction({
      contractId: this.program.programId,
      methodName: "view_crank",
      args: { ix: new types.ViewCrank({ address: this.address }).toSerde() },
    });
    return types.CrankView.fromSerde(data);
  }

  async push(params: {
    aggregator: Uint8Array;
  }): Promise<providers.FinalExecutionOutcome> {
    const txnReceipt = await this.program.sendAction(this.pushAction(params));
    return txnReceipt;
  }

  pushAction(params: { aggregator: Uint8Array }): transactions.Action {
    return transactions.functionCall(
      actions.CrankPushAction.actionName,
      {
        ix: new types.CrankPush({
          crank: this.address,
          aggregator: params.aggregator,
        }).toSerde(),
      },
      actions.CrankPushAction.gas,
      actions.CrankPushAction.storageDeposit
    );
  }

  async pop(params: {
    rewardRecipient: Uint8Array;
    popIdx?: number;
  }): Promise<providers.FinalExecutionOutcome> {
    const txnReceipt = await this.program.sendAction(this.popAction(params));
    return txnReceipt;
  }

  popAction(params: {
    rewardRecipient: Uint8Array;
    popIdx?: number;
  }): transactions.Action {
    return transactions.functionCall(
      actions.CrankPopAction.actionName,
      {
        ix: new types.CrankPop({
          crank: this.address,
          rewardRecipient: params.rewardRecipient,
          popIdx: params.popIdx ? new BN(params.popIdx) : null,
        }).toSerde(),
      },
      actions.CrankPopAction.gas,
      actions.CrankPopAction.storageDeposit
    );
  }
}

export class JobAccount {
  program: SwitchboardProgram;
  address: Uint8Array;

  /**
   * JobAccount constructor
   * @param params initialization params.
   */
  public constructor(params: AccountParams) {
    this.program = params.program;
    this.address = params.address;
  }

  public static async create(
    program: SwitchboardProgram,
    params: {
      data: Buffer;
      authority?: string;
      name?: Buffer;
      metadata?: Buffer;
    }
  ): Promise<JobAccount> {
    const [action, job] = JobAccount.createAction(program, params);
    const txnReceipt = await program.sendAction(action);
    // TODO: do we want to handle failure case?
    return job;
  }

  public static createAction(
    program: SwitchboardProgram,
    params: {
      data: Buffer;
      authority?: string;
      name?: Buffer;
      metadata?: Buffer;
    }
  ): [transactions.Action, JobAccount] {
    const address = KeyPair.fromRandom("ed25519").getPublicKey().data;
    const action = transactions.functionCall(
      actions.JobInitAction.actionName,
      {
        ix: new types.JobInit({
          address: address,
          authority: params.authority ?? program.account.accountId,
          name: params.name ?? new Uint8Array(),
          metadata: params.metadata ?? new Uint8Array(),
          data: params.data,
          expiration: new BN(0),
        }).toSerde(),
      },
      actions.JobInitAction.gas,
      actions.JobInitAction.storageDeposit
    );
    const job = new JobAccount({ program, address });
    return [action, job];
  }

  async loadData(): Promise<types.Job> {
    const data: types.JobSerde = await roClient(
      this.program.connection
    ).viewFunction({
      contractId: this.program.programId,
      methodName: "view_job",
      args: { ix: new types.ViewJob({ address: this.address }).toSerde() },
    });
    return types.Job.fromSerde(data);
  }

  public static async loadJobs(
    program: SwitchboardProgram,
    params: { addrs: Uint8Array[] }
  ): Promise<types.Job[]> {
    return roClient(program.connection)
      .viewFunction({
        contractId: program.programId,
        methodName: "view_jobs",
        args: { ix: new types.ViewJobs({ addresses: params.addrs }).toSerde() },
      })
      .then((results) => results.map((result) => types.Job.fromSerde(result)));
  }

  static produceJobsHash(jobs: Array<OracleJob>): crypto.Hash {
    const hash = crypto.createHash("sha256");
    for (const job of jobs) {
      const jobHasher = crypto
        .createHash("sha256")
        .update(OracleJob.encodeDelimited(job).finish());
      hash.update(jobHasher.digest());
    }
    return hash;
  }
}

export class OracleAccount {
  program: SwitchboardProgram;
  address: Uint8Array;

  /**
   * OracleAccount constructor
   * @param params initialization params.
   */
  public constructor(params: AccountParams) {
    this.program = params.program;
    this.address = params.address;
  }

  get escrow(): EscrowAccount {
    const hash = crypto.createHash("sha256");
    hash.update(Buffer.from("OracleEscrow"));
    hash.update(this.program.mint.address);
    hash.update(this.address);
    const escrowAddress = new Uint8Array(hash.digest());
    return new EscrowAccount({ program: this.program, address: escrowAddress });
  }

  public static async create(
    program: SwitchboardProgram,
    params: {
      authority: string;
      queue: Uint8Array;
      name?: Buffer;
      metadata?: Buffer;
    }
  ): Promise<OracleAccount> {
    const [action, oracle] = OracleAccount.createAction(program, params);
    const txnReceipt = await program.sendAction(action);
    return oracle;
  }

  public static createAction(
    program: SwitchboardProgram,
    params: {
      authority: string;
      queue: Uint8Array;
      name?: Buffer;
      metadata?: Buffer;
    }
  ): [transactions.Action, OracleAccount] {
    const address = KeyPair.fromRandom("ed25519").getPublicKey().data;
    const action = transactions.functionCall(
      actions.OracleInitAction.actionName,
      {
        ix: new types.OracleInit({
          address: address,
          authority: params.authority,
          queue: params.queue,
          name: params.name ?? new Uint8Array(),
          metadata: params.metadata ?? new Uint8Array(),
        }).toSerde(),
      },
      actions.OracleInitAction.gas,
      actions.OracleInitAction.storageDeposit
    );
    const oracle = new OracleAccount({ program, address });
    return [action, oracle];
  }

  async loadData(): Promise<types.Oracle> {
    const data: types.OracleSerde = await roClient(
      this.program.connection
    ).viewFunction({
      contractId: this.program.programId,
      methodName: "view_oracle",
      args: { ix: new types.ViewOracle({ address: this.address }).toSerde() },
    });
    return types.Oracle.fromSerde(data);
  }

  async heartbeat(): Promise<providers.FinalExecutionOutcome> {
    const txnReceipt = await this.program.sendAction(this.heartbeatAction());
    return txnReceipt;
  }

  heartbeatAction(): transactions.Action {
    return transactions.functionCall(
      actions.OracleHeartbeatAction.actionName,
      { ix: new types.OracleHeartbeat({ address: this.address }).toSerde() },
      actions.OracleHeartbeatAction.gas,
      actions.OracleHeartbeatAction.storageDeposit
    );
  }

  async stake(params: {
    funderEscrow: EscrowAccount;
    amount: number;
  }): Promise<providers.FinalExecutionOutcome> {
    const txnReceipt = await this.program.sendAction(this.stakeAction(params));
    return txnReceipt;
  }

  stakeAction(params: {
    funderEscrow: EscrowAccount;
    amount: number;
  }): transactions.Action {
    return transactions.functionCall(
      actions.OracleStakeAction.actionName,
      {
        ix: new types.OracleStake({
          address: this.address,
          funder: params.funderEscrow.address,
          amount: NEAR.parse(params.amount.toFixed(20)),
        }).toSerde(),
      },
      actions.OracleStakeAction.gas,
      actions.OracleStakeAction.storageDeposit
    );
  }

  async unstake(params: {
    destinationEscrow: EscrowAccount;
    amount: number;
    delegate?: boolean;
  }): Promise<providers.FinalExecutionOutcome> {
    return this.program.sendAction(this.unstakeAction(params));
  }

  unstakeAction(params: {
    destinationEscrow: EscrowAccount;
    amount: number;
    delegate?: boolean;
  }): transactions.Action {
    return transactions.functionCall(
      actions.OracleUnstakeAction.actionName,
      {
        ix: new types.OracleUnstake({
          oracle: this.address,
          destination: params.destinationEscrow.address,
          amount: NEAR.parse(params.amount.toFixed(20)),
          delegate: params.delegate ?? false,
        }).toSerde(),
      },
      actions.OracleUnstakeAction.gas,
      actions.OracleUnstakeAction.storageDeposit
    );
  }
}

export class EscrowAccount {
  program: SwitchboardProgram;
  address: Uint8Array;

  public static keyFromSeed(seed: Uint8Array): Uint8Array {
    const hash = crypto
      .createHash("sha256")
      .update(Buffer.from("Escrow"))
      .update(seed);
    return new Uint8Array(hash.digest());
  }

  /**
   * EscrowAccount constructor
   * @param params initialization params.
   */
  public constructor(params: AccountParams) {
    this.program = params.program;
    this.address = params.address;
  }

  public static async create(
    program: SwitchboardProgram,
    params: {
      authority: string;
      mint: string;
    }
  ): Promise<EscrowAccount> {
    const [action, escrow] = EscrowAccount.createAction(program, params);
    const txnReceipt = await program.sendAction(action);
    return escrow;
  }

  public static createAction(
    program: SwitchboardProgram,
    params: {
      authority: string;
      mint: string;
    }
  ): [transactions.Action, EscrowAccount] {
    const seed = KeyPair.fromRandom("ed25519").getPublicKey().data;
    const action = transactions.functionCall(
      actions.EscrowInitAction.actionName,
      {
        ix: new types.EscrowInit({
          seed: seed,
          authority: params.authority,
          mint: params.mint,
        }).toSerde(),
      },
      actions.EscrowInitAction.gas,
      actions.EscrowInitAction.storageDeposit
    );
    const escrow = new EscrowAccount({
      program,
      address: this.keyFromSeed(seed),
    });
    return [action, escrow];
  }

  static async getOrCreateStaticAccount(
    program: SwitchboardProgram,
    seedString = DEFAULT_ESCROW_SEED
  ): Promise<EscrowAccount> {
    const [escrowAccount, createEscrowAction] =
      await EscrowAccount.getOrCreateStaticAccountAction(program, seedString);

    if (createEscrowAction) {
      const txnReceipt = await program.sendAction(createEscrowAction);
    }

    return escrowAccount;
  }

  static async getOrCreateStaticAccountAction(
    program: SwitchboardProgram,
    seedString = DEFAULT_ESCROW_SEED
  ): Promise<[EscrowAccount, transactions.Action | undefined]> {
    const seedHash = crypto.createHash("sha256");
    seedHash.update(Buffer.from(program.account.accountId));
    seedHash.update(Buffer.from(program.mint.address));
    seedHash.update(Buffer.from(seedString));
    const seed = new Uint8Array(seedHash.digest()).slice(0, 32);

    const hash = crypto.createHash("sha256");
    hash.update(Buffer.from("Escrow"));
    hash.update(seed);
    const escrowKey = new Uint8Array(hash.digest());

    const escrowAccount = new EscrowAccount({
      program,
      address: escrowKey,
    });
    try {
      const escrow = await escrowAccount.loadData();
      if (
        Buffer.compare(Buffer.from(escrow.address), Buffer.from(escrowKey)) !==
        0
      ) {
        throw new Error(`EscrowNotFound`);
      }
      return [escrowAccount, undefined];
    } catch (error) {
      // TODO: Check error matches resource not found
      const createEscrowAction = transactions.functionCall(
        actions.EscrowInitAction.actionName,
        {
          ix: new types.EscrowInit({
            seed: seed,
            authority: program.account.accountId,
            mint: program.mint.address,
          }).toSerde(),
        },
        actions.EscrowInitAction.gas,
        actions.EscrowInitAction.storageDeposit
      );

      return [escrowAccount, createEscrowAction];
    }
  }

  async loadData(): Promise<types.Escrow> {
    const data: types.EscrowSerde = await roClient(
      this.program.connection
    ).viewFunction({
      contractId: this.program.programId,
      methodName: "view_escrow",
      args: { ix: new types.ViewEscrow({ address: this.address }).toSerde() },
    });
    return types.Escrow.fromSerde(data);
  }

  async fund(
    params: { amount: number },
    gas = "40 Tgas"
  ): Promise<providers.FinalExecutionOutcome> {
    const txnReceipt = await this.program.sendAction(
      this.fundAction(params, gas),
      this.program.mint.address
    );
    return txnReceipt;
  }

  fundAction(params: { amount: number }, gas = "40 Tgas"): transactions.Action {
    const nearAmount = NEAR.parse(params.amount.toFixed(20));
    return transactions.functionCall(
      "ft_transfer_call",
      {
        receiver_id: this.program.programId,
        amount: nearAmount,
        msg: JSON.stringify(
          new types.EscrowFund({
            address: this.address,
            amount: nearAmount,
          }).toSerde()
        ),
      },
      actions.EscrowFundAction.gas,
      actions.EscrowFundAction.storageDeposit
    );
  }

  async fundUpTo(params: {
    amount: number;
  }): Promise<providers.FinalExecutionOutcome> {
    const actions = await this.fundUpToActions(params);

    const txnReceipt = await this.program.sendActions(
      actions,
      this.program.mint.address
    );
    return txnReceipt;
  }

  async fundUpToActions(params: {
    amount: number;
  }): Promise<transactions.Action[]> {
    const actions: transactions.Action[] = [];
    const userAccountExists = await this.program.mint.isUserAccountCreated(
      this.program.account
    );

    if (!userAccountExists) {
      // If the the user account doesn't have a wNEAR wallet, we need to create one for them.
      actions.push(this.program.mint.createAccountAction(this.program.account));
    }

    // Try to load the amount of wNEAR in the user-controlled wallet. Return 0 if the account can't be loaded.
    const wrappedBalance: number = await this.program.mint
      .getBalance(this.program.account)
      .then((balance) => balance.toNumber())
      .catch(() => 0);

    // Try to load the balance on `this` EscrowAccount. Return 0 if the account can't be loaded.
    const escrowBalance: number = await this.loadData()
      .then((data) =>
        Number.parseFloat(
          utils.format.formatNearAmount(
            data.amount.sub(data.amountLocked).toString()
          )
        )
      )
      .catch(() => 0);

    const depositAmount = params.amount - escrowBalance;
    const wrapAmount = depositAmount - wrappedBalance;

    if (wrapAmount > 0) {
      actions.push(
        this.program.mint.wrapAction(
          this.program.account,
          userAccountExists // If the user account doesn't already exist, we need to attach a storage deposit.
            ? wrapAmount
            : wrapAmount + DEFAULT_FT_STORAGE_DEPOSIT_NUMBER
        )
      );
    }

    if (depositAmount > 0) {
      actions.push(this.fundAction({ amount: depositAmount }));
    }

    return actions;
  }

  async withdraw(params: {
    amount: number;
    destination: string;
  }): Promise<providers.FinalExecutionOutcome> {
    return this.program.sendAction(this.withdrawAction(params));
  }

  withdrawAction(params: {
    amount: number;
    destination: string;
  }): transactions.Action {
    return transactions.functionCall(
      actions.EscrowWithdrawAction.actionName,
      {
        ix: new types.EscrowWithdraw({
          address: this.address,
          destination: params.destination,
          amount: NEAR.parse(params.amount.toFixed(20)),
        }).toSerde(),
      },
      actions.EscrowWithdrawAction.gas,
      actions.EscrowWithdrawAction.storageDeposit
    );
  }
}

export class PermissionAccount {
  program: SwitchboardProgram;
  address: Uint8Array;

  public static keyFromSeed(
    authority: string,
    granter: Uint8Array,
    grantee: Uint8Array
  ): Uint8Array {
    const hash = crypto.createHash("sha256");
    hash.update(Buffer.from("Permission"));
    hash.update(Buffer.from(authority));
    hash.update(Buffer.from(granter));
    hash.update(Buffer.from(grantee));
    return new Uint8Array(hash.digest());
  }

  /**
   * PermissionAccount constructor
   * @param params initialization params.
   */
  public constructor(params: AccountParams) {
    this.program = params.program;
    this.address = params.address;
  }

  public static async create(
    program: SwitchboardProgram,
    params: {
      authority: string;
      granter: Uint8Array;
      grantee: Uint8Array;
    }
  ): Promise<PermissionAccount> {
    const [action, permission] = PermissionAccount.createAction(
      program,
      params
    );
    const txnReceipt = await program.sendAction(action);
    // TODO: do we want to handle failure case?
    return permission;
  }

  public static createAction(
    program: SwitchboardProgram,
    params: {
      authority: string;
      granter: Uint8Array;
      grantee: Uint8Array;
    }
  ): [transactions.Action, PermissionAccount] {
    const action = transactions.functionCall(
      actions.PermissionInitAction.actionName,
      { ix: new types.PermissionInit(params).toSerde() },
      actions.PermissionInitAction.gas,
      actions.PermissionInitAction.storageDeposit
    );
    const permission = new PermissionAccount({
      program,
      address: this.keyFromSeed(
        params.authority,
        params.granter,
        params.grantee
      ),
    });
    return [action, permission];
  }

  async loadData(): Promise<types.Permission> {
    const data: types.PermissionSerde = await roClient(
      this.program.connection
    ).viewFunction({
      contractId: this.program.programId,
      methodName: "view_permission",
      args: {
        ix: new types.ViewPermission({ address: this.address }).toSerde(),
      },
    });
    return types.Permission.fromSerde(data);
  }

  async set(params: {
    permission: SwitchboardPermission;
    enable: boolean;
  }): Promise<providers.FinalExecutionOutcome> {
    const txnReceipt = await this.program.sendAction(this.setAction(params));
    return txnReceipt;
  }

  setAction(params: {
    permission: SwitchboardPermission;
    enable: boolean;
  }): transactions.Action {
    return transactions.functionCall(
      actions.PermissionSetAction.actionName,
      {
        ix: new types.PermissionSet({
          address: this.address,
          ...params,
        }).toSerde(),
      },
      actions.PermissionSetAction.gas,
      actions.PermissionSetAction.storageDeposit
    );
  }
}

export enum SwitchboardPermission {
  NONE = 0 << 0,
  PERMIT_ORACLE_HEARTBEAT = 1 << 0,
  PERMIT_ORACLE_QUEUE_USAGE = 1 << 1,
  PERMIT_VRF_REQUESTS = 1 << 2,
}
