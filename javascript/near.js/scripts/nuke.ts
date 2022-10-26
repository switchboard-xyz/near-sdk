import { BN } from "bn.js";
import * as sbv2 from "../lib/cjs";

let keypairName: string;
if (process.argv.length > 2) {
  keypairName = process.argv[2];
} else {
  keypairName = sbv2.TESTNET_PROGRAM_ID;
}

(async function main() {
  const program = await sbv2.SwitchboardProgram.loadFromFs(
    "testnet",
    "https://rpc.testnet.near.org",
    keypairName
  );
  console.log(`Signer: ${program.account.accountId}`);

  // Queues
  const queuesTxnReceipt = await program.account.functionCall({
    contractId: sbv2.TESTNET_PROGRAM_ID,
    methodName: "nuke_queues",
    args: {},
    gas: new BN(3e14),
  });
  // console.log(JSON.stringify(queuesTxnReceipt, undefined, 2));
  console.log(
    `nuke_queues: https://explorer.testnet.near.org/transactions/${queuesTxnReceipt.transaction.hash}`
  );

  // Aggregators
  const aggregatorsTxnReceipt = await program.account.functionCall({
    contractId: sbv2.TESTNET_PROGRAM_ID,
    methodName: "nuke_aggregators",
    args: {},
    gas: new BN(3e14),
  });
  // console.log(JSON.stringify(aggregatorsTxnReceipt, undefined, 2));
  console.log(
    `nuke_aggregators: https://explorer.testnet.near.org/transactions/${aggregatorsTxnReceipt.transaction.hash}`
  );

  // Cranks
  const cranksTxnReceipt = await program.account.functionCall({
    contractId: sbv2.TESTNET_PROGRAM_ID,
    methodName: "nuke_cranks",
    args: {},
    gas: new BN(3e14),
  });
  // console.log(JSON.stringify(cranksTxnReceipt, undefined, 2));
  console.log(
    `nuke_cranks: https://explorer.testnet.near.org/transactions/${cranksTxnReceipt.transaction.hash}`
  );

  // Oracles
  const oraclesTxnReceipt = await program.account.functionCall({
    contractId: sbv2.TESTNET_PROGRAM_ID,
    methodName: "nuke_oracles",
    args: {},
    gas: new BN(3e14),
  });
  // console.log(JSON.stringify(oraclesTxnReceipt, undefined, 2));
  console.log(
    `nuke_oracles: https://explorer.testnet.near.org/transactions/${oraclesTxnReceipt.transaction.hash}`
  );

  // Jobs
  const jobsTxnReceipt = await program.account.functionCall({
    contractId: sbv2.TESTNET_PROGRAM_ID,
    methodName: "nuke_jobs",
    args: {},
    gas: new BN(3e14),
  });
  // console.log(JSON.stringify(jobsTxnReceipt, undefined, 2));
  console.log(
    `nuke_jobs: https://explorer.testnet.near.org/transactions/${jobsTxnReceipt.transaction.hash}`
  );

  // Permissions
  const permissionsTxnReceipt = await program.account.functionCall({
    contractId: sbv2.TESTNET_PROGRAM_ID,
    methodName: "nuke_permissions",
    args: {},
    gas: new BN(3e14),
  });
  // console.log(JSON.stringify(permissionsTxnReceipt, undefined, 2));
  console.log(
    `nuke_permissions: https://explorer.testnet.near.org/transactions/${permissionsTxnReceipt.transaction.hash}`
  );

  // Escrows
  const escrowsTxnReceipt = await program.account.functionCall({
    contractId: sbv2.TESTNET_PROGRAM_ID,
    methodName: "nuke_escrows",
    args: {},
    gas: new BN(3e14),
  });
  // console.log(JSON.stringify(escrowsTxnReceipt, undefined, 2));
  console.log(
    `nuke_escrows: https://explorer.testnet.near.org/transactions/${escrowsTxnReceipt.transaction.hash}`
  );
})();
