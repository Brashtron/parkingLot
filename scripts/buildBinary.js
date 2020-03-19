#!/usr/bin/env node
const shelljs = require('shelljs');
const fs = require('fs');
let os = process.platform;
let fileName = './bin/parking_lot';

if (os === 'darwin') {
	os = 'MacOS';
}
else if (os === 'win32' || os === 'win64') {
	os = 'Windows';
	fileName += '.exe'; 
}
else if (os === 'linux') {
	os = 'Linux';
}


shelljs.exec('pkg ./src/index.js -t host --out-path bin', (code, stderr, stdout) => {
    if (code !== 0 && stderr) {
        console.log('Error while packaging parking_lot');
        return 0;
    }
	fs.rename('./bin/index', fileName, function (err) {
		if (err) {
			console.log(err);
			console.log('Error occurred while renaming the executable');
		} else {
			console.log('Parking Lot is packaged successfully for ' + os + 'host in "bin/" folder\n');
		}
	});
});
