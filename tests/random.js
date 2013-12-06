/**
	These tests are currently designed to be run from the command line,
	with output reviewed by a human.
	
	Will be implemented using a proper unit testing framework soon.
*/

var utils = require('../index'),
	_dashes_ = '------------------------------';

console.log('\n==============================');
console.log('Running Tests:');
console.log('==============================\n');

console.log(_dashes_);
console.log('Random String:')
console.log(_dashes_);

console.log('Default:    ' + utils.randomString());
console.log('2 chars:    ' + utils.randomString(2));
console.log('4-6 chars:  ' + utils.randomString([4,6]));
console.log('4-6 chars:  ' + utils.randomString([4,6]));
console.log('4-6 chars:  ' + utils.randomString([4,6]));
console.log('4-6 chars:  ' + utils.randomString([4,6]));
console.log('4-6 chars:  ' + utils.randomString([4,6]));
console.log('4-6 chars:  ' + utils.randomString([4,6]));
console.log('ABCDE only: ' + utils.randomString(10, 'ABCDE'));