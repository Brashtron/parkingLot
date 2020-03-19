const DoublyNode = require('../utils/doublyLinkedListNode');
const Car = require('../modules/car');
const ParkingSpot = require('../modules/parkingSpot');
const MinHeap = require('../utils/minHeap');

/**
 * @description a class for representing a parking lot
 */

class ParkingLot {
	constructor () {
		this.MAX_PARKING_SLOTS = 0;
		this.parkingSpots = [];
		this.parkingColorNodes = [];
		this.minHeap = null;
		this.colorInfoMap = null;
		this.carInfoMap = null;
	}

	/**
	 * @param {String} receives user's input via terminal
	 * @description creates a parking lot with given maximum slot numbers.
	 * It throws an error if zero or negative input is provided
	 */

	createParkingLot (input) {
		this.MAX_PARKING_SLOTS = parseInt(input.split(' ')[1]);
		if (this.MAX_PARKING_SLOTS < 1)
			throw new Error('Minimum one slot is required to create parking slot');

		this.minHeap = new MinHeap();
		this.colorInfoMap = new Map();
		this.carInfoMap = new Map();
		for (let i = 0; i < this.MAX_PARKING_SLOTS; i++) {
			this.parkingSpots[i] = new ParkingSpot(i);
			this.parkingColorNodes[i] = new DoublyNode(i);
			this.minHeap.insert(i, i);
		}
		return this.MAX_PARKING_SLOTS;
	}

	/**
	 * @param {String} receives user's input via terminal
	 * @description allocates nearest slot number to incoming car.
	 * It throws and error if parking lot is not created.
	 * It throws an error if parking lot is full.
	 * It throws and error if the car is already parked.
	 * It also throws an error if only one field (either registration number or color) is provided.
	 */

	park (input) {
		if (this.MAX_PARKING_SLOTS < 1)
			throw new Error('Please, create a parking lot');

		if (this.minHeap.isEmpty())
			throw new Error('Sorry, parking lot is full');

		let carNumber = input.split(' ')[1];
		let carColor = input.split(' ')[2];
		if (!carNumber || !carColor)
			 throw new Error('Please provide both car number and color');

		carColor = carColor.toLowerCase();
		carNumber = carNumber.toUpperCase();
		if (this.carInfoMap.get(carNumber) !== undefined)
			throw new Error('Car with same registration number is already parked');

		const car = new Car(carNumber, carColor);
		const nearestParkingSlotIndex = this.minHeap.pop();

		this.parkingSpots[nearestParkingSlotIndex].setCar(car);
		const coloredList = this.colorInfoMap.get(carColor);
		if (coloredList === undefined) {
			this.colorInfoMap.set(carColor, this.parkingColorNodes[nearestParkingSlotIndex]);
		} else {
			// apending current parking Node to head of the list
			const coloredListHead = this.colorInfoMap.get(carColor);
			coloredListHead.prev = nearestParkingSlotIndex;
			this.parkingColorNodes[nearestParkingSlotIndex].next = coloredListHead.index;
			this.colorInfoMap.set(carColor, this.parkingColorNodes[nearestParkingSlotIndex]);
		}

		this.carInfoMap.set(carNumber, this.parkingColorNodes[nearestParkingSlotIndex]);
		return nearestParkingSlotIndex + 1;
	}

	/**
	 * @param {String} receives user's input via terminal
	 * @description makes slot free for given slot number.
	 * It throws and error if parking lot is not created.
	 * It throws an error if parking lot is empty or
	 * slot number is not found
	 * It throws an error if slot number is invalid
	 */

	leave (input) {
		if (this.MAX_PARKING_SLOTS < 1)
			throw new Error('Please, create a parking lot'); 

		const parkingIndex = parseInt(input.split(' ')[1] - 1);
		if (parkingIndex < 0 || parkingIndex >= this.MAX_PARKING_SLOTS)
			throw new Error('Please, enter a valid slot number');

		const car = this.parkingSpots[parkingIndex].getCar();
		if (!car)
			throw new Error('Sorry, parking lot is empty');

		const prevSameColorIndex = this.parkingColorNodes[parkingIndex].prev;
		const nextSameColorIndex = this.parkingColorNodes[parkingIndex].next;
		if (!prevSameColorIndex) {
			if (!nextSameColorIndex) {
				this.colorInfoMap.delete(car.getCarColor());
			} else {
				this.colorInfoMap.set(car.getCarColor(), this.parkingColorNodes[nextSameColorIndex]);
			}

		} else {
			this.parkingColorNodes[prevSameColorIndex].next = nextSameColorIndex;
			if (nextSameColorIndex) {
				this.parkingColorNodes[nextSameColorIndex].prev = prevSameColorIndex;
			}
		}

		this.carInfoMap.delete(car.getCarRegistrationNumber());
		this.parkingSpots[parkingIndex].setCar(null);
		this.parkingColorNodes[parkingIndex].prev = null;
		this.parkingColorNodes[parkingIndex].next = null;
		this.minHeap.insert(parkingIndex, parkingIndex);
		return parkingIndex + 1;
	}

	/**
	 * @param {String} receives user's input via terminal
	 * @description Returns an array containing parking details i.e. slot no, registration number and color
	 * It throws and error if parking lot is not created.
	 */

	status (input) {
		if (this.MAX_PARKING_SLOTS < 1)
			throw new Error('Please, create a parking lot');

		const arr = [];
		for (let i = 0; i < this.MAX_PARKING_SLOTS; i++) {
			const car = this.parkingSpots[i].getCar();
			if (car) {
				const color = car.getCarColor();
				arr.push((i + 1) + '         ' + car.getCarRegistrationNumber() + '    ' + color.charAt(0).toUpperCase() + color.slice(1));
			}

		}
		return arr;
    }

	/**
	* @param {String} receives user's input via terminal
	* @description returns a comma separated string of registration numbers for cars of given color.
	* It throws an error if parking lot is not created.
	* It returns null if cars of given color is not found.
	*/

	getCarsWithSameColor (input) {
		if (this.MAX_PARKING_SLOTS < 1)
			throw new Error('Please, create a parking lot');

		let carColor = input.split(' ')[1];
		if (!carColor)
			 throw new Error('Please provide car color');

		carColor = carColor.toLowerCase();
		return this.getParkingSpotDetailsByColor(carColor, 'car').join(', ');
	}

	/**
	* @param {String} receives user's input via terminal
	* @description returns a comma separated string of slot numbers for cars of given color.
	* It throws an error if parking lot is not created.
	* It returns null if cars of given color is not found.
	*/

	getSlotsWithSameColor (input) {
		if (this.MAX_PARKING_SLOTS < 1)
			throw new Error('Please, create a parking lot');

		let carColor = input.split(' ')[1];
		if (!carColor)
			 throw new Error('Please provide both car color');

		carColor = carColor.toLowerCase();
		return this.getParkingSpotDetailsByColor(carColor, 'slot').join(', ');
	}

	/**
	* @param {String} receives user's input via terminal
	* @description returns slot number for given car number.
	* It returns null if car is not found.
	*/

	getSlotByCarNumber (input) {
		if (this.MAX_PARKING_SLOTS < 1)
			throw new Error('Please, create a parking lot');

		let carNumber = input.split(' ')[1];
		if (!carNumber)
			throw new Error('Please, enter a parking number');

		carNumber = carNumber.toUpperCase();
		const parkingColorNode = this.carInfoMap.get(carNumber);
		if (parkingColorNode === undefined)
			return null;

		return parkingColorNode.index + 1;
	}

	/**
	* @param {String} receives carColor and input which specifies the type of output needed i.e. slot Numbers or car Numbers
	* @description returns a comma separated string of slot numbers or car numbers of given color.
	* It returns null if cars of given color is not found.
	*/

	getParkingSpotDetailsByColor (carColor, input) {
		const coloredListHead = this.colorInfoMap.get(carColor);
		if (coloredListHead === undefined)
			return null;

		let i = coloredListHead.index;
		const arr = [];
		while (i !== null) {
			if (input === 'car') {

				arr.push(this.parkingSpots[i].getCar().getCarRegistrationNumber());
			} else {
				arr.push(i + 1);
			}

			i = this.parkingColorNodes[i].next;
		}
		return arr;
	}
}

module.exports = ParkingLot;
