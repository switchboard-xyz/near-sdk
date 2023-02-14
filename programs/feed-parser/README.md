<div align="center">
  <a href="#">
    <img height="170" src="https://github.com/switchboard-xyz/sbv2-core/raw/main/website/static/img/icons/switchboard/avatar.svg" />
  </a>

  <h2>sbv2-near feed-parser</h2>
  <p>An example contract reading the price of a Switchboard V2 data feed on-chain.</p>

  <p>
  	<a href="https://crates.io/crates/sbv2-near">
      <img alt="Crates.io" src="https://img.shields.io/crates/v/sbv2-near?label=sbv2-near&logo=rust">
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
    <strong>Sbv2 NEAR SDK: </strong><a href="https://github.com/switchboard-xyz/sbv2-near">github.com/switchboard-xyz/sbv2-near</a>
  </h4>
</div>

## Usage

Build the contract

```bash
cargo build --all --target wasm32-unknown-unknown --release
```

Deploy and read an aggregator account

```bash
near dev-deploy target/wasm32-unknown-unknown/release/sbv2_near_feed_parser.wasm \
    --initFunction aggregator_read \
    --initArgs '{"ix": {"address": [14,234,193,55,190,250,74,147,12,227,241,149,117,14,77,28,207,81,168,192,0,251,113,20,80,113,123,208,153,253,41,248]} }' \
    --initGas 300000000000000
```

See [switchboard.xyz/explorer](https://switchboard.xyz/explorer) for a list of
feeds deployed on NEAR.
