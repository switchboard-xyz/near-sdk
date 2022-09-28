import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as borsh from "borsh"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IViewAggregatorsWithAuthority {
  authority: string;
}

export interface ViewAggregatorsWithAuthorityJSON {
  authority: string;
}

export interface ViewAggregatorsWithAuthorityBorsh {
  authority: string;
}

export class ViewAggregatorsWithAuthority
  implements IViewAggregatorsWithAuthority
{
  readonly authority: string;

  constructor(fields: IViewAggregatorsWithAuthority) {
    this.authority = fields.authority;
  }

  toJSON(): ViewAggregatorsWithAuthorityJSON {
    return {
      authority: this.authority,
    };
  }

  toBorsh(): ViewAggregatorsWithAuthorityBorsh {
    return {
      authority: this.authority,
    };
  }

  static fromJSON(obj: ViewAggregatorsWithAuthorityJSON) {
    return new ViewAggregatorsWithAuthority({
      authority: obj.authority,
    });
  }

  static fromBorsh(obj: ViewAggregatorsWithAuthorityBorsh) {
    return new ViewAggregatorsWithAuthority({
      authority: obj.authority,
    });
  }
}
