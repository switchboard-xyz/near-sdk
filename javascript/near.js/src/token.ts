import Big from "big.js";
import { BN } from "bn.js";
import {
  Account,
  Connection,
  keyStores,
  providers,
  transactions,
} from "near-api-js";
import { Gas, NEAR } from "near-units";
import { handleReceipt } from "./errors.js";
import { types } from "./index.js";
import { roClient } from "./program.js";
import { DEFAULT_FUNCTION_CALL_GAS, SwitchboardDecimal } from "./sbv2.js";
import { SwitchboardTransaction } from "./transaction.js";

export const DEFAULT_FT_STORAGE_DEPOSIT_NUMBER = 0.00125;

export const DEFAULT_FT_STORAGE_DEPOSIT = NEAR.parse(
  DEFAULT_FT_STORAGE_DEPOSIT_NUMBER.toString()
);

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

    console.log(storage_balance);

    if (!storage_balance) {
      return null;
    }
    return {
      total: NEAR.from(new BN(storage_balance.total)),
      available: NEAR.from(new BN(storage_balance.available)),
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

  createAccountAction(account: Account): transactions.Action {
    return transactions.functionCall(
      "storage_deposit",
      {
        receiver_id: this.address,
        account_id: account.accountId,
      },
      Gas.parse("20 Tgas"),
      DEFAULT_FT_STORAGE_DEPOSIT
    );
  }

  async createAccount(
    account: Account
  ): Promise<providers.FinalExecutionOutcome> {
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
    return amount.toBig();
  }

  wrapAction(account: Account, amount: number) {
    // TODO: Check if its even a wrapped asset

    // Verify token account is created
    // if (!(await this.isUserAccountCreated(account))) {
    //   throw new FungibleTokenAccountDoesNotExist(
    //     this.address,
    //     account.accountId
    //   );
    // }

    const nearAmount = NEAR.parse(amount.toFixed(20));
    return transactions.functionCall(
      "near_deposit",
      {},
      Gas.parse("20 Tgas"),
      nearAmount
    );
  }

  async wrap(
    account: Account,
    amount: number
  ): Promise<providers.FinalExecutionOutcome> {
    const action = this.wrapAction(account, amount);
    return await this.sendAction(account, action);
  }

  unwrapAction(account: Account, amount: number) {
    // TODO: Check if its even a wrapped asset

    // Verify token account is created
    // if (!(await this.isUserAccountCreated(account))) {
    //   throw new FungibleTokenAccountDoesNotExist(
    //     this.address,
    //     account.accountId
    //   );
    // }

    const nearAmount = NEAR.parse(amount.toFixed(20));
    return transactions.functionCall(
      "near_withdraw",
      { amount: nearAmount },
      Gas.parse("20 Tgas"),
      new BN(1) // unwrapping requires 1 yOcto to be attached
    );
  }

  async unwrap(
    account: Account,
    amount: number
  ): Promise<providers.FinalExecutionOutcome> {
    const action = this.unwrapAction(account, amount);
    return await this.sendAction(account, action);
  }

  depositAction(account: Account, amount: number, escrowAddress: Uint8Array) {
    // TODO: Check if its even a wrapped asset

    // Verify token account is created
    // if (!(await this.isUserAccountCreated(account))) {
    //   throw new FungibleTokenAccountDoesNotExist(
    //     this.address,
    //     account.accountId
    //   );
    // }

    const nearAmount = NEAR.parse(amount.toFixed(20));
    return transactions.functionCall(
      "ft_transfer_call",
      {
        receiver_id: this.switchboardPid,
        amount: nearAmount,
        msg: JSON.stringify(
          new types.EscrowFund({
            address: escrowAddress,
            amount: nearAmount,
          }).toSerde()
        ),
      },
      Gas.parse("40 Tgas"),
      new BN(1) // transferring requires 1 yOcto to be attached
    );
  }

  async deposit(
    account: Account,
    amount: number,
    escrowAddress: Uint8Array
  ): Promise<providers.FinalExecutionOutcome> {
    const action = this.depositAction(account, amount, escrowAddress);
    return await this.sendAction(account, action);
  }

  async sendAction(
    account: Account,
    action: transactions.Action,
    gas = "40 Tgas"
  ): Promise<providers.FinalExecutionOutcome> {
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
    keystore: keyStores.KeyStore,
    account: Account,
    actions: transactions.Action[]
  ): Promise<providers.FinalExecutionOutcome> {
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
