/* eslint-env node, mocha */

var demand = require('must');
var utils = require('../index');

describe('Random strings', function () {
	it('Should return a 10 char random string of alphanums', function () {
		demand(utils.randomString()).to.match(/^\w{10}$/i);
	});
	it('Should return a 2 char random string of alphanums', function () {
		demand(utils.randomString(2)).to.match(/^\w{2}$/i);
	});
	it('Should return a 4-6 char random string of alphanums', function () {
		demand(utils.randomString([4, 6])).to.match(/^\w{4,6}$/i);
	});
	it('Should return a 4-6 char random string of alphanums', function () {
		demand(utils.randomString([4, 6])).to.match(/^\w{4,6}$/i);
	});
	it('Should return a 4-6 char random string of alphanums', function () {
		demand(utils.randomString([4, 6])).to.match(/^\w{4,6}$/i);
	});
	it('Should return a 4-6 char random string of alphanums', function () {
		demand(utils.randomString([4, 6])).to.match(/^\w{4,6}$/i);
	});
	it('Should return a 4-6 char random string of alphanums', function () {
		demand(utils.randomString([4, 6])).to.match(/^\w{4,6}$/i);
	});
	it('Should return a 20 char random string of "ABCDE"', function () {
		demand(utils.randomString(20, 'ABCDE')).to.match(/^[A-E]{20}$/);
	});
});
