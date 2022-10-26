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
    // "https://rpc.testnet.near.org",
    "https://near-testnet--rpc.datahub.figment.io/apikey/9a3e08e57627016f39e6f67c3df7eed1",
    keypairName
  );
  console.log(`Signer: ${program.account.accountId}`);

  const aggregatorAccount = new sbv2.AggregatorAccount({
    program,
    address: sbv2.parseAddressString(
      // "21EKutL6JAudcS2MVvfgvCsKqxLNovy72rqpwo4gwzfR"
      "7aKuTbet2DFSr5SLoTRzGmKxNx9DxXsBA7vtEdv3cstP"
    ),
  });
  console.log("pre1");
  const aggregator = await aggregatorAccount.loadData();

  console.log("post1");
  // add 1000 rows

  const txnReceipt = await aggregatorAccount.addHistory({ numRows: 1000 });
  console.log(JSON.stringify(txnReceipt, undefined, 2));

  console.log("pre2");
  const newAggregator = await aggregatorAccount.loadData();
  console.log("post2");
  console.log(newAggregator.toJSON());

  console.log(`Old History Limit: ${aggregator.historyLimit}`);
  console.log(`New History Limit: ${newAggregator.historyLimit}`);
})();
