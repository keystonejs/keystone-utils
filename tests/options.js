/* eslint-env node, mocha */

var demand = require('must');
var utils = require('../index');

describe('Options', function () {
	it('should return an empty object my default', function () {
		demand(utils.options()).to.eql({});
	});
	
	it('should add missing options', function () {
		demand(utils.options({ a: 'a' }, { b: 'b' })).to.eql({ a: 'a', b: 'b' });
	});
	
	it('should override existing options', function () {
		demand(utils.options({ a: 'b' }, { a: 'a', b: 'b' })).to.eql({ a: 'a', b: 'b' });
	});

	it('should preserve option missing in the extendWith options object', function() {
		demand(utils.options({ a: 'b' , c: 'c' }, { a: 'a', b: 'b' })).to.eql({ a: 'a', b: 'b', c :'c' });
	});
});
