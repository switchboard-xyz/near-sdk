import * as sbv2 from "../lib/cjs";
import Big from "big.js";
import { waitFor } from "wait-for-event";
import { EventEmitter } from "events";
import { OracleJob } from "@switchboard-xyz/common";

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
    // "localnet",
    // "http://127.0.0.1:8332",
    keypairName
  );
  console.log(`Signer: ${program.account.accountId}`);

  // await program.account.functionCall({
  // contractId: sbv2.PID,
  // methodName: "init",
  // args: {},
  // });

  // Create Queue
  console.log(`Creating queue ...`);
  const queue = await sbv2.QueueAccount.create(program, {
    authority: program.account.accountId,
    mint: program.mint.address,
    reward: 0,
    minStake: 0,
    queueSize: 100,
    oracleTimeout: 180,
    unpermissionedFeeds: true,
  });
  console.log(`queue (base58): ${sbv2.toBase58(queue.address)}`);
  const queueState = await queue.loadData();
  console.log("queue", queueState.toJSON());

  // build another queue action then send
  // const newQueueAddress = KeyPair.fromRandom("ed25519").getPublicKey().data;
  // const queueInitAction = new sbv2.actions.OracleQueueInitAction(
  //   sbv2.types.OracleQueueInit.fromJSON({
  //     address: [...newQueueAddress],
  //     authority: program.account.accountId,
  //     mint: program.mint.address,
  //     reward: "0",
  //     minStake: "100",
  //     queueSize: 100,
  //     oracleTimeout: 180,
  //     unpermissionedFeeds: true,
  //     // optionals
  //     name: [...new Uint8Array([...(Buffer.from("My Queue") ?? [])])],
  //     metadata: [
  //       ...new Uint8Array([...(Buffer.from("My Queue metadata ...") ?? [])]),
  //     ],
  //     feedProbationPeriod: 0,
  //     slashingEnabled: false,
  //     unpermissionedVrf: false,
  //     enableBufferRelayers: false,
  //     varianceToleranceMultiplier: { mantissa: "0", scale: 0 },
  //     consecutiveFeedFailureLimit: "0",
  //     consecutiveOracleFailureLimit: "0",
  //     maxGasCost: "0",
  //   })
  // );
  // const queueReceipt = await queueInitAction.send(program);
  // console.log(queueReceipt);
  // const newQueue = new QueueAccount({ program, address: newQueueAddress });
  // const newQueueState = await newQueue.loadData();
  // console.log(newQueueState.toJSON());

  // Create Crank
  console.log(`Creating crank ...`);
  const crank = await sbv2.CrankAccount.create(program, {
    queue: queue.address,
    maxRows: 100,
  });
  console.log(`crank (base58): ${sbv2.toBase58(crank.address)}`);
  const crankState = await crank.loadData();
  console.log("crank", crankState.toJSON());
  //
  // Create Escrow
  console.log(`Creating escrow ...`);
  const escrow = await sbv2.EscrowAccount.create(program, {
    authority: program.account.accountId,
    mint: program.mint.address,
  });
  console.log(`escrow (base58): ${sbv2.toBase58(escrow.address)}`);
  const escrowState = await escrow.loadData();
  console.log("escrow", escrowState.toJSON());

  // Create Aggregator
  console.log(`Creating aggregator ...`);
  const aggregator = await sbv2.AggregatorAccount.create(program, {
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
    // rewardEscrow: escrow.address,
    // historyLimit: 1000,
  });
  console.log(`aggregator (base58): ${sbv2.toBase58(aggregator.address)}`);
  const aggregatorState = await aggregator.loadData();
  console.log("aggregator", aggregatorState.toJSON());

  console.log(`Getting aggregator escrow ...`);
  const aggregatorEscrow = aggregator.escrow;
  console.log(`aggregator escrow (bytes): [${aggregatorEscrow.address}]`);
  console.log(
    `aggregator escrow (base58): ${sbv2.toBase58(aggregatorEscrow.address)}`
  );
  const aggregatorEscrowState = await aggregatorEscrow.loadData();
  console.log(aggregatorEscrowState.toJSON());

  // Create Oracle
  console.log(`Creating oracle ...`);
  const oracle = await sbv2.OracleAccount.create(program, {
    authority: program.account.accountId,
    queue: queue.address,
  });
  // Create Oracle Permissions
  console.log(`Creating oracle permissions ...`);
  const oraclePermission = await sbv2.PermissionAccount.create(program, {
    authority: program.account.accountId,
    granter: queue.address,
    grantee: oracle.address,
  });
  console.log(
    `oracle permission (base58): ${sbv2.toBase58(oraclePermission.address)}`
  );
  console.log(
    await oraclePermission.set({
      permission: sbv2.SwitchboardPermission.PERMIT_ORACLE_HEARTBEAT,
      enable: true,
    })
  );

  console.log(`aggregator (base58): ${sbv2.toBase58(aggregator.address)}`);
  console.log("aggregator", await aggregator.loadData());
  console.log(await crank.push({ aggregator: aggregator.address }));

  console.log(await oracle.heartbeat());
  console.log(await crank.loadData());
  // console.log(await crank.pop({ rewardRecipient: escrow.address }));
  // console.log(await crank.loadData());
  // console.log(await aggregator.loadData());
  // return;

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
  const job = await sbv2.JobAccount.create(program, {
    data: Buffer.from(OracleJob.encodeDelimited(oracleJob).finish()),
    name: Buffer.from("Job1"),
    metadata: Buffer.from("Job1 - FtxUS BTC/USD"),
  });
  console.log(`job (base58): ${sbv2.toBase58(job.address)}`);
  console.log("job", await job.loadData());
  console.log("job", await job.loadData());

  // Add job to aggregator
  console.log(`Adding job to aggregator ...`);
  const jobAddTxn = await aggregator.addJob({
    job: job.address,
    weight: 1,
  });
  const jobAddTxn2 = await aggregator.addJob({
    job: job.address,
    weight: 1,
  });
  console.log(`Job Added to aggregator successfully`);

  console.log(`oracle (base58): ${sbv2.toBase58(oracle.address)}`);
  console.log("oracle", await oracle.loadData());

  // Create Aggregator Permissions
  console.log(`Creating aggregator permissions ...`);
  const aggPermission = await sbv2.PermissionAccount.create(program, {
    authority: program.account.accountId,
    granter: queue.address,
    grantee: aggregator.address,
  });

  console.log("|||");

  // Start Near Event Listener
  const event = await sbv2.NearEvent.fromNetwork(
    "testnet",
    sbv2.PROGRAM_ID,
    "AggregatorOpenRoundEvent"
  );
  event.start(
    async function (event) {
      console.log("POPP HAPPENED");
    },
    async function (error) {
      console.error(`Error: ${error}`);
    }
  );
  console.log(await crank.pop({ rewardRecipient: escrow.address }));
  const jobs = await sbv2.JobAccount.loadJobs(program, {
    addrs: [job.address, job.address],
  });
  const oracleJobs = jobs.map((job) => OracleJob.decodeDelimited(job.data));
  const jobsChecksum = sbv2.JobAccount.produceJobsHash(oracleJobs).digest();
  await aggregator.saveResult({
    oracleIdx: 0,
    error: false,
    value: sbv2.SwitchboardDecimal.fromBig(new Big(50)),
    jobsChecksum,
    minResponse: sbv2.SwitchboardDecimal.fromBig(new Big(40)),
    maxResponse: sbv2.SwitchboardDecimal.fromBig(new Big(60)),
  });
  return;

  while (true) {
    try {
      console.log(await crank.pop({ rewardRecipient: escrow.address }));
      console.log("send");
      // console.log("hhii");
      // await sleep(2000);
      // await aggregator.saveResult({
      // oracleIdx: 0,
      // error: false,
      // value: sbv2.SwitchboardDecimal.fromBig(new Big(50)),
      // jobsChecksum: new Uint8Array(32),
      // minRespose: sbv2.SwitchboardDecimal.fromBig(new Big(40)),
      // maxResponse: sbv2.SwitchboardDecimal.fromBig(new Big(60)),
      // });
      //
      // console.log("SAVED");
    } catch (e) {
      // console.log(e);
      // console.log(e);
      // console.log(await aggregator.loadData());
      // console.log((await crank.loadData()).data);
    }
    // await sleep(7000);
  }
  console.log("---");
  await waitForever();
})();
