class ParkingLotException extends Error {
  constructor(message) {
    super(message);
    this.name = "ParkingLotException";
  }
}

module.exports = { ParkingLotException };
