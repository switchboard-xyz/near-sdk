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
    --initArgs '{"ix": {"address": [69,196,100,134,238,49,135,87,63,254,1,167,10,96,147,71,72,147,16,66,48,140,64,203,38,200,194,112,50,38,97,250]} }' \
    --initGas 300000000000000
```
