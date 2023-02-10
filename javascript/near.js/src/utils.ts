import bs58 from "bs58";
import { providers } from "near-api-js";

export const toBase58 = (address: Uint8Array): string => {
  return bs58.encode(address);
};
export const fromBase58 = (value: string): Uint8Array => {
  return bs58.decode(value);
};

export const isBase58 = (value: string): boolean =>
  /^[A-HJ-NP-Za-km-z1-9]*$/.test(value);

export const parseAddressString = (address: string): Uint8Array => {
  // check if base58
  if (isBase58(address)) {
    return fromBase58(address);
  }
  // check if array of bytes
  // TODO: Make brackets optional
  const bytesRegex = /^\[(\s)?[0-9]+((\s)?,(\s)?[0-9]+){31,}\]/;
  if (bytesRegex.test(address)) {
    return new Uint8Array(JSON.parse(address));
  }

  try {
    return new Uint8Array(JSON.parse(address));
  } catch {}

  throw new Error(`Failed to parse address string ${address}`);
};

export const isTxnSuccessful = (
  txnReceipt: providers.FinalExecutionOutcome
): boolean => {
  return !Boolean(
    txnReceipt.status === "Failure" ||
      txnReceipt.transaction_outcome.outcome.status === "Failure" ||
      (typeof txnReceipt.transaction_outcome.outcome.status !== "string" &&
        "Failure" in txnReceipt.transaction_outcome.outcome.status)
  );
};
