<div align="center">
  <a href="#">
    <img height="170" src="https://github.com/switchboard-xyz/sbv2-core/raw/main/website/static/img/icons/switchboard/avatar.svg" />
  </a>

  <h1>Switchboard V2</h1>

  <p>A collection of libraries and examples for interacting with Switchboard V2 on NEAR.</p>

  <p>
  	<a href="https://crates.io/crates/sbv2-near">
      <img alt="Crates.io" src="https://img.shields.io/crates/v/sbv2-near?label=sbv2-near&logo=rust">
    </a>
	  <a href="https://www.npmjs.com/package/@switchboard-xyz/near.js">
      <img alt="NPM Badge" src="https://img.shields.io/github/package-json/v/switchboard-xyz/sbv2-near?color=red&filename=javascript%2Fnear.js%2Fpackage.json&label=%40switchboard-xyz%2Fnear.js&logo=npm">
    </a>
  </p>

  <p>
    <a href="https://discord.gg/switchboardxyz">
      <img alt="Discord" src="https://img.shields.io/discord/841525135311634443?color=blueviolet&logo=discord&logoColor=white">
    </a>
    <a href="https://twitter.com/switchboardxyz">
      <img alt="Twitter" src="https://img.shields.io/twitter/follow/switchboardxyz?label=Follow+Switchboard" />
    </a>
  </p>

  <h4>
    <strong>Documentation: </strong><a href="https://docs.switchboard.xyz">docs.switchboard.xyz</a>
  </h4>
</div>

## Getting Started

To get started, clone the
[sbv2-near](https://github.com/switchboard-xyz/sbv2-near) repository.

```bash
git clone https://github.com/switchboard-xyz/sbv2-near
```

## Program IDs

| **Network** | **Program ID**           |
| ----------- | ------------------------ |
| Mainnet     | `switchboard-v2.near`    |
| Testnet     | `switchboard-v2.testnet` |

See [switchboard.xyz/explorer](https://switchboard.xyz/explorer) for a list of
feeds deployed on NEAR.

See [app.switchboard.xyz](https://app.switchboard.xyz) to create your own NEAR
feeds.

## Libraries

| **Lang** | **Name**                                                                                                                                                                                        | **Description**                                           |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Rust     | [sbv2-near](/rust/sbv2-near/) <br />[[Crates.io](https://crates.io/crates/sbv2-near), [Typedocs](https://docs.rs/sbv2-near/latest/sbv2_near/)]                                                  | Rust crate to deserialize and read Switchboard data feeds |
| JS       | [@switchboard-xyz/near.js](/javascript/near.js/) <br />[[npmjs](https://www.npmjs.com/package/@switchboard-xyz/near.js), [Typedocs](https://docs.switchboard.xyz/api/@switchboard-xyz/near.js)] | Typescript package to interact with Switchboard V2        |

## Example Programs

- [feed-parser](/programs/feed-parser/): Read a Switchboard feed on NEAR

## Troubleshooting

1. File a
   [GitHub Issue](https://github.com/switchboard-xyz/sbv2-near/issues/new)
2. Ask a question in
   [Discord #dev-support](https://discord.com/channels/841525135311634443/984343400377647144)
