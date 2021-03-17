const {
  QUERY_CREATE_PARKING_LOT,
  QUERY_LEAVE,
  QUERY_PARK,
  QUERY_STATUS,
} = require("./../src/constants");
const { Car } = require("./../src/Car");
const { ParkingController } = require("./../src/ParkingController.js");
const { ParkingLot } = require("./../src/ParkingLot");
const {
  ParkingLotException,
} = require("./../src/exception/ParkingLotException");
const { RateCalculator } = require("./../src/RateCalculator");

jest.mock("./../src/Car");
jest.mock("./../src/ParkingLot");
jest.mock("./../src/RateCalculator");

beforeEach(() => {
  Car.mockClear();
  ParkingLot.mockClear();
  RateCalculator.mockClear();
});

describe("ParkingController class", () => {
  let parkingController;

  beforeEach(() => {
    parkingController = new ParkingController();
  });

  describe("on constructed", () => {
    test("should have attribute with appropriate value", () => {
      expect(parkingController.rateCalculator).toBeInstanceOf(RateCalculator);
      expect(parkingController.parkingLot).toEqual(undefined);
    });
  });

  describe("on query create parking lot", () => {
    const parkingLotSize = 4;
    const queryInput = `${QUERY_CREATE_PARKING_LOT} ${parkingLotSize}`;

    test("should instantiate parking lot with given size", () => {
      parkingController.run(queryInput);
      expect(ParkingLot).toHaveBeenCalledTimes(1);
      expect(ParkingLot).toHaveBeenCalledWith(parkingLotSize);
    });
  });

  describe("on query park, leave or status before create ParkingLot", () => {
    describe("on query park error", () => {
      const registrationNumber = 4;
      const queryInput = `${QUERY_PARK} ${registrationNumber}`;

      test("should throw exception", () => {
        try {
          parkingController.run(queryInput);
        } catch (error) {
          expect(error).toBeInstanceOf(ParkingLotException);
          expect(error.message).toEqual("Parking Lot not yet instantiated");
        }
      });
    });
  });

  describe("on query park, leave and status", () => {
    beforeEach(() => {
      parkingController.createParkingLot([QUERY_CREATE_PARKING_LOT, 1]);
    });

    describe("on query park", () => {
      const registrationNumber = "ABC-234";
      const queryInput = `${QUERY_PARK} ${registrationNumber}`;
      test("should park a car", () => {
        const parkCarFunction = parkingController.parkingLot.parkCar;
        parkCarFunction.mockReturnValue(0);

        parkingController.run(queryInput);

        expect(Car).toHaveBeenCalledTimes(1);
        expect(Car).toHaveBeenCalledWith(registrationNumber);

        expect(parkCarFunction).toHaveBeenCalledTimes(1);
      });
    });

    describe("on query leave", () => {
      const registrationNumber = "ABC-234";
      const hourSpend = "1";
      const queryInput = `${QUERY_LEAVE} ${registrationNumber} ${hourSpend}`;

      test("should remove a car from Parking Lot", () => {
        const calculateTotalRateFunction =
          parkingController.rateCalculator.calculateTotalRate;
        calculateTotalRateFunction.mockReturnValue(0);

        const leaveSlotFunction = parkingController.parkingLot.leaveSlot;
        leaveSlotFunction.mockReturnValue(0);

        parkingController.run(queryInput);

        expect(leaveSlotFunction).toHaveBeenCalledTimes(1);
        expect(leaveSlotFunction).toHaveBeenCalledWith(registrationNumber);

        expect(calculateTotalRateFunction).toHaveBeenCalledTimes(1);
        expect(calculateTotalRateFunction).toHaveBeenCalledWith(hourSpend);
      });
    });

    describe("on query status", () => {
      const registrationNumber = "ABC-123";
      const queryInput = `${QUERY_STATUS}`;

      test("should print Parking Lot status", () => {
        const parkingLot = parkingController.parkingLot;
        const registrationNumberSlotNumberMapMock = new Map();
        registrationNumberSlotNumberMapMock.set(registrationNumber, 0);
        parkingLot.registrationNumberToSlotMap = registrationNumberSlotNumberMapMock;

        parkingController.run(queryInput);
      });
    });
  });
});
