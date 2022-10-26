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
  const history = await aggregatorAccount.loadHistory();
  console.log(JSON.stringify(history, undefined, 2));
  console.log(history.length);
})();
