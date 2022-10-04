import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IState {
  authority: Uint8Array;
  tokenMint: Uint8Array;
  tokenVault: Uint8Array;
  daoMint: Uint8Array;
}

export interface StateJSON {
  authority: Array<number>;
  tokenMint: Array<number>;
  tokenVault: Array<number>;
  daoMint: Array<number>;
}

export interface StateSerde {
  authority: Array<number>;
  token_mint: Array<number>;
  token_vault: Array<number>;
  dao_mint: Array<number>;
}

export class State implements IState {
  readonly authority: Uint8Array;
  readonly tokenMint: Uint8Array;
  readonly tokenVault: Uint8Array;
  readonly daoMint: Uint8Array;

  constructor(fields: IState) {
    this.authority = fields.authority;
    this.tokenMint = fields.tokenMint;
    this.tokenVault = fields.tokenVault;
    this.daoMint = fields.daoMint;
  }

  toJSON(): StateJSON {
    return {
      authority: [...this.authority],
      tokenMint: [...this.tokenMint],
      tokenVault: [...this.tokenVault],
      daoMint: [...this.daoMint],
    };
  }

  toSerde(): StateSerde {
    return {
      authority: [...this.authority],
      token_mint: [...this.tokenMint],
      token_vault: [...this.tokenVault],
      dao_mint: [...this.daoMint],
    };
  }

  static fromJSON(obj: StateJSON) {
    return new State({
      authority: new Uint8Array(obj.authority),
      tokenMint: new Uint8Array(obj.tokenMint),
      tokenVault: new Uint8Array(obj.tokenVault),
      daoMint: new Uint8Array(obj.daoMint),
    });
  }

  static fromSerde(obj: StateSerde) {
    return new State({
      authority: new Uint8Array(obj.authority),
      tokenMint: new Uint8Array(obj.token_mint),
      tokenVault: new Uint8Array(obj.token_vault),
      daoMint: new Uint8Array(obj.dao_mint),
    });
  }
}
