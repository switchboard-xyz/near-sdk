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
import assert from "assert";

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
  // console.log(`Signer: ${program.account.accountId}`);

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
  const newWrappedBalance = await program.mint.getBalance(program.account);
  console.log(`\u2714  ${wrapReceipt.transaction.hash}`);
  console.log(`User (${program.mint.address}): ${newWrappedBalance} wNEAR`);
  assert(
    newWrappedBalance.toNumber() === wrappedBalance.toNumber() + 2.5,
    "WrapBalanceMismatch"
  );

  // unwrap 1.25 NEAR
  console.log(`\nUnwrapping 1.25 NEAR from the users token wallet ...`);
  const unwrapAction = program.mint.unwrapAction(program.account, 1.25);
  const unwrapReceipt = await program.mint.sendAction(
    program.account,
    unwrapAction
  );
  const finalWrappedBalance = await program.mint.getBalance(program.account);
  console.log(`\u2714  ${unwrapReceipt.transaction.hash}`);
  console.log(`User (${program.mint.address}): ${finalWrappedBalance} wNEAR`);
  assert(
    finalWrappedBalance.toNumber() === newWrappedBalance.toNumber() - 1.25,
    "UnwrapBalanceMismatch"
  );

  // get the users switchboard controlled escrow
  console.log(`\nFetching the users switchboard token wallet ...`);
  const escrowAccount = await EscrowAccount.getOrCreateStaticAccount(program);
  let escrowState = await escrowAccount.loadData();
  const initialEscrowAmount = new SwitchboardDecimal(
    escrowState.amount,
    program.mint.metadata.decimals
  )
    .toBig()
    .toNumber();
  console.log(`\u2714  ${toBase58(escrowAccount.address)}`);
  console.log(`User (${program.programId}): ${initialEscrowAmount} wNEAR`);

  // test depositing near into the switchboard program
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
  const newEscrowAmount = new SwitchboardDecimal(
    escrowState.amount,
    program.mint.metadata.decimals
  )
    .toBig()
    .toNumber();
  console.log(`User (${program.mint.address}): ${newEscrowAmount} wNEAR`);
  assert(
    newEscrowAmount === initialEscrowAmount + 0.75,
    "DepositBalanceMismatch"
  );

  // test funding a balance up to a certain number
  console.log(`\nFunding a users escrow up to a given number ...`);
  const fundUpToActions = await escrowAccount.fundUpToActions(
    newEscrowAmount + 0.15
  );
  const fundUpToReceipt = await program.mint.sendActions(
    program.keystore,
    program.account,
    fundUpToActions
  );
  console.log(`\u2714  ${fundUpToReceipt.transaction.hash}`);
  escrowState = await escrowAccount.loadData();
  const finalEscrowAmount = new SwitchboardDecimal(
    escrowState.amount,
    program.mint.metadata.decimals
  )
    .toBig()
    .toNumber();
  console.log(`User (${program.mint.address}): ${finalEscrowAmount} wNEAR`);
  assert(
    finalEscrowAmount === newEscrowAmount + 0.15,
    "FundUpToBalanceMismatch"
  );
})();
