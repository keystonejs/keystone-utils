var demand = require('must');
var utils = require('../index');

describe('Functional', function () {
  describe('isDataURL', function () {
		it('Should return true for a valid data URL', function () {
      var dataString = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFCAYAAACN//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
			demand(utils.isDataURL(dataString)).to.equal(true);
		});
		it('Should return false for an invalid data URL', function () {
      var dataString = 'JRU5ErkJggg';
			demand(utils.isDataURL(dataString)).to.equal(false);
		});
		it('Should return false for non-string inputs', function () {
      var dataString = 1;
			demand(utils.isDataURL(dataString)).to.equal(false);
		});
	});
});
