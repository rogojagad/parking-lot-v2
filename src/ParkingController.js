const {
  QUERY_CREATE_PARKING_LOT,
  QUERY_LEAVE,
  QUERY_PARK,
  QUERY_STATUS,
} = require("./constants");
const { Car } = require("./Car");
const { ParkingLot } = require("./ParkingLot");
const { ParkingLotException } = require("./exception/ParkingLotException");
const { RateCalculator } = require("./RateCalculator");

class ParkingController {
  constructor() {
    this.rateCalculator = new RateCalculator();
    this.parkingLot;
  }

  run(inputString) {
    const inputInArray = inputString.split(" ");
    const query = inputInArray[0];

    if (query === QUERY_CREATE_PARKING_LOT) {
      this.createParkingLot(inputInArray);
    } else if (query === QUERY_PARK) {
      this.park(inputInArray);
    } else if (query === QUERY_LEAVE) {
      this.leave(inputInArray);
    } else if (query === QUERY_STATUS) {
      this.getStatus();
    }
  }

  createParkingLot(inputInArray) {
    const size = inputInArray[1];
    this.parkingLot = new ParkingLot(parseInt(size));

    console.log(`Created parking lot with ${size} slots`);
  }

  park(inputInArray) {
    this.checkParkingLotInstantiatedOrFail();
    const registrationNumber = inputInArray[1];
    const car = new Car(registrationNumber);
    const slotNumber = this.parkingLot.parkCar(car);

    console.log(`Allocated slot number: ${slotNumber}`);
  }

  getStatus() {
    console.log(`Slot No.  Registration No.`);
    const sortedSlotMap = new Map(
      [...this.parkingLot.registrationNumberToSlotMap.entries()].sort(
        (a, b) => a[1] - b[1]
      )
    );

    sortedSlotMap.forEach(this.printParkingLotData);
  }

  leave(inputInArray) {
    this.checkParkingLotInstantiatedOrFail();

    const registrationNumber = inputInArray[1];
    const hourSpend = inputInArray[2];
    const slotNumber = this.parkingLot.leaveSlot(registrationNumber);
    const rate = this.rateCalculator.calculateTotalRate(hourSpend);

    console.log(
      `Registration number ${registrationNumber} with Slot Number ${slotNumber} is free with Charge ${rate}`
    );
  }

  checkParkingLotInstantiatedOrFail() {
    if (!this.parkingLot) {
      throw new ParkingLotException("Parking Lot not yet instantiated");
    }
  }

  printParkingLotData(value, key, _) {
    console.log(`${value + 1}         ${key}`);
  }
}

module.exports = { ParkingController };
