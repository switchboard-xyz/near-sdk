import { FinalExecutionOutcome } from "near-api-js/lib/providers";
import { Action } from "near-api-js/lib/transaction.js";
import { types } from "./index.js";

/** This function takes a txnReceipt and parses the logs for any internal Switchboard errors
 * before rethrowing them
 * @throws SwitchboardError if found
 */
export function handleReceipt(
  txnReceipt: FinalExecutionOutcome
): FinalExecutionOutcome | types.SwitchboardError {
  // Find success cases and return outcome
  if (
    typeof txnReceipt.status === "string" &&
    txnReceipt.status !== "Failure"
  ) {
    // NotStarted && Started dont imply success but no other alternatives but return receipt
    return txnReceipt;
  }
  if (
    typeof txnReceipt.status !== "string" &&
    "SuccessValue" in txnReceipt.status
  ) {
    return txnReceipt;
  }

  // We got an error to handle
  if (typeof txnReceipt.status !== "string" && "Failure" in txnReceipt.status) {
    const errorString = JSON.stringify(txnReceipt.status);
    const logs = txnReceipt.transaction_outcome.outcome.logs;

    let action: Action | undefined = undefined;
    if (
      "actions" in txnReceipt.transaction &&
      Array.isArray(txnReceipt.transaction.actions) &&
      txnReceipt.transaction.actions.length > 0
    ) {
      const actions = txnReceipt.transaction.actions;
      const actionIndexMatch =
        /"ActionError":{"index":(?<ACTION_INDEX>[0-9]{1,3})/.exec(errorString);
      if (
        actionIndexMatch &&
        "groups" in actionIndexMatch &&
        actionIndexMatch.groups["ACTION_INDEX"]
      ) {
        const actionIndex = Number.parseInt(
          actionIndexMatch.groups["ACTION_INDEX"]
        );
        if (actionIndex < actions.length) {
          action = actions[actionIndex];
          // console.log(Buffer.from(action?.functionCall?.args).toString("utf8"));
          // action.functionCall.args = JSON.parse(
          //   Buffer.from(action?.functionCall?.args ?? "").toString("utf8")
          // );
        }
      }
    }

    // check if we have a Sbv2Error
    const errorMatch = /value:\s(?<ERROR_TYPE>[\w]*)/.exec(errorString);
    if (
      errorMatch &&
      "groups" in errorMatch &&
      errorMatch.groups["ERROR_TYPE"]
    ) {
      const errorType = errorMatch.groups["ERROR_TYPE"];
      if (types.SwitchboardErrorTypes.includes(errorType)) {
        const error = types.SwitchboardError.fromErrorType(
          errorType,
          txnReceipt,
          action,
          logs
        );
        return error;
      }
    }

    // TODO: Add handler for common Near errors like out of gas, etc

    // throw generic error if not found
    return types.SwitchboardError.fromErrorType(
      "Generic",
      txnReceipt,
      action,
      logs
    );
  }

  // handle fall through case
  return txnReceipt;
}
