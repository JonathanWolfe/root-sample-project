const test = require('ava');

const { parseDriver, parseTrip } = require('../src/parseReport');

test.beforeEach(function beforeEach() {
	global.drivers = {};
});

test('Parse Driver', t => {
	parseDriver('Driver Dan');

	t.assert(global.drivers.Dan);
	t.is(global.drivers.Dan.name, 'Dan');
});

test('Parse Trip', t => {
	parseDriver('Driver Kip');
	parseTrip('Trip Kip 13:13 19:12 98.08');

	const kip = global.drivers.Kip;

	t.assert(kip);
	t.is(kip.trips.length, 1);

	const trip = kip.trips[0];

	t.is(trip.driver, 'Kip');
	t.deepEqual(trip.startTime, { hour: 13, minute: 13 });
	t.deepEqual(trip.endTime, { hour: 19, minute: 12 });
	t.is(trip.miles, 98.08);
});
