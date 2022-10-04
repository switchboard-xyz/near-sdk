import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IViewAggregatorsWithAuthority {
  authority: string;
}

export interface ViewAggregatorsWithAuthorityJSON {
  authority: string;
}

export interface ViewAggregatorsWithAuthoritySerde {
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

  toSerde(): ViewAggregatorsWithAuthoritySerde {
    return {
      authority: this.authority,
    };
  }

  static fromJSON(obj: ViewAggregatorsWithAuthorityJSON) {
    return new ViewAggregatorsWithAuthority({
      authority: obj.authority,
    });
  }

  static fromSerde(obj: ViewAggregatorsWithAuthoritySerde) {
    return new ViewAggregatorsWithAuthority({
      authority: obj.authority,
    });
  }
}
