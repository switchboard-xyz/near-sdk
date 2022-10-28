import Big from "big.js";
import { BN } from "bn.js";
import { Account, Connection } from "near-api-js";
import { KeyStore } from "near-api-js/lib/key_stores/keystore.js";
import { FinalExecutionOutcome } from "near-api-js/lib/providers/provider.js";
import { Action, functionCall } from "near-api-js/lib/transaction.js";
import { Gas, NEAR } from "near-units";
import { handleReceipt } from "./errors.js";
import { types } from "./index.js";
import { roClient } from "./program.js";
import { DEFAULT_FUNCTION_CALL_GAS, SwitchboardDecimal } from "./sbv2.js";
import { SwitchboardTransaction } from "./transaction.js";

export const DEFAULT_FT_STORAGE_DEPOSIT = 0.00125; // Described in units of NEAR.

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
    Object.setPrototypeOf(this, FungibleTokenAccountDoesNotExist.prototype);
  }
}

export class FungibleToken {
  client: Account;
  constructor(
    readonly connection: Connection,
    readonly switchboardPid: string,
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
    switchboardPid: string,
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

    return new FungibleToken(connection, switchboardPid, mint, metadata);
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
      storageDeposit.total.lt(NEAR.from(DEFAULT_FT_STORAGE_DEPOSIT))
    ) {
      return false;
    }

    return true;
  }

  createAccountAction(account: Account): Action {
    return functionCall(
      "storage_deposit",
      {
        receiver_id: this.address,
        account_id: account.accountId,
      },
      Gas.parse("20 Tgas"),
      NEAR.from(DEFAULT_FT_STORAGE_DEPOSIT)
    );
  }

  async createAccount(account: Account): Promise<FinalExecutionOutcome> {
    const action = this.createAccountAction(account);
    return await this.sendAction(account, action);
  }

  async getBalance(account: Account): Promise<Big> {
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
    return amount.toBig().minus(new Big(DEFAULT_FT_STORAGE_DEPOSIT));
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

    const nearAmount = NEAR.parse(amount.toFixed(20));
    return functionCall("near_deposit", {}, Gas.parse("20 Tgas"), nearAmount);
  }

  async wrap(account: Account, amount: number): Promise<FinalExecutionOutcome> {
    const action = this.wrapAction(account, amount);
    return await this.sendAction(account, action);
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

    const nearAmount = NEAR.parse(amount.toFixed(20));
    return functionCall(
      "near_withdraw",
      { amount: nearAmount },
      Gas.parse("20 Tgas"),
      new BN(1) // unwrapping requires 1 yOcto to be attached
    );
  }

  async unwrap(
    account: Account,
    amount: number
  ): Promise<FinalExecutionOutcome> {
    const action = this.unwrapAction(account, amount);
    return await this.sendAction(account, action);
  }

  depositAction(account: Account, amount: number, escrowAddress: Uint8Array) {
    // TODO: Check if its even a wrapped asset

    // Verify token account is created
    if (!this.isUserAccountCreated(account)) {
      throw new FungibleTokenAccountDoesNotExist(
        this.address,
        account.accountId
      );
    }

    const nearAmount = NEAR.parse(amount.toFixed(20));
    return functionCall(
      "ft_transfer_call",
      {
        receiver_id: this.switchboardPid,
        amount: nearAmount,
        msg: JSON.stringify({
          address: [...escrowAddress],
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
    escrowAddress: Uint8Array
  ): Promise<FinalExecutionOutcome> {
    const action = this.depositAction(account, amount, escrowAddress);
    return await this.sendAction(account, action);
  }

  async sendAction(
    account: Account,
    action: Action,
    gas = "40 Tgas"
  ): Promise<FinalExecutionOutcome> {
    const txnReceipt = await account.functionCall({
      contractId: this.address,
      methodName: action.functionCall.methodName,
      args: action.functionCall.args,
      gas: gas
        ? Gas.parse(gas)
        : action.functionCall.gas ?? DEFAULT_FUNCTION_CALL_GAS,
      attachedDeposit: action.functionCall.deposit,
    });
    return txnReceipt;
  }

  async sendActions(
    keystore: KeyStore,
    account: Account,
    actions: Action[]
  ): Promise<FinalExecutionOutcome> {
    const keyPair = await keystore.getKey(
      this.connection.networkId,
      account.accountId
    );

    const txn = new SwitchboardTransaction(this.address, account, actions);
    const txnReceipt = await txn.send(keyPair);

    const result = handleReceipt(txnReceipt);
    if (result instanceof types.SwitchboardError) {
      types.SwitchboardError.captureStackTrace(result);
      throw result;
    }

    return result;
  }
}
