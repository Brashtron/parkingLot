const chai = require('chai')
const expect = chai.expect;
const fs = require('fs');
const Parkinglot = require('../src/modules/parkingLot.js');

let commands = [];
let parkingLot = new Parkinglot();

describe('Testing file reading and command validation', () => {
	it('reading iput file', done => {
		fs.readFile('../data/input.txt', 'utf-8', (err, data) => {
			if (err) {
				throw 'Error in reading input test file';
			}

			commands = JSON.parse(JSON.stringify(data)).split('\n');
			done();
		});
	});
	it('command validation', done => {
		expect(commands[0].split(' ')[0]).to.equal('create_parking_lot');
		expect(commands[1].split(' ')[0]).to.equal('park');
		expect(commands[7].split(' ')[0]).to.equal('leave');
		expect(commands[8].split(' ')[0]).to.equal('status');
		done();
	});
});

describe('testing functionality', () => {
	it('create a parking lot', done => {
		const result = parkingLot.createParkingLot(commands[0]);
		expect(result).to.equal(6);
		done();
	});

	it('parking user 1', done => {
		const result = parkingLot.park(commands[1]);
		expect(result).to.equal(1, "car 1 parked");
		done();
	});

	it('parking user 2', done => {
		const result = parkingLot.park(commands[2]);
		expect(result).to.equal(2, "car 2 parked");
		done();
	});

	it('parking user 3', done => {
		const result = parkingLot.park(commands[3]);
		expect(result).to.equal(3, "car 3 parked");
		done();
	});

	it('parking user 4', done => {
		const result = parkingLot.park(commands[4]);
		expect(result).to.equal(4, "car 4 parked");
		done();
	});

	it('parking user 5', done => {
		const result = parkingLot.park(commands[5]);
		expect(result).to.equal(5, "car 5 parked");
		done();
	});

	it('parking user 6', done => {
		const result = parkingLot.park(commands[6]);
		expect(result).to.equal(6, "car 6 parked");
		done();
	});

	it('car leaving from spot 4', done => {
		const result = parkingLot.leave(commands[7]);
		expect(result).to.equal(4, "car 4 left");
		done();
  	});
	
	it('Checking status of parking lot', function (done) {
      const result = parkingLot.getParkingStatus(commands[8]);
      expect(result.length).to.equal(6, "retreived status of the parking lot");
      done();
  	});

	it('Allocating Parking to User 7. Should Reallocate the nearest empty postion 4', function(done) {
        const result = parkingLot.park(commands[9]);
        expect(result).to.equal(4, "car 7 parked");
        expect(result).to.not,equal(7, "car 7 parked wrongly");
        done();
	});

	it('Allocating Parking to User 8. Should indicate Parking is full.', function (done) {
      try {
        const result = parkingLot.parkCar(commands[10]);
      }
      catch (err) {
     	 expect(err).to.equal("parking full", "car 8 cannot be parked");
      }
      done();
	});

	it('Registration number of cars with white color', function (done) {
      let result = parkingLot.getCarsWithSameColor(commands[11]);
      result = result.split(', ');
      expect(result[0]).to.equal('KA-01-HH-1234');
      expect(result[1]).to.equal('KA-01-HH-9999');
      expect(result[2]).to.equal('KA-01-P-333');
      done();
  	});

	it('Slot numbers for cars with white color', function (done) {
		let result = parkingLot.getSlotsWithSameColorCar(commands[12]);
		result = result.split(',').map(Number);
		expect(result[0]).to.equal(1);
    	expect(result[1]).to.equal(2);
    	expect(result[2]).to.equal(4);
		done();
	});

	it('Slot number for registration no. KA-01-HH-3141', function (done) {
		const result = parkingLot.getSlotByCarNumber(commands[13]);
		expect(result).to.equal(6);
		done();
	});

	it('Slot number for registration number MH-04-AY-1111', function (done) {
		const result = parkingLot.getSlotByCarNumber(commands[14]);
		expect(result[1]).to.equal('Not Found');
		done();
	});
});
