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
console.log('Titlecase:')
console.log(_dashes_);

var titlecase = function(str) {
	console.log(str + ' --> ' + utils.titlecase(str));
}

titlecase('one');
titlecase('one two');
titlecase('one Two three');


console.log(_dashes_);
console.log('Key to Label:')
console.log(_dashes_);

var keyToLabel = function(str) {
	console.log(str + ' --> ' + utils.keyToLabel(str));
}

keyToLabel('one');
keyToLabel('oneTwo');
keyToLabel('one_two');
keyToLabel('oneTwoThree');
keyToLabel('oneTWOThree');
keyToLabel('one twoThree');
keyToLabel('oneTwo.three');
keyToLabel('oneTwo3four');
keyToLabel('oneTwo-threeFour');
keyToLabel('id');
keyToLabel('someId');

console.log(_dashes_);
console.log('Key to Path:')
console.log(_dashes_);

var keyToPath = function(str) {
	console.log(str + ' --> ' + utils.keyToPath(str, true));
}

keyToPath('faq');
keyToPath('FAQs');
keyToPath('theFAQs');
keyToPath('oneTwo');
keyToPath('One_two');
keyToPath('one2three');
keyToPath('id');
keyToPath('SomeId');

console.log(_dashes_);
console.log('Key to Property:')
console.log(_dashes_);

var keyToProperty = function(str) {
	console.log(str + ' --> ' + utils.keyToProperty(str, true));
}

keyToProperty('faq');
keyToProperty('FAQs');
keyToProperty('theFAQs');
keyToProperty('oneTwo');
keyToProperty('One_two');
keyToProperty('one2three');
keyToProperty('id');
keyToProperty('SomeId');

