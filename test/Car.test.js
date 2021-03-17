const { Car } = require("./../src/Car.js");

describe("Car Class", () => {
  test("should be instantiated with proper parameters", () => {
    const registrationNumber = "AB 123";
    const car = new Car(registrationNumber);

    expect(car.registrationNumber).toEqual(registrationNumber);
  });
});
