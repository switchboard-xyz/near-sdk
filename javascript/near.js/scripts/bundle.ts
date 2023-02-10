import * as sbv2 from "../lib/cjs";
import { KeyPair, transactions } from "near-api-js";
import Big from "big.js";
import bs58 from "bs58";
import { waitFor } from "wait-for-event";
import { EventEmitter } from "events";
import { OracleJob } from "@switchboard-xyz/common";

const toBase58 = (address: Uint8Array): string => {
  return bs58.encode(address);
};

export function waitForever(): Promise<void> {
  return waitFor("", new EventEmitter());
}

export const sleep = (ms: number): Promise<any> =>
  new Promise((s) => setTimeout(s, ms));

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

  const keypair = KeyPair.fromRandom("ed25519");
  console.log(`Adding AccessKey ${keypair.getPublicKey().toString()}`);
  await program.account.addKey(keypair.getPublicKey());

  // let txn = new sbv2.SwitchboardTransaction(program.account);
  // const accessKeyInfo = await txn.getAccessKey(keypair);
  // console.log(JSON.stringify(accessKeyInfo, undefined, 2));

  const actions: transactions.Action[] = [];

  const escrow = await sbv2.EscrowAccount.getOrCreateStaticAccount(program);

  // Create Queue
  console.log(`Creating queue ...`);
  const [createQueueAction, queue] = sbv2.QueueAccount.createAction(program, {
    authority: program.account.accountId,
    mint: "wrap.test",
    reward: 0,
    minStake: 100,
    queueSize: 100,
    oracleTimeout: 180,
    unpermissionedFeeds: true,
  });
  actions.push(createQueueAction);
  console.log(`queue (base58): ${toBase58(queue.address)}`);

  // Create Crank
  console.log(`Creating crank ...`);
  const [createCrankAction, crank] = sbv2.CrankAccount.createAction(program, {
    queue: queue.address,
    maxRows: 100,
  });
  actions.push(createCrankAction);
  console.log(`crank (base58): ${toBase58(crank.address)}`);

  // Create Aggregator
  console.log(`Creating aggregator ...`);
  const [createAggregatorAction, aggregator] =
    sbv2.AggregatorAccount.createAction(program, {
      authority: program.account.accountId,
      queue: queue.address,
      name: Buffer.from(""),
      metadata: Buffer.from(""),
      batchSize: 1,
      minOracleResults: 1,
      minJobResults: 1,
      minUpdateDelaySeconds: 5,
      startAfter: 0,
      varianceThreshold: sbv2.SwitchboardDecimal.fromBig(new Big(0)),
      forceReportPeriod: 0,
      crank: crank.address,
      rewardEscrow: escrow.address,
      // historyLimit: 1000,
    });
  actions.push(createAggregatorAction);
  console.log(`aggregator (base58): ${toBase58(aggregator.address)}`);
  actions.push(crank.pushAction({ aggregator: aggregator.address }));

  // Create Job
  console.log(`Creating job ...`);
  const oracleJob = OracleJob.fromObject({
    name: "FtxUs BTC/USD",
    tasks: [
      {
        httpTask: {
          url: "https://ftx.us/api/markets/btc/usd",
        },
      },
      {
        jsonParseTask: {
          path: "$.result.price",
        },
      },
    ],
  });
  const [createJobAction, job] = sbv2.JobAccount.createAction(program, {
    data: Buffer.from(OracleJob.encodeDelimited(oracleJob).finish()),
    name: Buffer.from("Job1"),
    metadata: Buffer.from("Job1 - FtxUS BTC/USD"),
  });
  actions.push(createJobAction);
  console.log(`job (base58): ${toBase58(job.address)}`);

  // Add job to aggregator
  console.log(`Adding job to aggregator ...`);
  actions.push(
    aggregator.addJobAction({
      job: job.address,
      weight: 1,
    })
  );

  // Create Oracle
  console.log(`Creating oracle ...`);
  const [createOracleAction, oracle] = sbv2.OracleAccount.createAction(
    program,
    {
      authority: program.account.accountId,
      queue: queue.address,
    }
  );
  actions.push(createOracleAction);
  console.log(`oracle (base58): ${toBase58(oracle.address)}`);

  // const txnReceipt = await txn.send(keypair);
  const txnReceipt = await program.sendActions(actions);
  console.log(JSON.stringify(txnReceipt, undefined, 2));

  console.log("queue", await queue.loadData());
  console.log("crank", await crank.loadData());
  console.log("aggregator", await aggregator.loadData());
  console.log("job", await job.loadData());
  console.log("oracle", await oracle.loadData());

  // // Create Escrow
  // console.log(`Creating escrow ...`);
  // const escrow = await sbv2.EscrowAccount.create(program, {
  //   authority: signer.accountId,
  //   mint: "wrap.test",
  // });
  // console.log(`escrow (base58): ${toBase58(escrow.address)}`);
  // console.log("escrow", await escrow.loadData());

  // // Create Oracle Permissions
  // console.log(`Creating oracle permissions ...`);
  // const oraclePermission = await sbv2.PermissionAccount.create(program, {
  //   authority: signer.accountId,
  //   granter: queue.address,
  //   grantee: oracle.address,
  // });
  // console.log(
  //   `oracle permission (base58): ${toBase58(oraclePermission.address)}`
  // );

  // // Create Aggregator Permissions
  // console.log(`Creating aggregator permissions ...`);
  // const aggPermission = await sbv2.PermissionAccount.create(program, {
  //   authority: signer.accountId,
  //   granter: queue.address,
  //   grantee: aggregator.address,
  // });
  // console.log(
  //   await oraclePermission.set({
  //     permission: sbv2.SwitchboardPermission.PERMIT_ORACLE_HEARTBEAT,
  //     enable: true,
  //   })
  // );

  ///////////////////////

  // console.log("|||");

  // // Start Near Event Listener
  // const event = await sbv2.NearEvent.fromNetwork(
  //   "testnet",
  //   sbv2.PID,
  //   "AggregatorOpenRoundEvent"
  // );
  // event.start(
  //   async function (event) {
  //     console.log("!!!");
  //     console.log(event);
  //   },
  //   async function (error) {
  //     console.error(`Error: ${error}`);
  //   }
  // );

  // console.log(await oracle.heartbeat(signer));
  // while (true) {
  //   try {
  //     console.log(
  //       await aggregator.openRound({ rewardRecipient: escrow.address })
  //     );
  //     await sleep(2000);
  //     await aggregator.saveResult({
  //       oracleIdx: 0,
  //       error: false,
  //       value: sbv2.SwitchboardDecimal.fromBig(new Big(50)),
  //       jobsChecksum: new Uint8Array(32),
  //       minRespose: sbv2.SwitchboardDecimal.fromBig(new Big(40)),
  //       maxResponse: sbv2.SwitchboardDecimal.fromBig(new Big(60)),
  //     });

  //     console.log("SAVED");
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   await sleep(7000);
  // }
  // console.log("---");
  // await waitForever();
})();
