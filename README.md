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
	The project is written using Nodejs. Make sure node is installed on your computer. Also NPM(node package manager) is also needed for installing dependencies. You can install both from <li><a href="here">https://nodejs.org/en/download/</a></li>.

## Start the Project
	This project has two modes :-
	1) **Interactive**
	2) **File**

	**Interactive Mode**
		Open terminal and navigate to the project folder and run these commands :-
		1) npm install
		2) npm start

	**File Mode**
		Open terminal and navigate to the project folder and run these commands :-
		node src/index.js <path_to_file.txt>
		The sample format of the input file is similar to the  ./data/input.txt file.

	You can also run the console application by opening ./bin/parking_lot.

## User Commands
	**create_parking_lot <PARKING LOT SIZE>**: create_parking_lot 6

	**park < REGISTRATION NUMBER > < COLOR >**: park KA-01-HH-1234 White will allocate the nearest slot from entry gate.

	**leave <SLOT NUMBER>**: leave 4 will make slot number 4 free.

	**status**: status will display cars and their slot details
	
	**registration_numbers_for_cars_with_colour < COLOR >**: registration_numbers_for_cars_with_colour White will display the registration number of the cars of white color

	**slot_numbers_for_cars_with_colour < COLOR >**: slot_numbers_for_cars_with_colour White will display slot numbers of the cars of white color 

	**slot_number_for_registration_number < REGISTRATION NUMBER >**: slot_number_for_registration_number MH-04-AY-1111 will display the slot number for the car with registration number MH-04-AY-1111.

	**exit**: exit will quit the application.

## Time Complexities
	**create_parking_lot** -> O(n)
	**park** -> O(log(n)) Mainly due to heap pop operation
	**leave** -> O(log(n)) Mainly due to heap insert operation
	**status** -> O(n) Mainly due to iterating the parking spots
	**registration_numbers_for_cars_with_colour** -> O(k) where k is the number of cars of the corresponding color
	**slot_numbers_for_cars_with_colour** ->  O(k) where k is the number of cars of the corresponding color
	**slot_number_for_registration_number** -> O(1)

## Scripts
	**buildBinary.js** 
		npm run build -> Creates a binary named parking_lot of the project in bin folder
	**buildSetup.js**
		npm run setup -> Creates a binary named setup in the bin folder to install the dependecies and run unit tests
	**lintTest.js**
		npm run linter -> Runs and report esLint errors on the src and scripts folder
	**unitTest.js**
		npm run test -> Runs all the unit test cases in test/customTests.js file. **Mocha** framework and **Chai** assertion library has been used for unit testing.
	**createDocumentation.js**
		npm run createDocumentation -> It uses jsDoc module and creates a global.html in out folder which gives a details documentation of the code.

## Dependencies
	Mocha: A JavaScript test framework for Node.js programs. Learn more here.

	Chai: A BDD/TDD assertion library for Node.js and it can be paired with any JS testing framework. Learn more here.


	cli-color: A npm module used to style terminal string. Learn more here.

	ESLint: A static code analysis tool for identifying problematic patterns found in JavaScript code. It covers both code quality and coding style issues. Learn more here.

	pkg: It is used to package a Node.js project into an executable that can be run even on devices without Node.js installed. Learn more here.

	JSDoc: An open source API documentation generator for Javascript. It allows developers to document their code through comments. It is supported only for Node.js versions > v8.15.0. Learn more here.
	
## Author

👤 **Ashutosh Singh <ashutosh0985@gmail.com>**

* Github: [@Brashtron](https://github.com/Brashtron)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
