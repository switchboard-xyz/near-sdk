import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IViewAggregatorsStateWithAuthority {
  authority: string;
}

export interface ViewAggregatorsStateWithAuthorityJSON {
  authority: string;
}

export interface ViewAggregatorsStateWithAuthoritySerde {
  authority: string;
}

export class ViewAggregatorsStateWithAuthority
  implements IViewAggregatorsStateWithAuthority
{
  readonly authority: string;

  constructor(fields: IViewAggregatorsStateWithAuthority) {
    this.authority = fields.authority;
  }

  toJSON(): ViewAggregatorsStateWithAuthorityJSON {
    return {
      authority: this.authority,
    };
  }

  toSerde(): ViewAggregatorsStateWithAuthoritySerde {
    return {
      authority: this.authority,
    };
  }

  static fromJSON(obj: ViewAggregatorsStateWithAuthorityJSON) {
    return new ViewAggregatorsStateWithAuthority({
      authority: obj.authority,
    });
  }

  static fromSerde(obj: ViewAggregatorsStateWithAuthoritySerde) {
    return new ViewAggregatorsStateWithAuthority({
      authority: obj.authority,
    });
  }
}
