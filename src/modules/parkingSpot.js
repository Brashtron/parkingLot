class ParkingSpot {
	constructor(car, position) {
		this.car = car;
		this.position = position;
	}

	setCar(car){
		this.car = car;
	}
}

module.exports = { ParkingSpot };