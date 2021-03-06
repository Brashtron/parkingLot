#!/usr/bin/env node
const fs = require('fs');
const readLine = require('readline');
const ParkingLot = require('../src/modules/parkingLot.js');
const clc = require('cli-color');
const errorColor = clc.red;
const outputColor = clc.green;

require('events').EventEmitter.defaultMaxListeners = 0;

const parkingLot = new ParkingLot();

let	commandLineArguments = process.argv;
let interactiveMode = false;


if (commandLineArguments[commandLineArguments.length - 1].endsWith('.txt')) {
	interactiveMode = false;
	fs.readFile(commandLineArguments[2], 'utf-8', function (err, data) {
		if (err) {
			console.log('Error in reading file');
		}

		const arr = data.split('\n');
		for (let i = 0; i < arr.length; i++) {
			processUserCommands(arr[i]);
		}
		process.exit(1);
	});
} else {
	interactiveMode = true;
	runInteractiveConsole();
}

/**
 * @description invoked when users interact via console
 * processes one command at a time
 */

function runInteractiveConsole () {
	const prompts = readLine.createInterface({
		input: process.stdin,
		output: process.stdout,
		terminal: false
	});
	if (interactiveMode) {
		prompts.question('Input: ', function (data) {
			processUserCommands(data);
		});
	}

}

/**
 *
 * @param {String} user input entered via console
 * @description driver function for different commands for entered by users
 * functions of parkinglot are mapped with the commands and invoked accordingly
 */

function processUserCommands (input) {
	input = input.trim();
	const userCommand = input.split(/\s+/)[0].toLowerCase();
	switch (userCommand) {
		case 'create_parking_lot':
			try {
				const totalSlots = parkingLot.createParkingLot(input);
				console.log('Created a parking lot with ' + outputColor(totalSlots) + ' slots.');
			}
			catch (err) {
				console.log(errorColor(err.message));
			}

			break;
		case 'park':
			try {
				const parkingSlotNumber = parkingLot.park(input);
				console.log('Allocated slot number: ' + outputColor(parkingSlotNumber));
			}
			catch (err) {
				console.log(errorColor(err.message));
			}
			break;
		case 'leave':
			try {
				const parkingSlotNumber = parkingLot.leave(input);
				console.log('Slot number ' + outputColor(parkingSlotNumber) + ' is free');
			}
			catch (err) {
				console.log(errorColor(err.message));
			}
			break;
		case 'leave_by_car_number':
			try {
				const parkingSlotNumber = parkingLot.leaveByCarNumber(input);
				console.log('Slot number ' + outputColor(parkingSlotNumber) + ' is free');
			}
			catch (err) {
				console.log(errorColor(err.message));
			}
			break;
		case 'status':
			try {
				const parkingLotStatus = parkingLot.status();
				if (parkingLotStatus.length > 0) {
					console.log('Slot No.  Registration No.  Color');
					console.log(outputColor(parkingLotStatus.join('\n')));
				}
				else {
					console.log(errorColor('Sorry, parking lot is empty'));
				}
			}
			catch (err) {
				console.log(errorColor(err.message));
			}
			break;
		case 'registration_numbers_for_cars_with_colour':
			try {
				const registrationNumbers = parkingLot.getCarsWithSameColor(input);
				if (registrationNumbers && registrationNumbers.length > 0) {
					console.log(outputColor(registrationNumbers));
				}
				else {
					console.log(errorColor('Sorry, Car with given color is not found'));
				}
			}
			catch (err) {
				console.log(errorColor(err.message));
			}
			break;
		case 'slot_numbers_for_cars_with_colour':
			try {
				const parkingSlotNumbers = parkingLot.getSlotsWithSameColor(input);
				if (parkingSlotNumbers && parkingSlotNumbers.length > 0) {
					console.log(outputColor(parkingSlotNumbers));
				}
				else {
					console.log(errorColor('Sorry, Car with given color is not found'));
				}
			}
			catch (err) {
				console.log(errorColor(err.message));
			}
			break;
		case 'slot_number_for_registration_number':
			try {
				const parkingSlotNumber = parkingLot.getSlotByCarNumber(input);
				if (parkingSlotNumber) {
					console.log(outputColor(parkingSlotNumber));
				}
				else {
					console.log(errorColor('Sorry, Car with given registration number is not found'));
				}
			}
			catch (err) {
				console.log(errorColor(err.message));
			}
			break;
		case 'available_slot_numbers':
			try {
				const availableSlotNumbers = parkingLot.getAvailableSlots(input);
				if (availableSlotNumbers && availableSlotNumbers.length > 0) {
					console.log(outputColor(availableSlotNumbers));
				}
				else {
					console.log(errorColor('Sorry, No parking spots are available'));
				}
			}
			catch (err) {
				console.log(errorColor(err.message));
			}
			break;
		case 'exit':
			process.exit(0);
			break;

		default:
			console.log(input, ' is an invalid command');
			break;
	}
	runInteractiveConsole();
}
