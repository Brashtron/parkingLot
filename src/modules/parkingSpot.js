class ParkingSpot {
	constructor (position) {
		this.car = null;
		this.position = position;
		this.isOccupied = false;
	}

	setCar (car) {
		this.car = car;
		this.isOccupied = car ? true : false;
	}

	getCar (car) {
		return this.car;
	}
}

module.exports = ParkingSpot;
