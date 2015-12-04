var demand = require('must');
var utils = require('../index');

describe('milesBetween', function () {
	it('calculate the distance between two points in miles', function () {

		var point1 = [52.52917227553519, 13.376712799072266]
		,	point2 = [52.52201813715379, 13.41653823852539];
		
		var calculated = utils.milesBetween(point1, point2);
		demand(calculated.toFixed(2)).to.eql("2.79");
	});
});
