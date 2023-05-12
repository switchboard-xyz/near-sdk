<div align="center">

![Switchboard Logo](https://github.com/switchboard-xyz/sbv2-core/raw/main/website/static/img/icons/switchboard/avatar.png)

# Switchboard x NEAR

> A collection of libraries and examples for interacting with Switchboard on
> Aptos.

[![Crates.io](https://img.shields.io/crates/v/sbv2-near?label=sbv2-near&logo=rust")](https://crates.io/crates/sbv2-near)
[![NPM Badge](https://img.shields.io/github/package-json/v/switchboard-xyz/sbv2-near?color=red&filename=javascript%2Fnear.js%2Fpackage.json&label=%40switchboard-xyz%2Fnear.js&logo=npm)](https://www.npmjs.com/package/@switchboard-xyz/near.js)

</div>

## Getting Started

To get started, clone the
[sbv2-near](https://github.com/switchboard-xyz/sbv2-near) repository.

```bash
git clone https://github.com/switchboard-xyz/sbv2-near
```

Then install the dependencies

```bash
cd sbv2-near
pnpm install
pnpm build
```

## Addresses

The following addresses can be used with the Switchboard deployment on Near

### Mainnet

| Account              | Address                                       |
| -------------------- | --------------------------------------------- |
| Program ID           | `switchboard-v2.near`                         |
| Program Authority    | `sbv2-authority.near`                         |
| Permissionless Queue | `Ztup1aJ8WTe81RZHx7nUP9zxUMrDe9r2TyTCzRzpRoY` |

### Testnet

| Account              | Address                                        |
| -------------------- | ---------------------------------------------- |
| Program ID           | `switchboard-v2.testnet`                       |
| Program Authority    | `sbv2-authority.testnet`                       |
| Permissionless Queue | `HFSJrvA1w2uhciLGLUfE4sADGwGBpUiAjxZPgeFSs61M` |

## Clients

| **Lang**   | **Name**                                       | **Description**                                                                      |
| ---------- | ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| Rust       | [sbv2-near](rust/sbv2-near)                    | A Rust crate to deserialize and read a Switchboard data feed within a NEAR contract. |
| Javascript | [@switchboard-xyz/near.js](javascript/near.js) | A Typescript client to interact with Switchboard on NEAR.                            |

## Example Programs

| **Lang** | **Name**                            | **Description**                  |
| -------- | ----------------------------------- | -------------------------------- |
| Rust     | [feed-parser](programs/feed-parser) | Read a Switchboard feed on NEAR" |

## Troubleshooting

1. File a
   [GitHub Issue](https://github.com/switchboard-xyz/sbv2-near/issues/new)
2. Ask a question in
   [Discord #dev-support](https://discord.com/channels/841525135311634443/984343400377647144)
