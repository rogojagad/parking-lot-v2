const {
  BASE_RATE_VALUE,
  MAX_HOUR_SPEND_FOR_BASE_RATE,
} = require("./constants");

class RateCalculator {
  calculateTotalRate(hourSpend) {
    const hourDifference = hourSpend - MAX_HOUR_SPEND_FOR_BASE_RATE;
    if (hourDifference <= 1) {
      return BASE_RATE_VALUE;
    }

    return BASE_RATE_VALUE + hourDifference * BASE_RATE_VALUE;
  }
}

module.exports = { RateCalculator };
