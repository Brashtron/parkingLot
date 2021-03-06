const DoublyNode = require('../utils/doublyLinkedListNode');
const Car = require('../modules/car');
const ParkingSpot = require('../modules/parkingSpot');
const MinHeap = require('../utils/minHeap');
const helper = require('../utils/helper');

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
		this.MAX_PARKING_SLOTS = parseInt(input.split(/\s+/)[1]);
		if (isNaN(this.MAX_PARKING_SLOTS) === true || this.MAX_PARKING_SLOTS < 1)
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
	 * It throws and error if parking lot is not already created.
	 * It throws an error if parking lot is full.
	 * It throws and error if the car is already parked.
	 * It also throws an error if only one field (either registration number or color) is provided.
	 */

	park (input) {
		if (this.MAX_PARKING_SLOTS < 1)
			throw new Error('Please, create a parking lot');

		if (this.minHeap.isEmpty())
			throw new Error('Sorry, parking lot is full');

		let carNumber = input.split(/\s+/)[1];
		let carColor = input.split(/\s+/)[2];
		if (carNumber === undefined || carColor === undefined)
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
	 * @description makes parking slot free for given slot number.
	 * It throws and error if parking lot is not already created.
	 * It throws an error if parking lot is empty or
	 * slot number is not found
	 * It throws an error if slot number is invalid
	 */

	leave (input) {
		if (this.MAX_PARKING_SLOTS < 1)
			throw new Error('Please, create a parking lot');

		const parkingIndex = parseInt(input.split(/\s+/)[1] - 1);
		if (isNaN(parkingIndex) === true || parkingIndex < 0 || parkingIndex >= this.MAX_PARKING_SLOTS)
			throw new Error('Please, enter a valid slot number');

		return this.vacateParkingSlot(parkingIndex);
	}

	/**
	 * @param {String} receives user's input via terminal
	 * @description makes slot free for given car number.
	 * It throws and error if parking lot is not already created.
	 * It throws an error if parking lot is empty or
	 * slot number to the corresponding car number is not found
	 */

	leaveByCarNumber (input) {
		if (this.MAX_PARKING_SLOTS < 1)
			throw new Error('Please, create a parking lot');

		const parkingIndex = this.getSlotByCarNumber(input);
		if (parkingIndex === null)
			throw new Error('Sorry, this car is not parked here');

		return this.vacateParkingSlot(parkingIndex - 1);
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
				const s = helper.formatStatusOutPutString(i, car.getCarColor(), car.getCarRegistrationNumber());
				arr.push(s);
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

		let carColor = input.split(/\s+/)[1];
		if (carColor === undefined)
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

		let carColor = input.split(/\s+/)[1];
		if (carColor === undefined)
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

		let carNumber = input.split(/\s+/)[1];
		if (carNumber === undefined)
			throw new Error('Please, enter a valid car number');

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
			throw new Error('Sorry, there are no cars of ' + carColor + ' color');

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

	/**
	* @param {Number} receives parking index which needs to be vacated
	* @description vacates the parking index
	*/

	vacateParkingSlot (parkingIndex) {
		const car = this.parkingSpots[parkingIndex].getCar();
		if (!car)
			throw new Error('Sorry, parking slot is empty');

		const prevSameColorIndex = this.parkingColorNodes[parkingIndex].prev;
		const nextSameColorIndex = this.parkingColorNodes[parkingIndex].next;
		if (prevSameColorIndex === null) {
			if (nextSameColorIndex === null) {
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

	getAvailableSlots (input) {
		if (this.MAX_PARKING_SLOTS < 1)
			throw new Error('Please, create a parking lot');

		const arr = this.minHeap.getHeapElements();
		if (!arr || arr.length < 1)
			return null;

		arr.sort();
		for (let i = 0; i < arr.length; i++)
			arr[i] = arr[i] + 1;

		return arr.join(', ');
	}
}

module.exports = ParkingLot;
