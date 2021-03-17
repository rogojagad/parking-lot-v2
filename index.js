const fs = require("fs");
const { ParkingController } = require("./src/ParkingController");

const testcaseFilename = process.argv[2];
let pathToTestcaseFile = process.argv[3] + "/" + testcaseFilename;

const fileContent = fs
  .readFileSync(pathToTestcaseFile, {
    encoding: "utf8",
    flag: "r",
  })
  .split(/\r?\n/);

const parkingController = new ParkingController();

fileContent.forEach((input) => {
  try {
    parkingController.run(input);
  } catch (error) {
    console.log(error.message);
  }
});
