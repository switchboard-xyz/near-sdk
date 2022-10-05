import { KeyPair, Signer, utils, Account, transactions } from "near-api-js";
import { FinalExecutionOutcome } from "near-api-js/lib/providers";
import {
  Action,
  SignedTransaction,
  Transaction,
} from "near-api-js/lib/transaction";
import { PublicKey } from "near-api-js/lib/utils";
import sha256 from "js-sha256";

export class SwitchboardTransaction {
  public signer: Signer;

  constructor(
    readonly programId: string,
    readonly account: Account,
    readonly actions: Action[] = [],
    signer?: Signer
  ) {
    this.signer = signer || account.connection.signer;
  }

  add(action: Action | Action[]) {
    const actions = this.actions;

    if (Array.isArray(action)) {
      actions.push(...action);
    } else {
      actions.push(action);
    }

    return;
  }

  async getAccessKey(accessKeyKeypair: KeyPair): Promise<{
    publicKey: PublicKey;
    accessKey: any;
    nonce: number;
    recentBlockhash: Buffer;
  }> {
    const publicKey = accessKeyKeypair.getPublicKey();

    // gets sender's public key information from NEAR blockchain
    const accessKey = await this.account.connection.provider.query(
      `access_key/${this.account.accountId}/${publicKey.toString()}`,
      ""
    );

    const nonce = Number.parseInt((accessKey as any).nonce) + 1;
    // converts a recent block hash into an array of bytes
    // this hash was retrieved earlier when creating the accessKey (Line 26)
    // this is required to prove the tx was recently constructed (within 24hrs)
    const recentBlockhash = utils.serialize.base_decode(accessKey.block_hash);

    return {
      publicKey,
      accessKey,
      nonce,
      recentBlockhash,
    };
  }

  async send(accessKeyKeypair: KeyPair): Promise<FinalExecutionOutcome> {
    if (this.actions.length === 0) {
      throw new Error(`No actions to send`);
    }
    // const key = this.account.findAccessKey()

    const { publicKey, nonce, recentBlockhash } = await this.getAccessKey(
      accessKeyKeypair
    );

    // create transaction
    const transaction = transactions.createTransaction(
      this.account.accountId,
      publicKey,
      this.programId,
      nonce,
      this.actions,
      recentBlockhash
    );

    const signedTransaction = this.sign(transaction, accessKeyKeypair);

    const txnReceipt = await this.account.connection.provider.sendTransaction(
      signedTransaction
    );
    return txnReceipt;
  }

  sign(transaction: Transaction, keyPair: KeyPair): SignedTransaction {
    // before we can sign the transaction we must perform three steps...
    // 1) serialize the transaction in Serde
    const serializedTx = utils.serialize.serialize(
      transactions.SCHEMA,
      transaction
    );
    // 2) hash the serialized transaction using sha256
    const serializedTxHash = new Uint8Array(sha256.sha256.array(serializedTx));
    // 3) create a signature using the hashed transaction
    const signature = keyPair.sign(serializedTxHash);

    // now we can sign the transaction :)
    const signedTransaction = new transactions.SignedTransaction({
      transaction,
      signature: new transactions.Signature({
        keyType: transaction.publicKey.keyType,
        data: signature.signature,
      }),
    });

    return signedTransaction;
  }
}
