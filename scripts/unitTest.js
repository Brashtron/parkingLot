const sh = require('shelljs');

sh.exec('mocha ./test/customTest.js', (err, stdout, stderr) => {
    if (err) {
        console.log('Error running unit tests');
    }
    console.log('Running unit tests...');
});
