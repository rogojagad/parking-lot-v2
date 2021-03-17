const { Car } = require("./../src/Car");
const { ParkingLot } = require("./../src/ParkingLot.js");
const {
  ParkingLotException,
} = require("./../src/exception/ParkingLotException");

describe("ParkingLot Class", () => {
  const slotCount = 5;
  const parkingLot = new ParkingLot(slotCount);
  describe("on constructed", () => {
    test("should create parking slot with appropriate size", () => {
      expect(parkingLot.slots.length).toEqual(slotCount);
      expect(parkingLot.emptySlotsIndexes.length).toEqual(slotCount);
    });
  });

  describe("check slot availability", () => {
    describe("on slot available", () => {
      test("should return available slot index", () => {
        expect(parkingLot.getAvailableSlot()).toEqual(0);
      });
    });

    describe("on slot unavailable", () => {
      const parkingLot = new ParkingLot(1);
      beforeAll(() => {
        parkingLot.parkCar(new Car("ABC 123"));
      });
      test("should return null", () => {
        expect(parkingLot.getAvailableSlot()).toBeNull();
      });
    });
  });

  describe("update registration number to slot number map", () => {
    const registrationNumber = "ABC 123";
    const slotNumber = 0;
    describe("on park a car", () => {
      test("should add new entry on map and return assigned slot number", () => {
        parkingLot.updateRegistrationNumberToSlotMap(registrationNumber, 0);

        expect(
          parkingLot.registrationNumberToSlotMap.get(registrationNumber)
        ).toEqual(slotNumber);
      });
    });

    describe("on car leave", () => {
      test("should remove entry from map and return undefined", () => {
        parkingLot.updateRegistrationNumberToSlotMap(registrationNumber, null);

        expect(
          parkingLot.registrationNumberToSlotMap.get(registrationNumber)
        ).toEqual(undefined);
      });
    });
  });

  describe("car leave a slot", () => {
    const registrationNumber = "ABC 123";
    describe("if given valid registration number", () => {
      test("should return slot number", () => {
        parkingLot.parkCar(new Car(registrationNumber));
        const slotNumber = parkingLot.leaveSlot(registrationNumber);
        expect(slotNumber).toEqual(1);
      });
    });

    describe("if a car did not park on that slot", () => {
      test("should throw exception with invalid registration number message", () => {
        try {
          parkingLot.leaveSlot("XXX");
        } catch (error) {
          expect(error).toBeInstanceOf(ParkingLotException);
          expect(error.message).toEqual(`Registration number XXX not found`);
        }
      });
    });
  });

  describe("park a car", () => {
    const registrationNumber = "ABC 123";
    const car = new Car(registrationNumber);

    describe("on car already exists", () => {
      test("should throw exception with car already exists message", () => {
        parkingLot.parkCar(car);

        try {
          parkingLot.parkCar(car);
        } catch (error) {
          expect(error).toBeInstanceOf(ParkingLotException);
          expect(error.message).toEqual(
            `Car with registration number ${registrationNumber} already exists`
          );
        }
      });
    });

    describe("on parking lot full", () => {
      const car2 = new Car("ABC 234");
      const parkingLot = new ParkingLot(1);

      test("should throw exception with parking lot full message", () => {
        parkingLot.parkCar(car);

        try {
          parkingLot.parkCar(car2);
        } catch (error) {
          expect(error).toBeInstanceOf(ParkingLotException);
          expect(error.message).toEqual("Sorry, parking lot is full");
        }
      });
    });

    describe("on parking success", () => {
      const parkingLot = new ParkingLot(1);

      test("should return assigned slot index", () => {
        const slotIndex = parkingLot.parkCar(car);

        expect(slotIndex).toEqual(1);
      });
    });
  });
});
