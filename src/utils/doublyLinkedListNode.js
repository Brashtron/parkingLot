class DoublyNode {
	constructor() {
		this.data = null;
		this.prev = -1;
		this.next = -1;
	}

	updateProps(data, prev, next) {
		this.data = data;
		this.prev = prev;
		this.next = next;
	}
}

module.exports = { ParkingSpot };