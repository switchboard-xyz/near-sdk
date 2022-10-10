import BN from "bn.js"; // eslint-disable-line @typescript-eslint/no-unused-vars
import * as types from "../types/index.js"; // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IJob {
  address: Uint8Array;
  name: Uint8Array;
  metadata: Uint8Array;
  authority: string;
  expiration: BN;
  hash: Uint8Array;
  data: Uint8Array;
  referenceCount: number;
  totalSpent: BN;
  createdAt: BN;
  _ebuf: Uint8Array;
  features: Uint8Array;
}

export interface JobJSON {
  address: Array<number>;
  name: Array<number>;
  metadata: Array<number>;
  authority: string;
  expiration: string;
  hash: Array<number>;
  data: Array<number>;
  referenceCount: number;
  totalSpent: string;
  createdAt: string;
  _ebuf: Array<number>;
  features: Array<number>;
}

export interface JobSerde {
  address: Array<number>;
  name: Array<number>;
  metadata: Array<number>;
  authority: string;
  expiration: number;
  hash: Array<number>;
  data: Array<number>;
  reference_count: number;
  total_spent: number;
  created_at: number;
  _ebuf: Array<number>;
  features: Array<number>;
}

export class Job implements IJob {
  readonly address: Uint8Array;
  readonly name: Uint8Array;
  readonly metadata: Uint8Array;
  readonly authority: string;
  readonly expiration: BN;
  readonly hash: Uint8Array;
  readonly data: Uint8Array;
  readonly referenceCount: number;
  readonly totalSpent: BN;
  readonly createdAt: BN;
  readonly _ebuf: Uint8Array;
  readonly features: Uint8Array;

  constructor(fields: IJob) {
    this.address = fields.address;
    this.name = fields.name;
    this.metadata = fields.metadata;
    this.authority = fields.authority;
    this.expiration = fields.expiration;
    this.hash = fields.hash;
    this.data = fields.data;
    this.referenceCount = fields.referenceCount;
    this.totalSpent = fields.totalSpent;
    this.createdAt = fields.createdAt;
    this._ebuf = fields._ebuf;
    this.features = fields.features;
  }

  toJSON(): JobJSON {
    return {
      address: [...this.address],
      name: [...this.name],
      metadata: [...this.metadata],
      authority: this.authority,
      expiration: this.expiration.toString(),
      hash: [...this.hash],
      data: [...this.data],
      referenceCount: this.referenceCount,
      totalSpent: this.totalSpent.toString(),
      createdAt: this.createdAt.toString(),
      _ebuf: [...this._ebuf],
      features: [...this.features],
    };
  }

  toSerde(): JobSerde {
    return {
      address: [...this.address],
      name: [...this.name],
      metadata: [...this.metadata],
      authority: this.authority,
      expiration: this.expiration.toNumber(),
      hash: [...this.hash],
      data: [...this.data],
      reference_count: this.referenceCount,
      total_spent: this.totalSpent.toNumber(),
      created_at: this.createdAt.toNumber(),
      _ebuf: [...this._ebuf],
      features: [...this.features],
    };
  }

  static fromJSON(obj: JobJSON) {
    return new Job({
      address: new Uint8Array(obj.address),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      authority: obj.authority,
      expiration: new BN(obj.expiration),
      hash: new Uint8Array(obj.hash),
      data: new Uint8Array(obj.data),
      referenceCount: obj.referenceCount,
      totalSpent: new BN(obj.totalSpent),
      createdAt: new BN(obj.createdAt),
      _ebuf: new Uint8Array(obj._ebuf),
      features: new Uint8Array(obj.features),
    });
  }

  static fromSerde(obj: JobSerde) {
    return new Job({
      address: new Uint8Array(obj.address),
      name: new Uint8Array(obj.name),
      metadata: new Uint8Array(obj.metadata),
      authority: obj.authority,
      expiration: new BN(
        obj.expiration.toLocaleString("fullwide", { useGrouping: false })
      ),
      hash: new Uint8Array(obj.hash),
      data: new Uint8Array(obj.data),
      referenceCount: obj.reference_count,
      totalSpent: new BN(
        obj.total_spent.toLocaleString("fullwide", { useGrouping: false })
      ),
      createdAt: new BN(
        obj.created_at.toLocaleString("fullwide", { useGrouping: false })
      ),
      _ebuf: new Uint8Array(obj._ebuf),
      features: new Uint8Array(obj.features),
    });
  }
}
