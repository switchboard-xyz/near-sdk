import * as sbv2 from "./src";
import {
  keyStores,
  Account,
  DEFAULT_FUNCTION_CALL_GAS,
} from "near-api-js";
import { NEAR, Gas, parse } from 'near-units';
import Big from "big.js";
import BN from "bn.js";
import { homedir } from "os";
import bs58 from "bs58";
import { waitFor } from "wait-for-event";
import { EventEmitter } from "events";
import { OracleJob } from "@switchboard-xyz/common";
import {
  Action,
  functionCall,
  SignedTransaction,
  Transaction,
} from "near-api-js/lib/transaction";
import path from "path";

export function waitForever(): Promise<void> {
  return waitFor("", new EventEmitter());
}

export const sleep = (ms: number): Promise<any> =>
  new Promise((s) => setTimeout(s, ms));

let keypairName: string;
if (process.argv.length > 2) {
  keypairName = process.argv[2];
} else {
  keypairName = sbv2.PID;
}

(async function main() {

  const program = await sbv2.SwitchboardProgram.loadFromFs(
    "localnet",
    //"https://rpc.testnet.near.org",
    "http://127.0.0.1:8332",
    keypairName,
    //path.join(homedir(), ".neartosis")
  );
  console.log(`Signer: ${program.account.accountId}`);

  const rootKeystore = new keyStores.UnencryptedFileSystemKeyStore(
    path.join(homedir(), ".near-credentials")
  );
  const rootNear = await sbv2.loadNear("localnet",rootKeystore,"http://127.0.0.1:8332");
  const root = await rootNear.account("test.near");

  const escrow = new sbv2.EscrowAccount({
    program: program, 
    address: sbv2.fromBase58("35CNeR8mTzapUuKT4ukiRDjgXAzFQNK4ZJashdrmsomo")
  });

  console.log(await escrow.loadData());

  const balance = await sbv2.roClient(program.connection).viewFunction({
    contractId: "token.test.near",
    methodName: "ft_balance_of",
    args: {
      account_id: "switchboard-v2.test.near"
    },
  });
  console.log(`Balance of switchboard-v2: ${balance}`);
  const balance2 = await sbv2.roClient(program.connection).viewFunction({
    contractId: "token.test.near",
    methodName: "ft_balance_of",
    args: {
      account_id: "test.near"
    },
  });
  console.log(`Balance of test.near: ${balance2}`);

  await root.functionCall({
    contractId: "token.test.near",
    methodName: "storage_deposit",
    args: {
      account_id: "switchboard-v2.test.near"
    },
    gas: Gas.parse('100 Tgas'),
    attachedDeposit: NEAR.parse('1 N'),
  });

  await root.functionCall({
    contractId: "token.test.near",
    methodName: "ft_transfer_call",
    args: {
      receiver_id: "switchboard-v2.test.near",
      amount: '100',
      msg: JSON.stringify({
        "address": "35CNeR8mTzapUuKT4ukiRDjgXAzFQNK4ZJashdrmsomo",
        "amount": 100,
      }),
    },
    //gas: Gas.parse('10 Tgas'),
    gas: Gas.parse('100 Tgas'),
    attachedDeposit: new BN(1),
  });

  await

  console.log(await escrow.loadData());

})();
