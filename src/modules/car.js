/**
 * @description car class with two fields: registrationNumber and color which are both implemented as private variables
 * @assumption the registration number for every car will be unique
 */

class Car {
	constructor (regNumber, carColor) {
		const registrationNumber = regNumber;
		const color = carColor;
		this.getCarDetails = function () {
			return { color, registrationNumber };
		};

		this.getCarColor = function () {
			return color;
		};

		this.getCarRegistrationNumber = function () {
			return registrationNumber;
		};
	}
}

module.exports = Car;
