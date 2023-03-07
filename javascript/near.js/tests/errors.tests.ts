import "mocha";

import * as sbv2 from "../lib/cjs";

import InvalidEscrowReceipt from "./data/invalidEscrowReceipt.json";
import NonSwitchboardErrorReceipt from "./data/nonSwitchboardError.json";
import SuccessReceipt from "./data/success.json";

import { providers } from "near-api-js";

describe("Errors tests", () => {
  it("returns FinalExecutionOutcome if transaction is successful", async () => {
    const successReceipt: providers.FinalExecutionOutcome = SuccessReceipt;

    const result = sbv2.handleReceipt(successReceipt);
    if (
      result instanceof sbv2.types.SwitchboardError ||
      result instanceof Error
    ) {
      throw new Error(`Returns an error when transaction was successful`);
    }
  });

  it("handles parsing an Sbv2Error from a FinalExecutionOutcome", async () => {
    const invalidEscrowReceipt: providers.FinalExecutionOutcome =
      InvalidEscrowReceipt;

    const result = sbv2.handleReceipt(invalidEscrowReceipt);
    if (
      !(result instanceof sbv2.types.SwitchboardError) &&
      !(result instanceof Error)
    ) {
      throw new Error(`Failed to handle error`);
    }
    if (!(result instanceof sbv2.types.SwitchboardError)) {
      throw new Error(`Failed to handle error with the correct type`);
    }
  });

  it("throws a generic error when it cant match", async () => {
    const nonSwitchboardErrorReceipt: providers.FinalExecutionOutcome =
      NonSwitchboardErrorReceipt;

    const result = sbv2.handleReceipt(nonSwitchboardErrorReceipt);
    if (
      !(result instanceof sbv2.types.SwitchboardError) &&
      !(result instanceof Error)
    ) {
      throw new Error(`Failed to handle error`);
    }
    if (!(result instanceof sbv2.types.Generic)) {
      throw new Error(
        `Failed to handle error with the correct type, ${result}`
      );
    }
  });
});
