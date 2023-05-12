<div align="center">

![Switchboard Logo](https://github.com/switchboard-xyz/sbv2-core/raw/main/website/static/img/icons/switchboard/avatar.png)

# @switchboard-xyz/near.js

> A Typescript client to interact with Switchboard on NEAR.

[![NPM Badge](https://img.shields.io/github/package-json/v/switchboard-xyz/sbv2-near?color=red&filename=javascript%2Fnear.js%2Fpackage.json&label=%40switchboard-xyz%2Fnear.js&logo=npm)](https://www.npmjs.com/package/@switchboard-xyz/near.js)

</div>

## Install

```bash
npm i --save @switchboard-xyz/near.js
```

## Usage

**Directory**

- [Load Switchboard Program](#load-switchboard-program)
- [Create a Queue](#create-a-queue)
- [Create a Data Feed](#create-a-data-feed)
- [Create a Job](#create-a-job)
- [Add Job to Data Feed](#add-job-to-data-feed)
- [Create Feed Permissions](#create-feed-permissions)
- [Set Feed Permissions](#set-feed-permissions)
- [Add Feed to Crank](#add-feed-to-crank)
- [Request a Feed Update](#request-a-feed-update)

### Load Switchboard Program

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

### Create a Queue

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

### Create a Data Feed

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

### Create a Job

```ts
import { JobAccount } from "@switchboard-xyz/near.js";

const job = await JobAccount.create(program, {
  data: Buffer.from(OracleJob.encodeDelimited(oracleJob).finish()),
  name: Buffer.from("Job1"),
  metadata: Buffer.from("Job1 - FtxUS BTC/USD"),
});
console.log(await job.loadData());
```

### Add Job to Data Feed

```ts
await aggregator.addJob({
  job: job.address,
  weight: 1,
});
```

### Create Feed Permissions

```ts
import { PermissionAccount } from "@switchboard-xyz/near.js";

const permission = await PermissionAccount.create(program, {
  authority: program.account.accountId,
  granter: queue.address,
  grantee: aggregator.address,
});
```

### Set Feed Permissions

```ts
await permission.set({
  permission: SwitchboardPermission.PERMIT_ORACLE_QUEUE_USAGE,
  enable: true,
});
```

### Add Feed to Crank

```ts
import { CrankAccount } from "@switchboard-xyz/near.js";

const crank = new CrankAccount({ program, address: crankAddress });
await crank.push({
  aggregator: aggregatorAccount.address,
});
```

### Request a Feed Update

```ts
import { EscrowAccount } from "@switchboard-xyz/near.js";

const escrowAccount = await EscrowAccount.getOrCreateStaticAccount(program);
await aggregatorAccount.openRound({
  rewardRecipient: escrowAccount.address,
});
```
