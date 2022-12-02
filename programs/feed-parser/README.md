# Switchboard V2 Near Feed Parser

An example contract reading the price of a Switchboard V2 data feed on-chain.

## Steps

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
