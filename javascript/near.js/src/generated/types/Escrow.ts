import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IEscrow {
  address: Uint8Array;
  mint: string;
  amount: BN;
  authority: string | undefined;
  amountLocked: BN;
  programControlled: boolean;
  creationTimestamp: BN;
  lastTransferTimestamp: BN;
  lastDelegationTimestamp: BN;
  lastDelegationBlock: BN;
  _ebuf: Uint8Array;
  features: Uint8Array;
}

export interface EscrowJSON {
  address: Array<number>;
  mint: string;
  amount: string;
  authority: string | undefined;
  amountLocked: string;
  programControlled: boolean;
  creationTimestamp: string;
  lastTransferTimestamp: string;
  lastDelegationTimestamp: string;
  lastDelegationBlock: string;
  _ebuf: Array<number>;
  features: Array<number>;
}

export interface EscrowSerde {
  address: Array<number>;
  mint: string;
  amount: number;
  authority: string | null;
  amount_locked: number;
  program_controlled: boolean;
  creation_timestamp: number;
  last_transfer_timestamp: number;
  last_delegation_timestamp: number;
  last_delegation_block: number;
  _ebuf: Array<number>;
  features: Array<number>;
}

export class Escrow implements IEscrow {
  readonly address: Uint8Array;
  readonly mint: string;
  readonly amount: BN;
  readonly authority: string | undefined;
  readonly amountLocked: BN;
  readonly programControlled: boolean;
  readonly creationTimestamp: BN;
  readonly lastTransferTimestamp: BN;
  readonly lastDelegationTimestamp: BN;
  readonly lastDelegationBlock: BN;
  readonly _ebuf: Uint8Array;
  readonly features: Uint8Array;

  constructor(fields: IEscrow) {
    this.address = fields.address;
    this.mint = fields.mint;
    this.amount = fields.amount;
    this.authority = fields.authority;
    this.amountLocked = fields.amountLocked;
    this.programControlled = fields.programControlled;
    this.creationTimestamp = fields.creationTimestamp;
    this.lastTransferTimestamp = fields.lastTransferTimestamp;
    this.lastDelegationTimestamp = fields.lastDelegationTimestamp;
    this.lastDelegationBlock = fields.lastDelegationBlock;
    this._ebuf = fields._ebuf;
    this.features = fields.features;
  }

  toJSON(): EscrowJSON {
    return {
      address: [...this.address],
      mint: this.mint,
      amount: this.amount.toString(),
      authority: this.authority,
      amountLocked: this.amountLocked.toString(),
      programControlled: this.programControlled,
      creationTimestamp: this.creationTimestamp.toString(),
      lastTransferTimestamp: this.lastTransferTimestamp.toString(),
      lastDelegationTimestamp: this.lastDelegationTimestamp.toString(),
      lastDelegationBlock: this.lastDelegationBlock.toString(),
      _ebuf: [...this._ebuf],
      features: [...this.features],
    };
  }

  toSerde(): EscrowSerde {
    return {
      address: [...this.address],
      mint: this.mint,
      amount: this.amount.toNumber(),
      authority: this.authority,
      amount_locked: this.amountLocked.toNumber(),
      program_controlled: this.programControlled,
      creation_timestamp: this.creationTimestamp.toNumber(),
      last_transfer_timestamp: this.lastTransferTimestamp.toNumber(),
      last_delegation_timestamp: this.lastDelegationTimestamp.toNumber(),
      last_delegation_block: this.lastDelegationBlock.toNumber(),
      _ebuf: [...this._ebuf],
      features: [...this.features],
    };
  }

  static fromJSON(obj: EscrowJSON) {
    return new Escrow({
      address: new Uint8Array(obj.address),
      mint: obj.mint,
      amount: new BN(obj.amount),
      authority: obj.authority,
      amountLocked: new BN(obj.amountLocked),
      programControlled: obj.programControlled,
      creationTimestamp: new BN(obj.creationTimestamp),
      lastTransferTimestamp: new BN(obj.lastTransferTimestamp),
      lastDelegationTimestamp: new BN(obj.lastDelegationTimestamp),
      lastDelegationBlock: new BN(obj.lastDelegationBlock),
      _ebuf: new Uint8Array(obj._ebuf),
      features: new Uint8Array(obj.features),
    });
  }

  static fromSerde(obj: EscrowSerde) {
    return new Escrow({
      address: new Uint8Array(obj.address),
      mint: obj.mint,
      amount: new BN(
        obj.amount.toLocaleString("fullwide", { useGrouping: false })
      ),
      authority: obj.authority,
      amountLocked: new BN(
        obj.amount_locked.toLocaleString("fullwide", { useGrouping: false })
      ),
      programControlled: obj.program_controlled,
      creationTimestamp: new BN(
        obj.creation_timestamp.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
      lastTransferTimestamp: new BN(
        obj.last_transfer_timestamp.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
      lastDelegationTimestamp: new BN(
        obj.last_delegation_timestamp.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
      lastDelegationBlock: new BN(
        obj.last_delegation_block.toLocaleString("fullwide", {
          useGrouping: false,
        })
      ),
      _ebuf: new Uint8Array(obj._ebuf),
      features: new Uint8Array(obj.features),
    });
  }
}
