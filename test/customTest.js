const chai = require('chai')
const expect = chai.expect;
const fs = require('fs');
const ParkingLot = require('../src/modules/parkingLot.js');
let os = process.platform;

if (os === 'darwin') {
	os = 'MacOS';
}
else if (os === 'win32' || os === 'win64') {
	os = 'Windows';
}
else if (os === 'linux') {
	os = 'Linux';
}

let commands = [];
const parkingLot = new ParkingLot();

let splitter = '\n';

if (os === 'Windows') {
	splitter = '\r\n';
}

describe('Testing file reading and command validation', () => {
	it('reading iput file', done => {
		fs.readFile('./data/input.txt', 'utf-8', (err, data) => {
			if (err) {
				throw 'Error in reading input test file';
			}

			commands = JSON.parse(JSON.stringify(data)).split(splitter);
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
		const result = parkingLot.status(commands[8]);
		expect(result[0]).to.equal("1         KA-01-HH-1234    White");
		expect(result[1]).to.equal("2         KA-01-HH-9999    White");
		expect(result[2]).to.equal("3         KA-01-BB-0001    Black");
		expect(result[3]).to.equal("5         KA-01-HH-2701    Blue");
		expect(result[4]).to.equal("6         KA-01-HH-3141    Black");
		expect(result.length).to.equal(5, "retreived status of the parking lot");
		done();
  	});

	it('Allocating Parking to User 7. Should Reallocate the nearest empty postion 4', function(done) {
		const result = parkingLot.park(commands[9]);
		expect(result).to.equal(4, "car 7 parked");
		done();
	});

	it('Allocating Parking to User 8. Should indicate Parking is full.', function (done) {
		try {
			const result = parkingLot.park(commands[10]);
		}
		catch (err) {
			expect(err.message).to.equal("Sorry, parking lot is full", "car 8 cannot be parked due to full parking");
		}
		done();
	});

	it('Registration number of cars with white color', function (done) {
		let result = parkingLot.getCarsWithSameColor(commands[11]);
		result = result.split(', ');
		expect(result.includes('KA-01-HH-1234')).to.equal(true);
		expect(result.includes('KA-01-HH-9999')).to.equal(true);
		expect(result.includes('KA-01-P-333')).to.equal(true);
		expect(result.length).to.equal(3);
		done();
  	});

	it('Slot numbers for cars with white color', function (done) {
		let result = parkingLot.getSlotsWithSameColor(commands[12]);
		result = result.split(', ').map(Number);
		expect(result.includes(1)).to.equal(true);
		expect(result.includes(2)).to.equal(true);
		expect(result.includes(4)).to.equal(true);
		expect(result.length).to.equal(3);
		done();
	});

	it('Slot number for registration no. KA-01-HH-3141', function (done) {
		const result = parkingLot.getSlotByCarNumber(commands[13]);
		expect(result).to.equal(6);
		done();
	});

	it('Slot number for registration number MH-04-AY-1111', function (done) {
		const result = parkingLot.getSlotByCarNumber(commands[14]);
		expect(result).to.equal(null);
		done();
	});
});
