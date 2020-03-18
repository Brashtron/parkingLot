class Car {
	constructor(registrationNumber, color) {
		// const registrationNumber = regNumber;
		// const color = carColor;
		this.getCarDetails = function() {
			return { color, registrationNumber };
		}

		this.getCarColor = function(){
			console.log(this.color);
			return color;
		}

		this.getCarRegistrationNumber = function() {
			return registrationNumber;
		}
	}

	isCarEqual(car) {
		if(car && this.getCarRegistrationNumber() === car.getCarRegistrationNumber()) {
			return true;
		}

		return false;
	}
}

module.exports = { Car };