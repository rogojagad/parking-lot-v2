const { RateCalculator } = require("./../src/RateCalculator");
const { BASE_RATE_VALUE } = require("./../src/constants");

describe("RateCalculator Class", () => {
  const rateCalculator = new RateCalculator();

  test("should return base rate if less than 2 hours", () => {
    const rate = rateCalculator.calculateTotalRate(1);
    expect(rate).toEqual(BASE_RATE_VALUE);
  });

  test("should return base rate if equal to 2 hours", () => {
    const rate = rateCalculator.calculateTotalRate(2);
    expect(rate).toEqual(BASE_RATE_VALUE);
  });

  test("should appropriate rate based on hour spend", () => {
    const rate = rateCalculator.calculateTotalRate(5);
    expect(rate).toEqual(40);
  });
});
