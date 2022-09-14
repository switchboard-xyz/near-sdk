# Near SDK

SDK for interacting with Switchboard V2 on Near.

Typedocs:
[https://switchboard-xyz.github.io/sbv2-near/](https://switchboard-xyz.github.io/sbv2-near/)

## LIVE Testnet

| Account | Address (Base58)                             | Address (Bytes)                                                                                                          |
| ------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Queue   | BmyDkJtmU8p6t4xF7ru4461FUtyJcW6rqQfPBKwiF8U4 | [160,25,254,37,135,188,212,31,29,69,178,224,13,46,218,0,232,163,198,221,87,106,173,239,23,91,230,42,177,159,143,29]      |
| Crank   | 7WXH2tZci31aFH7SCU8xodTQhkeuxzipHqKR6kTeF98m | [96,182,50,220,220,224,90,45,140,120,101,249,129,247,210,202,63,51,131,92,139,229,222,169,189,147,104,255,3,245,139,226] |

### Data Feeds

| Feed | Address (Base58)                             | Address (Bytes)                                                                                                     |
| ---- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| NEAR | 5hLpfe3Dhxin1JdQFtMjcE4TjS5THmp22j2jJzzqCLn5 | [69,196,100,134,238,49,135,87,63,254,1,167,10,96,147,71,72,147,16,66,48,140,64,203,38,200,194,112,50,38,97,250]     |
| BTC  | 3LbeeXcqz82qXopGJYSrV1mnDq1GdquUztG8WxnFX42n | [34,188,150,74,97,47,248,252,230,19,2,45,112,136,241,15,84,51,231,151,46,106,59,73,34,151,120,194,217,184,53,195]   |
| ETH  | 437WX5d3LhukD2EQYsaiUNb8kvBJ5QRz2kp3TKnZVxjS | [45,29,149,3,66,98,249,29,65,31,123,29,57,84,207,173,193,15,189,125,124,94,143,142,42,145,213,234,168,79,245,89]    |
| USDC | Cuc3DjzjTbghjcevUb6xGQk2kUxTr8eWdXmGep8cXg4a | [176,234,96,76,10,214,84,82,30,149,92,225,177,242,53,45,115,197,95,182,153,174,134,167,168,195,58,54,9,165,139,203] |
| USDT | 9zZmB3raGGtYSRg1vF61nvgQ7XajhYk8nQ1skaGPj4R  | [2,77,188,58,33,124,70,12,162,104,178,51,178,64,14,57,185,112,106,207,72,111,192,112,77,229,231,161,44,244,97,110]  |

## Load the Switchboard Program

```ts
import { SwitchboardProgram } from "@switchboard-xyz/near.js";

// from filesystem keypair
const program = await SwitchboardProgram.loadFromFs(
  "testnet", // Network ID
  "https://rpc.testnet.near.org", // RPC URL
  accountId // Near Account name
);
// from browser
const program = await SwitchboardProgram.loadFromBrowser(
  "testnet", // Network ID
  "https://rpc.testnet.near.org", // RPC URL
  accountId // Near Account name
);
```

## Create a Queue

```ts
import { QueueAccount } from "@switchboard-xyz/near.js";

const queue = await QueueAccount.create(program, {
  authority: program.account.accountId,
  mint: "wrap.test",
  reward: 0,
  minStake: 100,
  queueSize: 100,
  oracleTimeout: 180,
  unpermissionedFeeds: true,
});
console.log(await queue.loadData());
```

## Create a Feed

```ts
import { AggregatorAccount } from "@switchboard-xyz/near.js";

const aggregator = await AggregatorAccount.create(program, {
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
  historyLimit: 1000,
});
console.log(await aggregator.loadData());
```

## Create a Job

```ts
import { JobAccount } from "@switchboard-xyz/near.js";

const job = await JobAccount.create(program, {
  data: Buffer.from(OracleJob.encodeDelimited(oracleJob).finish()),
  name: Buffer.from("Job1"),
  metadata: Buffer.from("Job1 - FtxUS BTC/USD"),
});
console.log(await job.loadData());
```

## Add Job to Feed

```ts
await aggregator.addJob({
  job: job.address,
  weight: 1,
});
```

## Create Feed Permissions

```ts
import { PermissionAccount } from "@switchboard-xyz/near.js";

const permission = await PermissionAccount.create(program, {
  authority: program.account.accountId,
  granter: queue.address,
  grantee: aggregator.address,
});
```

## Set Feed Permissions

```ts
await permission.set({
  permission: SwitchboardPermission.PERMIT_ORACLE_QUEUE_USAGE,
  enable: true,
});
```

## Add Feed to Crank

```ts
import { CrankAccount } from "@switchboard-xyz/near.js";

const crank = new CrankAccount({ program, address: crankAddress });
await crank.push({
  aggregator: aggregatorAccount.address,
});
```

## Request a Feed Update

```ts
import { EscrowAccount } from "@switchboard-xyz/near.js";

const escrowAccount = await EscrowAccount.getOrCreateStaticAccount(program);
await aggregatorAccount.openRound({
  rewardRecipient: escrowAccount.address,
});
```
