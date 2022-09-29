import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IViewJobs {
  addresses: Array<Uint8Array>;
}

export interface ViewJobsJSON {
  addresses: Array<Array<number>>;
}

export interface ViewJobsBorsh {
  addresses: Array<Array<number>>;
}

export class ViewJobs implements IViewJobs {
  readonly addresses: Array<Uint8Array>;

  constructor(fields: IViewJobs) {
    this.addresses = fields.addresses;
  }

  toJSON(): ViewJobsJSON {
    return {
      addresses: this.addresses.map((item) => [...item]),
    };
  }

  toBorsh(): ViewJobsBorsh {
    return {
      addresses: this.addresses.map((item) => [...item]),
    };
  }

  static fromJSON(obj: ViewJobsJSON) {
    return new ViewJobs({
      addresses: obj.addresses.map((item) => new Uint8Array(item)),
    });
  }

  static fromBorsh(obj: ViewJobsBorsh) {
    return new ViewJobs({
      addresses: obj.addresses.map((item) => new Uint8Array(item)),
    });
  }
}
