const { ParkingLot } = require("./ParkingLot");
const { ParkingLotException } = require("./exception/ParkingLotException");

class ParkingFloors {
  constructor(floorCount, parkingLotSize) {
    this.floors = Array(floorCount).fill(new ParkingLot(parkingLotSize));
    this.registrationNumberMap = new Map();
  }

  getFirstAvailableSlot() {
    let floorNumber = null;
    let slotNumber = null;
    let idx = 0;
    let isSlotAvailable = false;

    for (let floor of this.floors) {
      const availableSlotNumber = floor.getAvailableSlot();
      if (availableSlotNumber !== null) {
        floorNumber = idx;
        slotNumber = availableSlotNumber;
        isSlotAvailable = true;
        break;
      }

      idx++;
    }

    if (!isSlotAvailable) {
      throw new ParkingLotException("Sorry, parking lot is full");
    }

    return { floorNumber, slotNumber };
  }

  parkCar(car) {
    const slotInfo = this.getFirstAvailableSlot();
    const { floorNumber } = slotInfo;
    const parkingLot = this.floors[floorNumber];

    parkingLot.parkCar(car);
    this.registerCar(car, slotInfo);

    return slotInfo;
  }

  leaveSlot(registrationNumber) {
    const slotInfo = this.registrationNumberMap.get(registrationNumber);
    const { floorNumber } = slotInfo;
    const parkingLot = this.floors[floorNumber];
    parkingLot.leaveSlot(registrationNumber);
    this.unregisterCar(registrationNumber);

    return slotInfo;
  }

  registerCar(car, slotInfo) {
    const { registrationNumber } = car;

    if (this.registrationNumberMap.has(registrationNumber)) {
      throw new ParkingLotException(
        `Car with registration number ${registrationNumber} already exists`
      );
    }

    this.registrationNumberMap.set(registrationNumber, slotInfo);
  }

  unregisterCar(registrationNumber) {
    if (!this.registrationNumberMap.has(registrationNumber)) {
      throw new ParkingLotException(
        `Registration number ${registrationNumber} not found`
      );
    }

    this.registrationNumberMap.delete(registrationNumber);
  }
}

module.exports = { ParkingFloors };
