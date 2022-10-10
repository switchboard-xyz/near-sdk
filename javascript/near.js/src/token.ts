import Big from "big.js";
import { BN } from "bn.js";
import { Account, Connection } from "near-api-js";
import { roClient, SwitchboardProgram } from "./program.js";
import { EscrowAccount, SwitchboardDecimal } from "./sbv2.js";
import { NEAR, Gas, parse } from "near-units";
import { Action, functionCall } from "near-api-js/lib/transaction.js";
import { FinalExecutionOutcome } from "near-api-js/lib/providers/provider.js";

export const DEFAULT_FT_STORAGE_DEPOSIT = NEAR.parse("0.00125 N");

export class FungibleTokenAccountAlreadyCreated extends Error {
  constructor(mint: string, accountId: string) {
    super(
      `fungible token account for mint ${mint} and user ${accountId} has already been created`
    );
    Object.setPrototypeOf(this, FungibleTokenAccountAlreadyCreated.prototype);
  }
}
export class FungibleTokenAccountDoesNotExist extends Error {
  constructor(mint: string, accountId: string) {
    super(
      `fungible token account for mint ${mint} and user ${accountId} has not been created`
    );
    Object.setPrototypeOf(this, FungibleTokenAccountAlreadyCreated.prototype);
  }
}

export class FungibleToken {
  client: Account;
  constructor(
    readonly connection: Connection,
    readonly address: string,
    readonly metadata: {
      spec: string;
      name: string;
      symbol: string;
      decimals: number;
    }
  ) {
    this.client = roClient(connection);
  }

  static async load(
    connection: Connection,
    mint: string
  ): Promise<FungibleToken> {
    const metadata: {
      spec: string;
      name: string;
      symbol: string;
      decimals: number;
    } = await roClient(connection).viewFunction({
      contractId: mint,
      methodName: "ft_metadata",
      args: {},
    });

    return new FungibleToken(connection, mint, metadata);
  }

  async fundUserEscrowActions(
    account: Account,
    fundUpToAmount: number,
    escrowAccount: EscrowAccount
  ): Promise<Action[]> {
    const actions: Action[] = [];
    let wrappedBalance = 0;
    if (!this.isUserAccountCreated(account)) {
      actions.push(this.createUserAccountAction(account));
    } else {
      wrappedBalance = (await this.getUserAccountBalance(account)).toNumber();
    }

    const escrowBalance = new SwitchboardDecimal(
      (await escrowAccount.loadData()).amount,
      this.metadata.decimals
    )
      .toBig()
      .toNumber();

    const depositAmount = fundUpToAmount - escrowBalance;
    const wrapAmount = depositAmount - wrappedBalance;

    if (wrapAmount > 0) {
      actions.push(this.wrapAction(account, wrapAmount));
    }

    if (depositAmount > 0) {
      actions.push(this.depositAction(account, depositAmount, escrowAccount));
    }

    return actions;
  }

  private async getStorageDeposit(
    account: Account
  ): Promise<{ total: NEAR; available: NEAR } | null> {
    const storage_balance: { total: string; available: string } =
      await this.client.viewFunction({
        contractId: this.address,
        methodName: "storage_balance_of",
        args: {
          account_id: account.accountId,
        },
      });
    if (!storage_balance) {
      return null;
    }
    return {
      total: NEAR.parse(storage_balance.total),
      available: NEAR.parse(storage_balance.available),
    };
  }

  async isUserAccountCreated(account: Account): Promise<boolean> {
    const storageDeposit = await this.getStorageDeposit(account);
    if (
      storageDeposit === null ||
      storageDeposit.total.lt(DEFAULT_FT_STORAGE_DEPOSIT)
    ) {
      return false;
    }

    return true;
  }

  createUserAccountAction(account: Account): Action {
    if (this.isUserAccountCreated(account)) {
      throw new FungibleTokenAccountAlreadyCreated(
        this.address,
        account.accountId
      );
    }

    return functionCall(
      "storage_deposit",
      {
        receiver_id: this.address,
        account_id: account.accountId,
      },
      Gas.parse("20 Tgas"),
      DEFAULT_FT_STORAGE_DEPOSIT
    );
  }

  async createUserAccount(account: Account): Promise<FinalExecutionOutcome> {
    const action = this.createUserAccountAction(account);

    const txnReceipt = await account.functionCall({
      contractId: this.address,
      methodName: action.functionCall.methodName,
      args: action.functionCall.args,
      gas: action.functionCall.gas,
      attachedDeposit: action.functionCall.deposit,
    });
    return txnReceipt;
  }

  async getUserAccountBalance(account: Account): Promise<Big> {
    const userBalance: string = await this.client.viewFunction({
      contractId: this.address,
      methodName: "ft_balance_of",
      args: {
        account_id: account.accountId,
      },
    });

    const amount = new SwitchboardDecimal(
      new BN(userBalance),
      this.metadata.decimals
    );
    return amount.toBig();
  }

  wrapAction(account: Account, amount: number) {
    // TODO: Check if its even a wrapped asset

    // Verify token account is created
    if (!this.isUserAccountCreated(account)) {
      throw new FungibleTokenAccountDoesNotExist(
        this.address,
        account.accountId
      );
    }

    const nearAmount = NEAR.parse(`${amount} N`);
    return functionCall("near_deposit", {}, Gas.parse("20 Tgas"), nearAmount);
  }

  async wrap(account: Account, amount: number): Promise<FinalExecutionOutcome> {
    const action = this.wrapAction(account, amount);

    const txnReceipt = await account.functionCall({
      contractId: this.address,
      methodName: action.functionCall.methodName,
      args: action.functionCall.args,
      gas: action.functionCall.gas,
      attachedDeposit: action.functionCall.deposit,
    });
    return txnReceipt;
  }

  unwrapAction(account: Account, amount: number) {
    // TODO: Check if its even a wrapped asset

    // Verify token account is created
    if (!this.isUserAccountCreated(account)) {
      throw new FungibleTokenAccountDoesNotExist(
        this.address,
        account.accountId
      );
    }

    const nearAmount = NEAR.parse(`${amount} N`);
    return functionCall(
      "near_withdraw",
      {
        amount: nearAmount,
      },
      Gas.parse("20 Tgas"),
      new BN(1) // unwrapping requires 1 yOcto to be attached
    );
  }

  async unwrap(
    account: Account,
    amount: number
  ): Promise<FinalExecutionOutcome> {
    const action = this.unwrapAction(account, amount);

    const txnReceipt = await account.functionCall({
      contractId: this.address,
      methodName: action.functionCall.methodName,
      args: action.functionCall.args,
      gas: action.functionCall.gas,
      attachedDeposit: action.functionCall.deposit,
    });
    return txnReceipt;
  }

  depositAction(
    account: Account,
    amount: number,
    escrowAccount: EscrowAccount
  ) {
    // TODO: Check if its even a wrapped asset

    // Verify token account is created
    if (!this.isUserAccountCreated(account)) {
      throw new FungibleTokenAccountDoesNotExist(
        this.address,
        account.accountId
      );
    }

    const nearAmount = NEAR.parse(`${amount} N`);
    return functionCall(
      "ft_transfer_call",
      {
        receiver_id: escrowAccount.program.programId,
        amount: nearAmount,
        msg: JSON.stringify({
          address: [...escrowAccount.address],
          amount: nearAmount,
        }),
      },
      Gas.parse("40 Tgas"),
      new BN(1) // transferring requires 1 yOcto to be attached
    );
  }

  async deposit(
    account: Account,
    amount: number,
    escrowAccount: EscrowAccount
  ): Promise<FinalExecutionOutcome> {
    const action = this.depositAction(account, amount, escrowAccount);

    const txnReceipt = await account.functionCall({
      contractId: this.address,
      methodName: action.functionCall.methodName,
      args: action.functionCall.args,
      gas: action.functionCall.gas,
      attachedDeposit: action.functionCall.deposit,
    });
    return txnReceipt;
  }
}
