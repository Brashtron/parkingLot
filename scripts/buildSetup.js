#!/usr/bin/env node
const shelljs = require('shelljs');
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


shelljs.exec('pkg ./scripts/setup.js -t host --out-path bin', (code, stderr, stdout) => {
    if (code !== 0 && stderr) {
        console.log('Error while packaging setup');
        return 0;
    }

	console.log('Parking Lot setup is packaged successfully for ' + os + 'host in "bin/" folder\n');
});
