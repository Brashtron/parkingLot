const shelljs = require('shelljs');

shelljs.exec('eslint ./src ./scripts', (code, stderr, stdout) => {
	// console.log(code);
	console.log(stdout);
	 // console.log(stderr);
});
