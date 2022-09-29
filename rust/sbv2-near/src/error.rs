extern crate custom_error;
use custom_error::custom_error;

custom_error! {pub SwitchboardError
    InvalidAggregatorRound = "Aggregator is not currently populated with a valid round",
    InvalidStrDecimalConversion   = "Failed to convert string to decimal format",
    DecimalConversionError = "Decimal conversion method failed",
    IntegerOverflowError = "An integer overflow occurred",
    AccountDeserializationError = "Failed to deserialize account",
    StaleFeed = "Switchboard feed exceeded the staleness threshold",
    ConfidenceIntervalExceeded = "Switchboard feed exceeded the confidence interval threshold",
    InvalidAuthority = "Invalid authority provided to Switchboard account",
}
