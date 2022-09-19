use super::error::SwitchboardError;
use crate::*;
use core::cmp::Ordering;
use rust_decimal::prelude::{FromPrimitive, ToPrimitive};
use rust_decimal::Decimal;
use std::convert::{From, TryInto};

#[derive(
    Default,
    Debug,
    Copy,
    Clone,
    Eq,
    PartialEq,
    BorshDeserialize,
    BorshSerialize,
    Serialize,
    Deserialize,
)]
pub struct SwitchboardDecimal {
    /// The part of a floating-point number that represents the significant digits of that number, and that is multiplied by the base, 10, raised to the power of scale to give the actual value of the number.
    pub mantissa: i128,
    /// 	The number of decimal places to move to the left to yield the actual value.
    pub scale: u32,
}

impl SwitchboardDecimal {
    pub fn new(mantissa: i128, scale: u32) -> SwitchboardDecimal {
        Self { mantissa, scale }
    }
    pub fn from_rust_decimal(d: Decimal) -> SwitchboardDecimal {
        Self::new(d.mantissa(), d.scale())
    }
    pub fn from_f64(v: f64) -> SwitchboardDecimal {
        let dec = Decimal::from_f64(v).unwrap();
        Self::from_rust_decimal(dec)
    }
}
impl TryInto<Decimal> for &SwitchboardDecimal {
    type Error = SwitchboardError;
    fn try_into(self) -> Result<Decimal, SwitchboardError> {
        Decimal::try_from_i128_with_scale(self.mantissa, self.scale)
            .map_err(|_| SwitchboardError::DecimalConversionError)
    }
}

impl TryInto<Decimal> for SwitchboardDecimal {
    type Error = SwitchboardError;
    fn try_into(self) -> Result<Decimal, SwitchboardError> {
        Decimal::try_from_i128_with_scale(self.mantissa, self.scale)
            .map_err(|_| SwitchboardError::DecimalConversionError)
    }
}

impl Ord for SwitchboardDecimal {
    fn cmp(&self, other: &Self) -> Ordering {
        let s: Decimal = self.try_into().unwrap();
        let other: Decimal = other.try_into().unwrap();
        s.cmp(&other)
    }
}

impl PartialOrd for SwitchboardDecimal {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        let s: Decimal = self.try_into().unwrap();
        let other: Decimal = other.try_into().unwrap();
        s.partial_cmp(&other)
    }
    fn lt(&self, other: &Self) -> bool {
        let s: Decimal = self.try_into().unwrap();
        let other: Decimal = other.try_into().unwrap();
        s < other
    }
    fn le(&self, other: &Self) -> bool {
        let s: Decimal = self.try_into().unwrap();
        let other: Decimal = other.try_into().unwrap();
        s <= other
    }
    fn gt(&self, other: &Self) -> bool {
        let s: Decimal = self.try_into().unwrap();
        let other: Decimal = other.try_into().unwrap();
        s > other
    }
    fn ge(&self, other: &Self) -> bool {
        let s: Decimal = self.try_into().unwrap();
        let other: Decimal = other.try_into().unwrap();
        s >= other
    }
}

impl From<SwitchboardDecimal> for bool {
    fn from(s: SwitchboardDecimal) -> Self {
        let dec: Decimal = (&s).try_into().unwrap();
        dec.round().mantissa() != 0
    }
}

impl TryInto<u64> for SwitchboardDecimal {
    type Error = SwitchboardError;
    fn try_into(self) -> Result<u64, SwitchboardError> {
        let dec: Decimal = (&self).try_into().unwrap();
        dec.to_u64().ok_or(SwitchboardError::IntegerOverflowError)
    }
}

impl TryInto<i64> for SwitchboardDecimal {
    type Error = SwitchboardError;
    fn try_into(self) -> Result<i64, SwitchboardError> {
        let dec: Decimal = (&self).try_into().unwrap();
        dec.to_i64().ok_or(SwitchboardError::IntegerOverflowError)
    }
}

impl TryInto<f64> for SwitchboardDecimal {
    type Error = SwitchboardError;
    fn try_into(self) -> Result<f64, SwitchboardError> {
        let dec: Decimal = (&self).try_into().unwrap();
        dec.to_f64().ok_or(SwitchboardError::IntegerOverflowError)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn switchboard_decimal_into_rust_decimal() {
        let swb_decimal = &SwitchboardDecimal {
            mantissa: 12345,
            scale: 2,
        };
        let decimal: Decimal = swb_decimal.try_into().unwrap();
        assert_eq!(decimal.mantissa(), 12345);
        assert_eq!(decimal.scale(), 2);
    }

    #[test]
    fn empty_switchboard_decimal_is_false() {
        let swb_decimal = SwitchboardDecimal {
            mantissa: 0,
            scale: 0,
        };
        let b: bool = swb_decimal.into();
        assert_eq!(b, false);
        let swb_decimal_neg = SwitchboardDecimal {
            mantissa: -0,
            scale: 0,
        };
        let b: bool = swb_decimal_neg.into();
        assert_eq!(b, false);
    }

    #[test]
    fn switchboard_decimal_to_u64() {
        // 1234.5678
        let swb_decimal = SwitchboardDecimal {
            mantissa: 12345678,
            scale: 4,
        };
        let b: u64 = swb_decimal.try_into().unwrap();
        assert_eq!(b, 1234);
    }

    #[test]
    fn switchboard_decimal_to_f64() {
        // 1234.5678
        let swb_decimal = SwitchboardDecimal {
            mantissa: 12345678,
            scale: 4,
        };
        let b: f64 = swb_decimal.try_into().unwrap();
        assert_eq!(b, 1234.5678);

        let swb_f64 = SwitchboardDecimal::from_f64(1234.5678);
        assert_eq!(swb_decimal, swb_f64);
    }
}
