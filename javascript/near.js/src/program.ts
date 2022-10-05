import {
  Account,
  connect,
  Connection,
  KeyPair,
  keyStores,
  Near,
} from "near-api-js";
import { KeyStore } from "near-api-js/lib/key_stores";
import {
  LOCALNET_PROGRAM_ID,
  MAINNET_PROGRAM_ID,
  TESTNET_PROGRAM_ID,
} from "./generated/programId.js";
import path from "path";
import { homedir } from "os";
import { SwitchboardTransaction } from "./transaction.js";
import { FinalExecutionOutcome } from "near-api-js/lib/providers/provider.js";
import { Action } from "near-api-js/lib/transaction.js";

export type NearNetwork = "testnet" | "mainnet" | "betanet" | "localnet";

export const getWrappedMint = (networkId: string): string => {
  switch (networkId) {
    case "testnet": {
      return "wrap.test";
    }
    case "mainnet": {
      return "wrap.test";
    }
    case "betanet": {
      return "wrap.beta";
    }
    case "localnet": {
      return "token.test.near";
    }
    default: {
      throw new Error(
        `Failed to get wrapped NEAR mint for networkId ${networkId}`
      );
    }
  }
};

export const getProgramId = (networkId: string): string => {
  switch (networkId) {
    case "testnet": {
      return TESTNET_PROGRAM_ID;
    }
    case "mainnet": {
      return MAINNET_PROGRAM_ID;
    }
    case "localnet": {
      return LOCALNET_PROGRAM_ID;
    }
    default: {
      throw new Error(
        `Failed to find Switchboard programID for networkId ${networkId}`
      );
    }
  }
};

export class SwitchboardProgramReadOnly extends Error {
  constructor(
    msg: string = "SwitchboardProgram was initialized in Read-Only mode with no Account defined"
  ) {
    super(msg);
    Object.setPrototypeOf(this, SwitchboardProgramReadOnly.prototype);
  }
}

export class SwitchboardProgram {
  readonly programId: string;
  readonly mint: string;
  private _account: Account;

  constructor(
    readonly keystore: KeyStore,
    _account: Account,
    programId?: string,
    mint?: string
  ) {
    this._account = _account;
    if (programId) {
      this.programId = programId;
    } else {
      this.programId = getProgramId(_account.connection.networkId);
    }
    if (mint) {
      this.mint = mint;
    } else {
      this.mint = getWrappedMint(_account.connection.networkId);
    }
  }

  get isReadOnly(): boolean {
    return (
      this._account === undefined || this._account.accountId === "READ_ONLY"
    );
  }

  get account(): Account {
    if (this.isReadOnly) {
      throw new SwitchboardProgramReadOnly();
    }

    return this._account;
  }

  set account(_account: Account) {
    this._account = _account;
  }

  get connection(): Connection {
    return this._account.connection;
  }

  /** Load the Switchboard Program in Read-Only mode */
  static async loadReadOnly(networkId: NearNetwork, rpcUrl: string) {
    const keystore = new keyStores.InMemoryKeyStore();

    const near = await loadNear(networkId, keystore, rpcUrl);
    const account = new Account(near.connection, "READ_ONLY");

    return new SwitchboardProgram(keystore, account);
  }

  /** Load the Switchboard Program from a filesystem keypair */
  static async loadFromFs(
    networkId: NearNetwork,
    rpcUrl: string,
    accountId: string,
    credentialsDir = path.join(homedir(), ".near-credentials")
  ): Promise<SwitchboardProgram> {
    const keystore = new keyStores.UnencryptedFileSystemKeyStore(
      credentialsDir
    );

    const near = await loadNear(networkId, keystore, rpcUrl);
    const account = await near.account(accountId);

    return new SwitchboardProgram(keystore, account);
  }

  /** Load the Switchboard Program from a KeyPair */
  static async loadFromKeypair(
    networkId: NearNetwork,
    rpcUrl: string,
    accountId: string,
    keyPair: KeyPair
  ): Promise<SwitchboardProgram> {
    const keystore = new keyStores.InMemoryKeyStore();
    await keystore.setKey(networkId, accountId, keyPair);

    const near = await loadNear(networkId, keystore, rpcUrl);
    const account = await near.account(accountId);

    return new SwitchboardProgram(keystore, account);
  }

  /** Load the Switchboard Program from browser storage */
  static async loadFromBrowser(
    networkId: NearNetwork,
    rpcUrl: string,
    accountId: string,
    browserLocalStorage?: any,
    browserPrefix?: string
  ): Promise<SwitchboardProgram> {
    const keystore = new keyStores.BrowserLocalStorageKeyStore(
      browserLocalStorage,
      browserPrefix
    );

    const near = await loadNear(networkId, keystore, rpcUrl);
    const account = await near.account(accountId);

    return new SwitchboardProgram(keystore, account);
  }

  async sendAction(action: Action): Promise<FinalExecutionOutcome> {
    if (this.isReadOnly) {
      throw new SwitchboardProgramReadOnly();
    }

    const txnReceipt = await this.account.functionCall({
      contractId: this.programId,
      methodName: action.functionCall.methodName,
      args: action.functionCall.args,
    });
    return txnReceipt;
  }

  async sendActions(actions: Action[]): Promise<FinalExecutionOutcome> {
    if (this.isReadOnly) {
      throw new SwitchboardProgramReadOnly();
    }

    const keyPair = await this.keystore.getKey(
      this.connection.networkId,
      this.account.accountId
    );

    const txn = new SwitchboardTransaction(
      this.programId,
      this.account,
      actions
    );
    const txnReceipt = await txn.send(keyPair);
    return txnReceipt;
  }
}

export function roClient(connection: Connection): Account {
  return new Account(connection, "");
}

export async function loadNear(
  network: string,
  keystore: keyStores.KeyStore,
  url: string
): Promise<Near> {
  const connectionConfig = {
    networkId: network, //"testnet",
    keyStore: keystore, // first create a key store
    nodeUrl: url, //"https://rpc.testnet.near.org",
    headers: {},
  };
  const near = await connect(connectionConfig);
  return near;
}
