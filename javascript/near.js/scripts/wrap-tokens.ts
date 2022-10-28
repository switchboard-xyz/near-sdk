import * as sbv2 from "../lib/cjs";
import { waitFor } from "wait-for-event";
import { EventEmitter } from "events";
import _ from "lodash";
import assert from "assert";

export function waitForever(): Promise<void> {
  return waitFor("", new EventEmitter());
}

const roundNumber = (amount: number): number =>
  Number.parseFloat(amount.toFixed(2));

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
    // "mainnet",
    // "https://rpc.mainnet.near.org",
    "testnet",
    "https://rpc.testnet.near.org",
    keypairName
  );
  // console.log(`Signer: ${program.account.accountId}`);

  // get wrap.testnet token balance
  // the users token account owned by the wrap.testnet contract
  const wrappedBalance = roundNumber(
    (await program.mint.getBalance(program.account)).toNumber()
  );
  console.log(`User (${program.mint.address}): ${wrappedBalance} wNEAR`);

  // wrap 2.5 NEAR into the users token wallet
  console.log(`\nWrapping 0.2 NEAR into the users token wallet ...`);
  const wrapAction = program.mint.wrapAction(program.account, 0.2);
  const wrapReceipt = await program.mint.sendAction(
    program.account,
    wrapAction
  );
  const newWrappedBalance = roundNumber(
    (await program.mint.getBalance(program.account)).toNumber()
  );
  console.log(`\u2714  ${wrapReceipt.transaction.hash}`);
  console.log(`User (${program.mint.address}): ${newWrappedBalance} wNEAR`);
  assert(
    newWrappedBalance === wrappedBalance + 0.2,
    `WrapBalanceMismatch - Expected: ${
      wrappedBalance + 0.2
    }, Received: ${newWrappedBalance}`
  );

  // unwrap 1.25 NEAR
  console.log(`\nUnwrapping 0.1 NEAR from the users token wallet ...`);
  const expectedNewWrappedBalance = roundNumber(newWrappedBalance - 0.1);
  const unwrapAction = program.mint.unwrapAction(program.account, 0.1);
  const unwrapReceipt = await program.mint.sendAction(
    program.account,
    unwrapAction
  );
  const finalWrappedBalance = roundNumber(
    (await program.mint.getBalance(program.account)).toNumber()
  );
  console.log(`\u2714  ${unwrapReceipt.transaction.hash}`);
  console.log(`User (${program.mint.address}): ${finalWrappedBalance} wNEAR`);
  assert(
    finalWrappedBalance === expectedNewWrappedBalance,
    `UnwrapBalanceMismatch - Expected: ${expectedNewWrappedBalance}, Received: ${finalWrappedBalance}`
  );

  // get the users switchboard controlled escrow
  console.log(`\nFetching the users switchboard token wallet ...`);
  const escrowAccount = await sbv2.EscrowAccount.getOrCreateStaticAccount(
    program
  );
  let escrowState = await escrowAccount.loadData();
  const initialEscrowAmount = roundNumber(
    new sbv2.SwitchboardDecimal(
      escrowState.amount,
      program.mint.metadata.decimals
    )
      .toBig()
      .toNumber()
  );
  console.log(`\u2714  ${sbv2.toBase58(escrowAccount.address)}`);
  console.log(`User (${program.programId}): ${initialEscrowAmount} wNEAR`);

  // test depositing near into the switchboard program
  console.log(
    `\nDepositing 0.05 wNEAR from the users token wallet into the switchboard contract ...`
  );
  const depositAction = program.mint.depositAction(
    program.account,
    0.05,
    escrowAccount.address
  );
  const depositReceipt = await program.mint.sendAction(
    program.account,
    depositAction
  );
  console.log(`\u2714  ${depositReceipt.transaction.hash}`);
  escrowState = await escrowAccount.loadData();
  const newEscrowAmount = roundNumber(
    new sbv2.SwitchboardDecimal(
      escrowState.amount,
      program.mint.metadata.decimals
    )
      .toBig()
      .toNumber()
  );
  console.log(`User (${program.mint.address}): ${newEscrowAmount} wNEAR`);
  assert(
    newEscrowAmount === initialEscrowAmount + 0.05,
    `DepositBalanceMismatch - Expected: ${
      initialEscrowAmount + 0.05
    }, Received: ${newEscrowAmount}`
  );

  // // test funding a balance up to a certain number
  // const expectedFinalEscrowAmount = roundNumber(newEscrowAmount + 0.15);
  // console.log(`\nFunding a users escrow up to a given number ...`);
  // const fundUpToActions = await escrowAccount.fundUpToActions({
  //   amount: expectedFinalEscrowAmount,
  // });
  // const fundUpToReceipt = await program.mint.sendActions(
  //   program.keystore,
  //   program.account,
  //   fundUpToActions
  // );
  // console.log(`\u2714  ${fundUpToReceipt.transaction.hash}`);
  // escrowState = await escrowAccount.loadData();
  // const finalEscrowAmount = roundNumber(
  //   new sbv2.SwitchboardDecimal(
  //     escrowState.amount,
  //     program.mint.metadata.decimals
  //   )
  //     .toBig()
  //     .toNumber()
  // );
  // console.log(`User (${program.mint.address}): ${finalEscrowAmount} wNEAR`);
  // assert(
  //   finalEscrowAmount === expectedFinalEscrowAmount,
  //   `FundUpToBalanceMismatch - Expected: ${expectedFinalEscrowAmount}, Received: ${finalEscrowAmount}`
  // );
})();
