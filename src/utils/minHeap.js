/**
 * @description a class for representing a node in heap
 */
class Qelement {
	constructor (element, weight) {
		this.element = element;
		this.weight = weight;
	}
}

/**
 * @description an abstract class of heap and then extend the class to make minheap and maxheap
 */

class Heap {
	constructor () {
		if (this.constructor === Heap) {
			throw new Error('Can\'t instantiate abstract class!');
		}
	}

	insert () {
		throw new Error('Method \'insert()\' must be implemented.');
	}
	pop () {
		throw new Error('Method \'pop()\' must be implemented.');
	}
	heapify () {
		throw new Error('Method \'heapify()\' must be implemented.');
	}
	getTop () {
		throw new Error('Method \'getTop()\' must be implemented.');
	}
	parent (i) {
		return Math.floor((i - 1) / 2);
	}
	left (i) {
		return 2 * i + 1;
	}
	right (i) {
		return 2 * i + 2;
	}
	isEmpty () {
		throw new Error('Method \'isEmpty()\' must be implemented.');
	}
	getHeapElements () {
		throw new Error('Method \'getHeapElements()\' must be implemented.');
	}

}

/**
 * @description a class for representing a minheap made by extending theheap abstract class
 */

class Minheap extends Heap {
	constructor () {
		super();
		this.items = [];
		this.indexMap = new Map();
	}

	/**
 	* @description inserts an element with weight in the heap
	*/

	insert (element, weight) {
		const qElem = new Qelement(element, weight);
		this.items.push(qElem);
		this.indexMap.set(this.items[this.items.length - 1].element, this.items.length - 1);
		let i = this.items.length - 1;
		while (i !== 0 && this.items[this.parent(i)].weight > this.items[i].weight) {
			[this.items[this.parent(i)], this.items[i]] = [this.items[i], this.items[this.parent(i)]];
			this.indexMap.set(this.items[this.parent(i)].element, this.parent(i));
			this.indexMap.set(this.items[i].element, i);
			i = this.parent(i);
		}
	}

	/**
 	* @description pops the mininmum weight element from heap
 		if heap is empty it returns null
	*/

	pop () {
		if (this.isEmpty()) {
			return null;
		}
		const temp = this.items[0];
		this.indexMap.delete(this.items[0].element);
		[this.items[0], this.items[this.items.length - 1]] = [this.items[this.items.length - 1], this.items[0]];
		this.indexMap.set(this.items[0], 0);
		this.items.pop();
		this.heapify(0);
		return temp.element;
	}

	/**
 	* @description heapifies from index i
	*/

	heapify (i) {

		const parent = this.items[i];
		const left = this.items[this.left(i)];
		const right = this.items[this.right(i)];
		let temp = -1;
		if (left === undefined && right === undefined) {
			return;
		}
		if (left === undefined || right === undefined) {
			temp = left !== undefined ? this.left(i) : this.right(i);
		} else {
			temp = left.weight > right.weight ? this.right(i) : this.left(i);
		}

		if (this.items[temp].weight > parent.weight) {
			return;
		}
		[this.items[temp], this.items[i]] = [this.items[i], this.items[temp]];
		this.indexMap.set(this.items[i].element, i);
		this.indexMap.set(this.items[temp].element, temp);
		this.heapify(temp);
	}

	checkInHeap (v) {
		 if (this.indexMap.get(v) !== undefined)
			return true;
		return false;
	}

	getTop () {
		if (this.isEmpty()) {
			return null;
		}
		return this.items[0];
	}

	/**
 	* @description checks if heap is empty or not
	*/

	isEmpty () {
		if (this.items.length === 0)
			return true;
		return false;
	}

	/**
 	* @description return heap's elements
	*/
	getHeapElements () {
		const arr = [];
		for (let i = 0; i < this.items.length; i++)
			arr.push(this.items[i].element);

		return arr;
	}

}


module.exports = Minheap;


