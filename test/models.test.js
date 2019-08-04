const test = require('ava');

const { Driver, Trip } = require('../src/models');

test('Valid Trips', t => {
	const trips = [
		new Trip({ driver: 'Anh', startTime: '00:00', endTime: '01:00', miles: 100 }),
		new Trip({ driver: 'Anh', startTime: '00:00', endTime: '02:00', miles: 100 }),
		new Trip({ driver: 'Anh', startTime: '00:00', endTime: '01:30', miles: 100 }),
		new Trip({ driver: 'Anh', startTime: '00:00', endTime: '00:45', miles: 100 }),
		new Trip({ driver: 'Anh', startTime: '00:00', endTime: '08:00', miles: 100 }),
	];
	const driver = new Driver({ name: 'Anh', trips });

	t.is(driver.trips.length, 5);
	t.is(driver.validTrips.length, 3);
});
