<div align="center">
  <a href="#">
    <img height="170" src="https://github.com/switchboard-xyz/sbv2-core/raw/main/website/static/img/icons/switchboard/avatar.svg" />
  </a>

  <h1>@switchboard-xyz/near.js</h1>

  <p>A Typescript client to interact with Switchboard V2 on NEAR.</p>

  <p>
	  <a href="https://www.npmjs.com/package/@switchboard-xyz/near.js">
      <img alt="NPM Badge" src="https://img.shields.io/github/package-json/v/switchboard-xyz/sbv2-near?color=red&filename=javascript%2Fnear.js%2Fpackage.json&label=%40switchboard-xyz%2Fnear.js&logo=npm">
    </a>
  </p>

  <p>
    <a href="https://discord.gg/switchboardxyz">
      <img alt="Discord" src="https://img.shields.io/discord/841525135311634443?color=blueviolet&logo=discord&logoColor=white">
    </a>
    <a href="https://twitter.com/switchboardxyz">
      <img alt="Twitter" src="https://img.shields.io/twitter/follow/switchboardxyz?label=Follow+Switchboard" />
    </a>
  </p>

  <h4>
    <strong>Typedocs: </strong><a href="https://docs.switchboard.xyz/api/@switchboard-xyz/near.js">docs.switchboard.xyz/api/@switchboard-xyz/near.js</a>
  </h4>
  <h4>
    <strong>Sbv2 NEAR SDK: </strong><a href="https://github.com/switchboard-xyz/sbv2-near">github.com/switchboard-xyz/sbv2-near</a>
  </h4>
</div>

## Install

```bash
npm i --save @switchboard-xyz/near.js
```

## Usage

Load the Switchboard Program

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

Create a Queue

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

Create a Feed

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

Create a Job

```ts
import { JobAccount } from "@switchboard-xyz/near.js";

const job = await JobAccount.create(program, {
  data: Buffer.from(OracleJob.encodeDelimited(oracleJob).finish()),
  name: Buffer.from("Job1"),
  metadata: Buffer.from("Job1 - FtxUS BTC/USD"),
});
console.log(await job.loadData());
```

Add Job to Feed

```ts
await aggregator.addJob({
  job: job.address,
  weight: 1,
});
```

Create Feed Permissions

```ts
import { PermissionAccount } from "@switchboard-xyz/near.js";

const permission = await PermissionAccount.create(program, {
  authority: program.account.accountId,
  granter: queue.address,
  grantee: aggregator.address,
});
```

Set Feed Permissions

```ts
await permission.set({
  permission: SwitchboardPermission.PERMIT_ORACLE_QUEUE_USAGE,
  enable: true,
});
```

Add Feed to Crank

```ts
import { CrankAccount } from "@switchboard-xyz/near.js";

const crank = new CrankAccount({ program, address: crankAddress });
await crank.push({
  aggregator: aggregatorAccount.address,
});
```

Request a Feed Update

```ts
import { EscrowAccount } from "@switchboard-xyz/near.js";

const escrowAccount = await EscrowAccount.getOrCreateStaticAccount(program);
await aggregatorAccount.openRound({
  rewardRecipient: escrowAccount.address,
});
```
