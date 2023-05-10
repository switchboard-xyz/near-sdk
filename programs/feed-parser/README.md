<div align="center">

![Switchboard Logo](https://github.com/switchboard-xyz/sbv2-core/raw/main/website/static/img/icons/switchboard/avatar.png)

# NEAR feed-parser

> An example contract reading the price of a Switchboard V2 data feed on-chain.

[![Crates.io](https://img.shields.io/crates/v/sbv2-near?label=sbv2-near&logo=rust")](https://crates.io/crates/sbv2-near)

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
