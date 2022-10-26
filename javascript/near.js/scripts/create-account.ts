import { BN } from "bn.js";
import { connect, KeyPair, keyStores, utils } from "near-api-js";
import { homedir } from "os";
import path from "path";

const FUNDER_ACCOUNT: string =
  process.argv.length > 2 ? process.argv[2] : "gallynaut.testnet";
const NEW_ACCOUNT: string =
  process.argv.length > 3 ? process.argv[3] : "sbv2.testnet";
const AMOUNT: string = process.argv.length > 4 ? process.argv[4] : "200";

(async function main() {
  const credentialsDir = path.join(homedir(), ".near-credentials");
  const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsDir);

  const near = await connect({
    keyStore,
    networkId: "testnet",
    nodeUrl: "https://rpc.testnet.near.org",
  });

  const account = await near.account(FUNDER_ACCOUNT);
  // if (!account) {
  //   throw new Error(`Failed to find funding account ${account}`);
  // }

  const deployKeypair = await keyStore.getKey("testnet", NEW_ACCOUNT);
  if (!deployKeypair) {
    console.log(`Creating deploy account ${NEW_ACCOUNT} ...`);
    const keyPair = KeyPair.fromRandom("ed25519");
    const publicKey = keyPair.getPublicKey().toString();
    await keyStore.setKey("testnet", NEW_ACCOUNT, keyPair);

    await account.functionCall({
      contractId: "testnet",
      methodName: "create_account",
      args: {
        new_account_id: NEW_ACCOUNT,
        new_public_key: publicKey,
      },
      gas: new BN("300000000000000"),
      attachedDeposit: new BN(
        utils.format.parseNearAmount(AMOUNT) ||
          `${AMOUNT}000000000000000000000000`
      ),
    });
  }
  const deployAccount = await near.account(NEW_ACCOUNT);
  const deployAccountBalance = await deployAccount.getAccountBalance();
  console.log(`Balance: ${deployAccountBalance.available}`);
})();
