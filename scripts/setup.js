/**
 *
 * @description install all the npm packages and run unit tests,
 * the test fails if any of the above test suites fail.
 *
 */
const exec = require('child_process').exec;
const async = require('async');

async.series([
    function installDependencies (next) {
        console.log('Installing Dependencies');
        exec('npm install', (err, stdout, stderr) => {
            if (err) {
                console.log('Error installing npm dependecies');
                return next(err);
            }
            return next(null);
        });
    },
    function runUnitTests (next) {
        console.log('Running unit tests');
        exec('npm run test', (err, stdout, stderr) => {
            if (err) {
                console.log('Error running unit tests');
                return next(err);
            }
            console.log(stdout);
            return next(null);
        });
    }
], (err) => {
    if (err) {
        console.log('Tests failed!');
    }
    else {
        console.log('Unit test cases executed');
    }
});
