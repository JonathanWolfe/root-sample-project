const { Driver, Trip } = require('./models');

global.drivers = {};

function parseDriver(inputLine) {
	const split = inputLine.split(' ');
	const instance = new Driver({ name: split[1] });

	if (!global.drivers[instance.name]) {
		global.drivers[instance.name] = instance;
	}
}

function parseTrip(inputLine) {
	const split = inputLine.split(' ');
	const instance = new Trip({
		driver: split[1],
		startTime: split[2],
		endTime: split[3],
		miles: split[4],
	});
	const found = global.drivers[instance.driver];

	if (found) {
		found.trips.push(instance);
	} else {
		console.warn(`No driver found matching "${instance.driver}"`);
		console.warn(instance);
	}
}

module.exports = {
	parseDriver,
	parseTrip,
};
