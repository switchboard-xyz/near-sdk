pub mod aggregator;
pub mod decimal;
pub mod error;

pub use aggregator::{Aggregator, AggregatorHistoryRow, AggregatorRound};
pub use decimal::SwitchboardDecimal;
pub use error::SwitchboardError;

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};

use serde::{Deserialize, Serialize};

pub type Address = [u8; 32];
pub type Uuid = [u8; 32];

/// Mainnet program id for Switchboard v2
pub const SWITCHBOARD_V2_MAINNET: &str = "switchboard-v2.near";
#[cfg(not(feature = "testnet"))]
/// Switchboard Program ID.
pub const SWITCHBOARD_PROGRAM_ID: &str = SWITCHBOARD_V2_MAINNET;

/// Devnet program id for Switchboard v2
pub const SWITCHBOARD_V2_TESTNET: &str = "switchboard-v2.testnet";
#[cfg(feature = "testnet")]
/// Switchboard Program ID.
pub const SWITCHBOARD_PROGRAM_ID: &str = SWITCHBOARD_V2_TESTNET;
