import * as sbv2 from "./lib/cjs";
import Big from "big.js";
import { waitFor } from "wait-for-event";
import { EventEmitter } from "events";
import { OracleJob } from "@switchboard-xyz/common";
import { KeyPair } from "near-api-js";
import { BN } from "bn.js";
import { EscrowAccount, SwitchboardDecimal, toBase58 } from "./lib/cjs";
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

  // get wrap.testnet token balance
  // the users token account owned by the wrap.testnet contract
  const wrappedBalance = await program.mint.getBalance(program.account);
  console.log(`User (${program.mint.address}): ${wrappedBalance} wNEAR`);

  // wrap 2.5 NEAR into the users token wallet
  console.log(`\nWrapping 2.5 NEAR into the users token wallet ...`);
  const wrapAction = program.mint.wrapAction(program.account, 2.5);
  const wrapReceipt = await program.mint.sendAction(
    program.account,
    wrapAction
  );
  console.log(`\u2714  ${wrapReceipt.transaction.hash}`);
  console.log(
    `User (${program.mint.address}): ${await program.mint.getBalance(
      program.account
    )} wNEAR`
  );

  // unwrap 1.25 NEAR
  console.log(`\nUnwrapping 1.25 NEAR from the users token wallet ...`);
  const unwrapAction = program.mint.unwrapAction(program.account, 1.25);
  const unwrapReceipt = await program.mint.sendAction(
    program.account,
    unwrapAction
  );
  console.log(`\u2714  ${unwrapReceipt.transaction.hash}`);
  console.log(
    `User (${program.mint.address}): ${await program.mint.getBalance(
      program.account
    )} wNEAR`
  );

  // get the users switchboard controlled escrow
  console.log(`\nFetching the users switchboard token wallet ...`);
  const escrowAccount = await EscrowAccount.getOrCreateStaticAccount(program);
  let escrowState = await escrowAccount.loadData();
  let escrowAmount = new SwitchboardDecimal(
    escrowState.amount,
    program.mint.metadata.decimals
  )
    .toBig()
    .toNumber();
  console.log(`\u2714  ${toBase58(escrowAccount.address)}`);
  console.log(`User (${program.programId}): ${escrowAmount} wNEAR`);

  console.log(
    `\nDepositing 0.75 wNEAR from the users token wallet into the switchboard contract ...`
  );
  const depositAction = program.mint.depositAction(
    program.account,
    0.75,
    escrowAccount.address
  );
  const depositReceipt = await program.mint.sendAction(
    program.account,
    depositAction
  );
  console.log(`\u2714  ${depositReceipt.transaction.hash}`);
  escrowState = await escrowAccount.loadData();
  escrowAmount = new SwitchboardDecimal(
    escrowState.amount,
    program.mint.metadata.decimals
  )
    .toBig()
    .toNumber();
  console.log(`User (${program.mint.address}): ${escrowAmount} wNEAR`);
})();
