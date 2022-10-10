import * as sbv2 from "@switchboard-xyz/near.js";
import { keyStores, Account, DEFAULT_FUNCTION_CALL_GAS } from "near-api-js";
import { NEAR, Gas, parse } from "near-units";
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

(async function main() {
  const MINT = "wrap.testnet";
  const PID = "switchboard-v2.testnet";
  const program = await sbv2.SwitchboardProgram.loadFromFs(
    "testnet",
    "https://rpc.testnet.near.org",
    // "http://127.0.0.1:8332",
    PID
    //path.join(homedir(), ".neartosis")
  );
  console.log(`Signer: ${program.account.accountId}`);

  const rootKeystore = new keyStores.UnencryptedFileSystemKeyStore(
    path.join(homedir(), ".near-credentials")
  );
  const rootNear = await sbv2.loadNear(
    "testnet",
    rootKeystore,
    "https://rpc.testnet.near.org"
  );
  // const root = await rootNear.account(MINT);

  const escrow = await sbv2.EscrowAccount.create(program, {
    authority: PID,
    mint: MINT,
  });

  console.log("1");
  await program.account.functionCall({
    contractId: MINT,
    methodName: "storage_deposit",
    args: {
      account_id: "switchboard-v2.testnet",
    },
    gas: Gas.parse("100 Tgas"),
    attachedDeposit: NEAR.parse("1 N"),
  });

  console.log("2");
  await program.account.functionCall({
    contractId: `${MINT}`,
    methodName: "ft_transfer_call",
    args: {
      receiver_id: PID,
      amount: "10",
      msg: JSON.stringify({
        address: [...escrow.address],
        amount: "10",
      }),
    },
    //gas: Gas.parse('10 Tgas'),
    gas: Gas.parse("100 Tgas"),
    attachedDeposit: new BN(1),
  });
  console.log("3");

  await console.log(await escrow.loadData());
})();
