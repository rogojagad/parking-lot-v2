const { Car } = require("../src/Car");
const { ParkingLotException } = require("../src/exception/ParkingLotException");
const { ParkingFloors } = require("../src/ParkingFloors");

describe("ParkingFloor class", () => {
  const floorCount = 5;
  const parkingLotSize = 5;

  describe("on constructed", () => {
    test("should create parking floor with appropriate floor count and lot size", () => {
      const parkingFloors = new ParkingFloors(floorCount, parkingLotSize);
      const floors = parkingFloors.floors;

      expect(floors.length).toEqual(floorCount);

      floors.forEach((floor) => {
        expect(floor.slots.length).toEqual(parkingLotSize);
      });
    });
  });

  describe("on get first available slot", () => {
    describe("on slot available", () => {
      test("should return available slot info object with proper value", () => {
        const parkingFloors = new ParkingFloors(floorCount, parkingLotSize);
        const slotInfo = parkingFloors.getFirstAvailableSlot();

        expect(slotInfo.floorNumber).toEqual(0);
        expect(slotInfo.slotNumber).toEqual(0);
      });
    });

    describe("on slot unavailable", () => {
      test("should throw ParkingLotException", () => {
        const parkingFloors = new ParkingFloors(1, 1);
        parkingFloors.floors[0].emptySlotsIndexes.shift();

        try {
          parkingFloors.getFirstAvailableSlot();
        } catch (error) {
          expect(error).toBeInstanceOf(ParkingLotException);
        }
      });
    });
  });

  describe("on register car", () => {
    describe("if car not already exists", () => {
      test("should register car slot info by key", () => {
        const parkingFloors = new ParkingFloors(1, 1);
        const car = new Car("ABC-123");
        const slotInfo = { floorNumber: 0, slotNumber: 0 };

        parkingFloors.registerCar(car, slotInfo);

        expect(parkingFloors.registrationNumberMap.get("ABC-123")).toEqual(
          slotInfo
        );
      });
    });

    describe("if car already exists", () => {
      test("should throw ParkingLotException", () => {
        const parkingFloors = new ParkingFloors(1, 1);
        const car = new Car("ABC-123");
        const slotInfo = { floorNumber: 0, slotNumber: 0 };

        parkingFloors.registrationNumberMap.set("ABC-123", slotInfo);

        try {
          parkingFloors.registerCar(car, slotInfo);
        } catch (error) {
          expect(error).toBeInstanceOf(ParkingLotException);
        }
      });
    });
  });

  describe("on uregister car", () => {
    describe("if car exists", () => {
      test("should unregister car slot info by key", () => {
        const parkingFloors = new ParkingFloors(1, 1);
        const registrationNumber = "ABC-123";
        const slotInfo = { floorNumber: 0, slotNumber: 0 };
        parkingFloors.registrationNumberMap.set("ABC-123", slotInfo);

        parkingFloors.unregisterCar(registrationNumber);

        expect(parkingFloors.registrationNumberMap.get("ABC-123")).toEqual(
          undefined
        );
      });
    });

    describe("if car not exists", () => {
      test("should throw ParkingLotException", () => {
        const parkingFloors = new ParkingFloors(1, 1);
        const car = new Car("ABC-123");

        try {
          parkingFloors.unregisterCar(car);
        } catch (error) {
          expect(error).toBeInstanceOf(ParkingLotException);
        }
      });
    });
  });

  describe("on park a car", () => {
    const parkingFloors = new ParkingFloors(1, 3);
    const slotInfo = { floorNumber: 0, slotNumber: 0 };

    parkingFloors.getFirstAvailableSlot = function () {
      return slotInfo;
    };
    parkingFloors.floors[0].parkCar = function () {
      return 0;
    };
    parkingFloors.registerCar = function (car, slotInfo) {
      return undefined;
    };

    test("it should return the slot info for the parked car", () => {
      const registrationNumber = "ABC-123";
      const resultSlotInfo = parkingFloors.parkCar(new Car(registrationNumber));

      expect(resultSlotInfo).toEqual(slotInfo);
    });
  });

  describe("on car leave", () => {
    const registrationNumber = "ABC-123";
    const parkingFloors = new ParkingFloors(1, 3);
    const slotInfo = { floorNumber: 0, slotNumber: 0 };
    parkingFloors.registrationNumberMap.set(registrationNumber, slotInfo);

    parkingFloors.floors[0].leaveSlot = function () {
      return 1;
    };
    parkingFloors.unregisterCar = function (car, slotInfo) {
      return undefined;
    };

    test("it should return the slot info for the parked car", () => {
      const resultSlotInfo = parkingFloors.leaveSlot(registrationNumber);

      expect(resultSlotInfo).toEqual(slotInfo);
    });
  });
});
