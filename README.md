<h1 align="center">Welcome to Parking Lot 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

## Problem Description
> To design a parking lot system with ability to find:
1) Registration numbers of all cars of a particular colour.

2) Slot number in which a car with a given registration number is parked.

3) Slot numbers of all slots where a car of a particular colour is parked.

## Pre-requisites
The project is written using **Nodejs** with **OOPs** and **TDD**(Testing Driven Development) approach. Make sure node is installed on your computer. Also **NPM(node package manager)** is also needed for installing dependencies. You can install both from https://nodejs.org/en/download/

## Setup and Usage
This project has two modes :-
1) **Interactive**
2) **File**

* **Interactive Mode**
	Open terminal and navigate to the project folder and run these commands :-
	* **npm install** -> installs project dependencies
	* **npm start** -> runs the project

* **File Mode**
	Open terminal and navigate to the project folder and run the command :-
	* **npm install** -> installs project dependencies
	* **node src/index.js  <path_to_file.txt>**
	The format of the input file is similar to the  sample format ./data/input.txt file. 

You can also run the **console application** directly. For that you have to build two binary files. A pre-requisite to install these binary is **node** and **npm** as mentioned earlier. The steps to create these binaries are -:
* **npm install** -> This will install project dependencies.
* **npm run setup** -> This will create a setup binary in the bin folder.
* **npm run build** -> This will create a parking_lot binary in the bin folder.

Now the steps to run the console application are as follows :-	
1) **./bin/setup** -> This setup binary will install all dependencies and will then run the unit test cases.
	
2) **./bin/parking_lot** -> This is the main project binary named parking_lot which will open the console application. It can also run with an input file as an argument. For eg. **./bin/parking_lot ./data/input.txt**

In the **scripts** segment below it is explained how these binaries are made.

## User Commands
1) **create_parking_lot < PARKING LOT SIZE >**: create_parking_lot 6

2) **park < REGISTRATION NUMBER > < COLOR >**: park KA-01-HH-1234 White will allocate the nearest slot from entry gate.

3) **leave <SLOT NUMBER>**: leave 4 will make slot number 4 free.

4) **status**: status will display cars and their slot details
	
5) **registration_numbers_for_cars_with_colour < COLOR >**: registration_numbers_for_cars_with_colour White will display the registration number of the cars of white color

6) **slot_numbers_for_cars_with_colour < COLOR >**: slot_numbers_for_cars_with_colour White will display slot numbers of the cars of white color 

7) **slot_number_for_registration_number < REGISTRATION NUMBER >**: slot_number_for_registration_number MH-04-AY-1111 will display the slot number for the car with registration number MH-04-AY-1111.

8) **available_slot_numbers**: available slot numbers in the parking lot

9) **leave_by_car_number <REGISTRATION NUMBER>** leave_by_car_number MH-04-AY-1111 will leave the spot occupied by this car.

10) **exit**: exit will quit the application.

## OOPs Modules
Following classes are used in the development of the project :-

* **ParkingLot** -> Representation of the parking lot and is used to initialize the parking lot with maximum number of slots. It has a parkingSpot class object array and a doublyLinkedListNode array, both of maximum slot size. It also has two maps ColorInfoMap which stores the reference of the head of the doublylist of same color and carInfoMap which stores the reference of the doublyLinkedListNode where the car is parked.

* **Car** -> Representation of the car. Stores car number and color.

* **ParkingSpot** -> Representation of a single parkingSpot. Stores a car instance and position of the spot itself. 

* **Minheap** -> Stores the free slot positions with position index itself as the weight. 

* **doublyLinkedListNode** -> Stores the parking position, the previous and next position of a car of the same color.

**Parking Lot Class Logic**
* **park**
1) The nearest empty slot is popped from the minHeap. 

2) The car is set on that position in the parkingSpot Object.

3) The doublylinkedlist head is fetched from the colorInfoMap and then the node corresponding to the current parking spot is appended as head and set in colorInfoMap.
	
4) CarInfoMap stores this node with key as car number. This second map provides ease in removing these nodes from doublyLinkedList and also provides parking slot info of a car in O(1).


* **Leave**
1) The parkingSpot object is checked for occupancy at the position mentioned.

2) The car number is fetched from the parkingSpot Object.

3) The doublyLinkedListNode object at the corresponding position is fetched and it is removed from the list it belongs and colorInfoMap will be altered accordingly.

4) The free spot now is inserted in the minHeap again.

## Time Complexities
1) **create_parking_lot** -> O(n)

2) **park** -> O(log(n)) Mainly due to heap pop operation

3) **leave** -> O(log(k)) where k are the available slots. Mainly due to heap insert operation

4) **status** -> O(n) Mainly due to iterating the parking spots

5) **registration_numbers_for_cars_with_colour** -> O(k) where k is the number of cars of the corresponding color

6) **slot_numbers_for_cars_with_colour** ->  O(k) where k is the number of cars of the corresponding color

7) **slot_number_for_registration_number** -> O(1)

8) **available_slot_numbers** -> O(klogk) where k are the available slots

9) **leave_by_car_number** -> O(log(k))  where k are the available slots. Mainly due to heap insert operation


## Scripts
* **buildBinary.js** 
	npm run build -> Creates a binary named parking_lot of the project in bin folder

* **buildSetup.js**
	npm run setup -> Creates a binary named setup in the bin folder to install the dependecies and run unit tests

* **lintTest.js**
	npm run linter -> Runs and report esLint errors on the src and scripts folder

* **unitTest.js**
	npm run test -> Runs all the unit test cases in test/customTests.js file. **Mocha** framework and **Chai** assertion library has been used for unit testing.

* **createDocumentation.js**
	npm run createDocumentation -> It uses jsDoc module and creates a global.html in out folder which gives a details documentation of the code.

## Dependencies
* **Mocha**: A JavaScript test framework for Node.js programs. Learn more https://www.npmjs.com/package/mocha.

* **Chai**: A BDD/TDD assertion library for Node.js and it can be paired with any JS testing framework. Learn more https://www.npmjs.com/package/chai.

* **cli-color**: A npm module used to style terminal string. Learn more https://www.npmjs.com/package/cli-color.

* **ESLint**: A static code analysis tool for identifying problematic patterns found in JavaScript code. It covers both code quality and coding style issues. Learn more https://www.npmjs.com/package/eslint.

* **pkg**: It is used to package a Node.js project into an executable that can be run even on devices without Node.js installed. Learn more https://www.npmjs.com/package/pkg.

* **JSDoc**: An open source API documentation generator for Javascript. It allows developers to document their code through comments. It is supported only for Node.js versions > v8.15.0. Learn more https://www.npmjs.com/package/jsdoc.

## Author

👤 **Ashutosh Singh <ashutosh0985@gmail.com>**

* Github: [@Brashtron](https://github.com/Brashtron)