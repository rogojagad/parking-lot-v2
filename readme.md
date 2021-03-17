# Parking Lot 2.0.0 Solution

Created by Rogo Jagad Alit for Bank Jago Software Engineer take home test

## Directory Structure

```
.
├── bin
│   ├── parking_lot
│   ├── run_functional_tests
│   └── setup
│   └── file_inputs.txt
├── functional_spec
│   ├── fixtures
│   │   └── file_input.txt
│   ├── Gemfile
│   ├── Gemfile.lock
│   ├── Rakefile
│   ├── README.md
│   └── spec
│       ├── end_to_end_spec.rb
│       ├── parking_lot_spec.rb
│       └── spec_helper.rb
├── src
│   ├── exception
│   │   └── ParkingLotException.js
│   ├── Car.js
│   ├── constants.js
│   ├── ParkingController.js
│   ├── ParkingLot.js
│   └── RateCalculator.js
├── readme.md
├── index.js
└── test
    ├── Car.test.js
    ├── ParkingController.test.js
    ├── ParkingLot.test.js
    ├── RateCalculator.test.js
```

## About

The solution source code is using Javascript and Jest library for unit testing.

All the solution code implementation is on `src` directory.

The entrypoint to run this solution is on `index.js`.

To run this solution:

- Run `bin/setup`, it will run `npm ci` under the hood to install required dependency
- Run `bin/parking_lot` to run the solution using `bin/file_inputs.txt` as input source

## Class

- **Car**: To represent the car parked in the Parking Lot. This class store the registration number of the car
- **ParkingLot**: To represent the Parking Lot area on which the Car is parked. This class implements the logic required for a car to park or leave certain slot.
- **RateCalculator**: To represent the calculation system to calculate the parking rate applied for a car based on its hours spend on the ParkingLot.
- **ParkingController**: To act as a controller for the whole parking system. This class read user's query then call appropriate function to serve the query by calling appropriate function on certain class.

## Problem Statement

I own a parking lot that can hold up to 'n' cars at any given point in time. Each slot is
given a number starting at 1 increasing with increasing distance from the entry point
in steps of one. I want to create an automated ticketing system that allows my
customers to use my parking lot without human intervention.

When a car enters my parking lot, I want to have a ticket issued to the driver. The
ticket issuing process includes us documenting the registration number (number
plate) and the colour of the car and allocating an available parking slot to the car
before actually handing over a ticket to the driver (we assume that our customers are
nice enough to always park in the slots allocated to them). The customer should be
allocated a parking slot which is nearest to the entry. At the exit the customer returns
the ticket with the time the car was parked in the lot, which then marks the slot they
were using as being available. Total parking charge should be calculated as per the
parking time. Charge applicable is $10 for first 2 hours and $10 for every additional
hour.

We interact with the system via a simple set of commands which produce a specific
output. Please take a look at the example below, which includes all the commands
you need to support - they're self explanatory. The system should accept a filename
as a parameter at the command prompt and read the commands from that file.
