use super::decimal::SwitchboardDecimal;
use crate::*;
use near_sdk::collections::vector::Vector;

#[derive(Default, Debug, Clone, BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
pub struct AggregatorHistoryRow {
    pub round_id: u128,
    pub timestamp: u64,
    pub value: SwitchboardDecimal,
}

#[derive(Default, Debug, Clone, Serialize, Deserialize, BorshSerialize, BorshDeserialize)]
pub struct AggregatorRound {
    pub id: u128,
    // Maintains the number of successful responses received from nodes.
    // Nodes can submit one successful response per round.
    pub num_success: u32,
    pub num_error: u32,
    pub is_closed: bool,
    // Maintains the slot that the round was opened at.
    pub round_open_slot: u64,
    // Maintains the unix timestamp the round was opened at.
    pub round_open_timestamp: u64,
    // Maintains the current median of all successful round responses.
    pub result: SwitchboardDecimal,
    // Standard deviation of the accepted results in the round.
    pub std_deviation: SwitchboardDecimal,
    // Maintains the minimum node response this round.
    pub min_response: SwitchboardDecimal,
    // Maintains the maximum node response this round.
    pub max_response: SwitchboardDecimal,
    // pub lease_key: Uuid,
    // Uuids of the oracles fulfilling this round.
    pub oracles: Vec<Uuid>,
    // Represents all successful node responses this round. `NaN` if empty.
    pub medians_data: Vec<SwitchboardDecimal>,
    // Current rewards/slashes oracles have received this round.
    pub current_payout: Vec<i64>,
    // Optionals do not work on zero_copy. Keep track of which responses are
    // fulfilled here.
    pub medians_fulfilled: Vec<bool>,
    // could do specific error codes
    pub errors_fulfilled: Vec<bool>,
    pub _ebuf: Vec<u8>,
    pub features: Vec<u8>,
}

#[derive(Debug, BorshSerialize, BorshDeserialize)]
pub struct Aggregator {
    pub address: Uuid,
    /// Name of the aggregator to store on-chain.
    pub name: Vec<u8>,
    /// Metadata of the aggregator to store on-chain.
    pub metadata: Vec<u8>,
    /// Pubkey of the queue the aggregator belongs to.
    pub queue: Uuid,
    /// CONFIGS
    /// Number of oracles assigned to an update request.
    pub oracle_request_batch_size: u32,
    /// Minimum number of oracle responses required before a round is validated.
    pub min_oracle_results: u32,
    /// Minimum number of job results before an oracle accepts a result.
    pub min_job_results: u32,
    /// Minimum number of seconds required between aggregator rounds.
    pub min_update_delay_seconds: u32,
    /// Unix timestamp for which no feed update will occur before.
    pub start_after: u64,
    /// Change percentage required between a previous round and the current round. If variance percentage is not met, reject new oracle responses.
    pub variance_threshold: SwitchboardDecimal,
    /// Number of seconds for which, even if the variance threshold is not passed, accept new responses from oracles.
    pub force_report_period: u64,
    /// Timestamp when the feed is no longer needed.
    pub expiration: u64,
    //
    /// Counter for the number of consecutive failures before a feed is removed from a queue. If set to 0, failed feeds will remain on the queue.
    pub consecutive_failure_count: u64,
    /// Timestamp when the next update request will be available.
    pub next_allowed_update_time: u64,
    /// Flag for whether an aggregators configuration is locked for editing.
    pub is_locked: bool,
    /// Optional, public key of the crank the aggregator is currently using. Event based feeds do not need a crank.
    pub crank: Uuid,
    pub crank_row_count: u32,
    /// Latest confirmed update request result that has been accepted as valid.
    pub latest_confirmed_round: AggregatorRound,
    /// Oracle results from the current round of update request that has not been accepted as valid yet.
    pub current_round: AggregatorRound,
    /// List of public keys containing the job definitions for how data is sourced off-chain by oracles.
    pub jobs: Vec<Uuid>,
    /// Used to protect against malicious RPC nodes providing incorrect task definitions to oracles before fulfillment.
    pub jobs_checksum: Vec<u8>,
    /// The account delegated as the authority for making account changes.
    pub authority: String,
    /// History storing the last N accepted results and their timestamps.
    pub history: Vector<AggregatorHistoryRow>,
    pub history_limit: u64,
    pub history_write_idx: u64,
    /// The previous confirmed round result.
    pub previous_confirmed_round_result: SwitchboardDecimal,
    /// The slot when the previous confirmed round was opened.
    pub previous_confirmed_round_slot: u64,
    /// Job weights used for the weighted median of the aggregator's assigned job accounts.
    pub job_weights: Vec<u8>,
    /// Unix timestamp when the feed was created.
    pub creation_timestamp: u64,
    pub read_charge: u128,
    pub reward_escrow: Uuid,
    pub max_gas_cost: u128, // 0 means no limit
    pub whitelisted_readers: Vec<Uuid>,
    pub allow_whitelist_only: bool,
    /// Reserved for future info.
    pub _ebuf: Vec<u8>,
    pub features: Vec<u8>,
}
