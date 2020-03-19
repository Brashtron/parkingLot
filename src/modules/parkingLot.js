const DoublyNode = require('../utils/doublyLinkedListNode');
const Car = require('../modules/car');
const ParkingSpot = require('../modules/parkingSpot');
const MinHeap = require('../utils/minHeap');

class ParkingLot {
	constructor () {
		this.MAX_PARKING_SLOTS = 0;
		this.parkingSpots = [];
		this.parkingColorNodes = [];
		this.minHeap = null;
		this.colorInfoMap = null;
		this.carInfoMap = null;
	}

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

	leave (input) {
		if (this.MAX_PARKING_SLOTS < 1)
			throw new Error('Please, create a parking lot');

		const parkingIndex = parseInt(input.split(' ')[1] - 1);
		const car = this.parkingSpots[parkingIndex].car;
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

	getCarsWithSameColor (input) {
		if (this.MAX_PARKING_SLOTS < 1)
			throw new Error('Please, create a parking lot');

		let carColor = input.split(' ')[1];
		if (!carColor)
			 throw new Error('Please provide both car color');

		carColor = carColor.toLowerCase();
		return this.getParkingSpotDetailsByColor(carColor, 'car').join(', ');
	}

	getSlotsWithSameColor (input) {
		if (this.MAX_PARKING_SLOTS < 1)
			throw new Error('Please, create a parking lot');

		let carColor = input.split(' ')[1];
		if (!carColor)
			 throw new Error('Please provide both car color');

		carColor = carColor.toLowerCase();
		return this.getParkingSpotDetailsByColor(carColor, 'slot').join(', ');
	}

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

	getParkingSpotDetailsByColor (carColor, input) {
		const coloredListHead = this.colorInfoMap.get(carColor);
		if (coloredListHead === undefined)
			throw new Error('Not found');

		let i = coloredListHead.index;
		const arr = [];
		while (i !== null) {
			if (input === 'car') {

				arr.push(this.parkingSpots[i].car.getCarRegistrationNumber());
			} else {
				arr.push(i + 1);
			}

			i = this.parkingColorNodes[i].next;
		}
		return arr;
	}
}

module.exports = ParkingLot;
