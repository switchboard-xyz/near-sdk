import * as sbv2 from "../lib/cjs";
import BN from "bn.js";
import { EventEmitter } from "events";
import { keyStores } from "near-api-js";
import { Gas, NEAR } from "near-units";
import { homedir } from "os";
import path from "path";
import { waitFor } from "wait-for-event";

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

  await program.account.functionCall({
    contractId: MINT,
    methodName: "storage_deposit",
    args: {
      account_id: "switchboard-v2.testnet",
    },
    gas: Gas.parse("100 Tgas"),
    attachedDeposit: NEAR.parse("1 N"),
  });

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

  await console.log(await escrow.loadData());
})();
