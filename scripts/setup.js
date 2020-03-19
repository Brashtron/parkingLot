/**
 *
 * @description install all the npm packages and run unit tests,
 * the test fails if any of the above test suites fail.
 *
 */
const sh = require('shelljs');
const async = require('async');

async.series([
    function installDependencies (next) {
        console.log('installing dependecies');
        sh.exec('npm install', (err, stdout, stderr) => {
            if (err) {
                console.log('Error installing npm dependecies');
                return next(err);
            }
            return next(null);
        });
    },
    function runUnitTests (next) {
        console.log('Running unit tests');
        sh.exec('npm run test', (err, stdout, stderr) => {
            if (err) {
                console.log('Error running unit tests');
                return next(err);
            }
            return next(null);
        });
    }
], (err) => {
    if (err) {
        console.log('Tests failed!');
    }
    else {
        console.log('All the tests has passed successfully');
    }
});
