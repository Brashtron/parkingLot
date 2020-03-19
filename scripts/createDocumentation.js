/**
 *
 * @description creates documentation for the modules using JSDoc in out/ folder
 *
 */

const sh = require('shelljs');

/**
 * @type {Array}
 * @description The list of files to include into documentation
 */
const fileList = [
    'src/*.js',
    'src/modules/*.js',
    'src/utils/*.js'
];

const command = 'jsdoc ' + fileList.join(' '); // combining all the files

sh.exec(command, (code, stderr, stdout) => {
    if (code !== 0 && stderr) {
        console.log('Error occurred while packaging Parking Lot\n');
        return 0;
    }
    else {
        console.log('Success! Documentation is created inside out/ folder\n');
        console.log('Go to out/ folder and open global.html\n');
    }
});
