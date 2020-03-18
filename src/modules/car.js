class Car {
	constructor(regNumber, carColor) {
		const registrationNumber = regNumber;
		const color = carColor;
		this.getCarDetails = function() {
			return { color, registrationNumber };
		}

		this.getCarColor = function(){
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

module.exports = Car;