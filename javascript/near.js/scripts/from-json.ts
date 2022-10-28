import * as sbv2 from "../lib/cjs";
import { waitFor } from "wait-for-event";
import { EventEmitter } from "events";
import base58 from "bs58";
import _ from "lodash";
import { EscrowAccount } from "../lib/cjs";

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

  const queueAccount = new sbv2.QueueAccount({
    program,
    address: base58.decode("HFSJrvA1w2uhciLGLUfE4sADGwGBpUiAjxZPgeFSs61M"),
  });
  const queue = await queueAccount.loadData();

  const { aggregator, permission, jobs, actions, batches } =
    await queueAccount.createAggregatorFromJSON({
      crankAddress: "",
      authority: program.account.accountId,
      name: "Testing",
      metadata: "More Testing",
      batchSize: 1,
      minOracleResults: 1,
      minJobResults: 1,
      minUpdateDelaySeconds: 10,
      historySize: 2000,
      maxGasCost: 0,
      // fundUpTo: 1,
      jobs: [
        {
          authority: program.account.accountId,
          name: "My Job 1",
          metadata: "My Job 1 metadata",
          expiration: 0,
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
        },
        {
          authority: program.account.accountId,
          name: "My Job 2",
          metadata: "My Job 2 metadata",
          expiration: 0,
          tasks: [
            {
              httpTask: {
                url: "https://www.binance.us/api/v3/ticker/price?symbol=BTCUSD",
              },
            },
            {
              jsonParseTask: {
                path: "$.price",
              },
            },
          ],
        },
        {
          authority: program.account.accountId,
          name: "My Job 3",
          metadata: "My Job 3 metadata",
          expiration: 0,
          tasks: [
            {
              httpTask: {
                url: "https://api-pub.bitfinex.com/v2/tickers?symbols=tBTCUSD",
              },
            },
            {
              medianTask: {
                tasks: [
                  {
                    jsonParseTask: {
                      path: "$[0][1]",
                    },
                  },
                  {
                    jsonParseTask: {
                      path: "$[0][3]",
                    },
                  },
                  {
                    jsonParseTask: {
                      path: "$[0][7]",
                    },
                  },
                ],
              },
            },
          ],
        },
        {
          authority: program.account.accountId,
          name: "My Job 4",
          metadata: "My Job 4 metadata",
          expiration: 0,
          tasks: [
            {
              websocketTask: {
                url: "wss://ws-feed.pro.coinbase.com",
                subscription:
                  '{"type":"subscribe","product_ids":["BTC-USD"],"channels":["ticker",{"name":"ticker","product_ids":["BTC-USD"]}]}',
                maxDataAgeSeconds: 15,
                filter: "$[?(@.type == 'ticker' && @.product_id == 'BTC-USD')]",
              },
            },
            {
              jsonParseTask: {
                path: "$.price",
              },
            },
          ],
        },
        {
          authority: program.account.accountId,
          name: "My Job 5",
          metadata: "My Job 5 metadata",
          expiration: 0,
          tasks: [
            {
              httpTask: {
                url: "https://api.kraken.com/0/public/Ticker?pair=XXBTZUSD",
              },
            },
            {
              medianTask: {
                tasks: [
                  {
                    jsonParseTask: {
                      path: "$.result.XXBTZUSD.a[0]",
                    },
                  },
                  {
                    jsonParseTask: {
                      path: "$.result.XXBTZUSD.b[0]",
                    },
                  },
                  {
                    jsonParseTask: {
                      path: "$.result.XXBTZUSD.c[0]",
                    },
                  },
                ],
              },
            },
          ],
        },
        sbv2.toBase58(
          new Uint8Array([
            193, 130, 130, 183, 232, 81, 123, 240, 7, 99, 180, 103, 233, 143,
            27, 199, 235, 213, 7, 223, 11, 57, 121, 42, 25, 157, 235, 213, 119,
            170, 255, 133,
          ])
        ),
      ],
    });

  // console.log(`NUM ACTIONS: ${actions.length}`);

  // for await (const [i, batch] of batches.entries()) {
  //   const txnReceipt = await program.sendActions(batch);

  //   const result = sbv2.handleReceipt(txnReceipt);
  //   if (result instanceof sbv2.types.SwitchboardError) {
  //     sbv2.types.SwitchboardError.captureStackTrace(result);
  //     throw result;
  //   }

  //   // console.log(JSON.stringify(txnReceipt.transaction.hash, undefined, 2));

  //   console.log(`Batch #${i}: ${txnReceipt.transaction.hash}`);
  // }

  // console.log((await aggregator.loadData()).toJSON());

  console.log(`Mint decimals: ${program.mint.metadata.decimals}`);
  const escrow = await EscrowAccount.getOrCreateStaticAccount(program);
  const txnReceipt = await escrow.fundUpTo({ amount: 41.25 });
  if (!txnReceipt) {
    console.log(`Already funded`);
  } else {
    const escrowResult = sbv2.handleReceipt(txnReceipt!);
    if (escrowResult instanceof sbv2.types.SwitchboardError) {
      sbv2.types.SwitchboardError.captureStackTrace(escrowResult);
      throw escrowResult;
    }

    // console.log(JSON.stringify(escrowResult, undefined, 2));

    console.log(escrowResult.transaction.hash);

    const escrowState = await escrow.loadData();

    const balance = await program.mint.getBalance(program.account);
    console.log(`Token Balance: ${balance.toString()}`);
    console.log(
      `Switchboard Balance: ${escrowState.amount
        .sub(escrowState.amountLocked)
        .toString()}`
    );
  }
})();
