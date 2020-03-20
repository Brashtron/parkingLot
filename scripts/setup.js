/**
 *
 * @description install all the npm packages and run unit tests,
 * the test fails if any of the above test suites fail.
 *
 */
const exec = require('child_process').exec;

function installDependencies (next) {
    console.log('Installing Dependencies');
    exec('npm install', (err, stdout, stderr) => {
       if (err) {
           console.log('Error installing npm dependecies');
           console.log(err);
           return;
       }
        return next();
    });
}

function runUnitTests () {
    console.log('Running unit tests');
    exec('npm run test', (err, stdout, stderr) => {
        if (err) {
            console.log('Error running unit tests');
            return err;
        }
        console.log(stdout);
        console.log('Unit test cases executed');
        return null;
    });
}

function executeTasks () {
    installDependencies(runUnitTests);
}

executeTasks();
