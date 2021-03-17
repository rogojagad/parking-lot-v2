const { ParkingLotException } = require("./exception/ParkingLotException");

class ParkingLot {
  constructor(size) {
    this.slots = Array(size).fill(null);
    this.emptySlotsIndexes = new Array();
    this.registrationNumberToSlotMap = new Map();

    this.slots.forEach((_, idx) => {
      this.emptySlotsIndexes.push(idx);
    });
  }

  getAvailableSlot() {
    const emptySlotsCount = this.emptySlotsIndexes.length;
    return emptySlotsCount ? this.emptySlotsIndexes[0] : null;
  }

  parkCar(car) {
    const registrationNumber = car.registrationNumber;

    if (this.registrationNumberToSlotMap.has(registrationNumber)) {
      throw new ParkingLotException(
        `Car with registration number ${registrationNumber} already exists`
      );
    }

    const targetIndex = this.getAvailableSlot();

    if (targetIndex === null) {
      throw new ParkingLotException("Sorry, parking lot is full");
    }

    this.emptySlotsIndexes.shift();
    this.slots[targetIndex] = car;
    this.updateRegistrationNumberToSlotMap(car.registrationNumber, targetIndex);

    return targetIndex + 1;
  }

  leaveSlot(registrationNumber) {
    const slotNumber = this.registrationNumberToSlotMap.get(registrationNumber);

    if (slotNumber === undefined) {
      throw new ParkingLotException(
        `Registration number ${registrationNumber} not found`
      );
    }

    this.updateRegistrationNumberToSlotMap(registrationNumber, null);
    this.emptySlotsIndexes.push(slotNumber);
    this.emptySlotsIndexes.sort();
    return slotNumber + 1;
  }

  updateRegistrationNumberToSlotMap(registrationNumber, slotNumber) {
    if (slotNumber !== null) {
      this.registrationNumberToSlotMap.set(registrationNumber, slotNumber);
    } else {
      this.registrationNumberToSlotMap.delete(registrationNumber);
    }
  }
}

module.exports = { ParkingLot };
