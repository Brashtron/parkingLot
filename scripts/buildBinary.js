#!/usr/bin/env node
const shelljs = require('shelljs');
const fs = require('fs');
let os = process.platform;

if (os === 'darwin') {
	os = 'MacOS';
}
else if (os === 'win32' || os === 'win64') {
	os = 'Windows';
}
else if (os === 'linux') {
	os = 'Linux';
}


shelljs.exec('pkg ./src/index.js -t host --out-path bin', (code, stderr, stdout) => {
    if (code !== 0 && stderr) {
        console.log('Error while packaging parking_lot');
        return 0;
    }
	fs.rename('./bin/index', './bin/parking_lot', function (err) {
		if (err) {
			console.log('Error occurred while renaming the executable');
		} else {
			console.log('Parking Lot is packaged successfully for ' + os + 'host in "bin/" folder\n');
		}
	});
});
	