import * as sbv2 from "./lib/cjs";
import Big from "big.js";
import { waitFor } from "wait-for-event";
import { EventEmitter } from "events";
import { OracleJob } from "@switchboard-xyz/common";
import { KeyPair } from "near-api-js";
import { BN } from "bn.js";
import { EscrowAccount } from "./lib/cjs";
import base58 from "bs58";
import _ from "lodash";

export function waitForever(): Promise<void> {
  return waitFor("", new EventEmitter());
}

export const sleep = (ms: number): Promise<any> =>
  new Promise((s) => setTimeout(s, ms));

let keypairName: string;
if (process.argv.length > 2) {
  keypairName = process.argv[2];
} else {
  keypairName = sbv2.PROGRAM_ID;
}

(async function main() {
  const program = await sbv2.SwitchboardProgram.loadFromFs(
    "testnet",
    "https://rpc.testnet.near.org",
    keypairName
  );
  console.log(`Signer: ${program.account.accountId}`);

  const escrowAccount = await EscrowAccount.getOrCreateStaticAccount(program);
  const escrowState = await escrowAccount.loadData();
  console.log(escrowState.toJSON());

  async function logBalance() {
    const balance = await program.mint.getUserAccountBalance(program.account);
    console.log(balance.toString());
  }

  logBalance();

  const actions = await program.mint.fundUserEscrowActions(
    program.account,
    1,
    escrowAccount
  );

  for await (const action of actions) {
    const r = await program.sendAction(action, program.mint.address);
    console.log(r);
  }

  // const txnReceipt = await program.sendActions(actions, program.mint.address);
  // console.log(txnReceipt);

  console.log((await escrowAccount.loadData()).toJSON());
})();
