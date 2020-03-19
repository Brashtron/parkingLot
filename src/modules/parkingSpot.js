/**
 * @description a basic class representing a parking spot with three fields: car, postion and isOccupied
 * a setter and getter for fetching car details as isOccupied property is dependent on car property
 */
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
