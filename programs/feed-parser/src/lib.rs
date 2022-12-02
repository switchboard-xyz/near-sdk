use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::env::log_str;
use near_sdk::log;
use near_sdk::near_bindgen;
use near_sdk::serde_json::json;
use near_sdk::Promise;
use near_sdk::PromiseResult::Successful;
use serde::{Deserialize, Serialize};
use serde_json;
use std::convert::TryInto;

use sbv2_near::{AggregatorRound, Uuid, SWITCHBOARD_PROGRAM_ID};

macro_rules! json_buf {
    ($x:tt) => {
        json!($x).to_string().as_bytes().to_vec()
    };
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Default)]
pub struct Contract {}

#[near_bindgen]
impl Contract {
    #[payable]
    pub fn aggregator_read(&mut self, ix: Ix) -> Promise {
        Promise::new(SWITCHBOARD_PROGRAM_ID.parse().unwrap())
            .function_call(
                "aggregator_read".into(),
                json_buf!({
                    "ix": {
                        "address": ix.address,
                        "payer": ix.address,
                    }
                }),
                near_sdk::ONE_YOCTO,
                near_sdk::Gas(30000000000000), // WHAT IF GAS RUNS OUT?? need to make sure enough?
            )
            .then(
                Promise::new(near_sdk::env::current_account_id()).function_call(
                    "callback".into(),
                    json_buf!({}),
                    near_sdk::ONE_YOCTO,
                    near_sdk::Gas(30000000000000), // WHAT IF GAS RUNS OUT?? need to make sure enough?
                ),
            )
    }
    #[payable]
    pub fn callback(&mut self) {
        let maybe_round = near_sdk::env::promise_result(0);
        if let Successful(serialized_round) = maybe_round {
            let round: AggregatorRound = serde_json::from_slice(&serialized_round).unwrap();
            let val: f64 = round.result.try_into().unwrap();
            log!("Feed value: {:?}", val);
        } else {
            log_str("error");
        }
    }
}

#[derive(Deserialize, Serialize)]
pub struct Ix {
    pub address: [u8; 32],
}
