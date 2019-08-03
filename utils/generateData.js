// List of 50 random names
const names = [
	'Willard',
	'Rhea',
	'Fritz',
	'Douglass',
	'Josephina',
	'Glenda',
	'Lynell',
	'Myron',
	'Kasie',
	'Carisa',
	'Rosario',
	'Ria',
	'Necole',
	'Trang',
	'Dortha',
	'Shasta',
	'Kiyoko',
	'Thuy',
	'Quentin',
	'Perla',
	'Dimple',
	'Ariel',
	'Brande',
	'Alonso',
	'Celinda',
	'Soraya',
	'Hollie',
	'Zack',
	'Phil',
	'Cuc',
	'Meridith',
	'Nilda',
	'Yuri',
	'Tod',
	'Elvin',
	'Daniell',
	'Orval',
	'Apryl',
	'Nga',
	'Emery',
	'Pansy',
	'Anh',
	'Teodoro',
	'Sima',
	'Cristobal',
	'Peggie',
	'Gwyn',
	'Mignon',
	'Kip',
	'Isabel',
];

/**
 * Generates a random number between 2 bounds, inclusive
 *
 * @param {number} [lower=0] - Lower Bound
 * @param {number} [upper=100] - Upper Bound
 * @returns {number}
 */
function randBetweenBounds(lower = 0, upper = 100) {
	return Math.floor(Math.random() * upper) + lower;
}

/**
 * O(n) Fisher-Yates shuffle
 *
 * @param {array} [array=[]] - array to shuffle
 * @returns {array}
 */
function fisherYatesShuffle(array = []) {
	const clone = array.slice(0);
	let leftToShuffle = clone.length;

	// While there remain elements to shuffle…
	while (leftToShuffle) {
		// Pick a remaining element…
		leftToShuffle -= 1;
		const index = randBetweenBounds(0, leftToShuffle);

		// And swap it with the current element.
		const item = clone[leftToShuffle];
		clone[leftToShuffle] = clone[index];
		clone[index] = item;
	}

	return clone;
}

/**
 * Generates a Start and End HH:MM pair
 * End is always after the Start time
 *
 * @returns {{start: string, end: string}}
 */
function generateStartEndPair() {
	const startHour = randBetweenBounds(0, 22); // leave space for end
	const startMinute = randBetweenBounds(0, 59);

	let endHour = randBetweenBounds(startHour, 23);
	const endMinute = randBetweenBounds(0, 59);

	if (startHour === endHour && startMinute > endMinute) {
		endHour += 1;
	}

	function leadingZero(num) {
		const str = String(num);

		return str.length === 1 ? `0${num}` : num;
	}

	return {
		start: `${leadingZero(startHour)}:${leadingZero(startMinute)}`,
		end: `${leadingZero(endHour)}:${leadingZero(endMinute)}`,
	};
}

/**
 * Generates test data files
 * Picks from list of 50 driver names and generates random trip lengths and times
 *
 * @param {number} [numDrivers=10] - Number of Drivers (Max 50)
 * @param {number} [numTrips=50] - Number of Trips
 * @returns {string}
 */
function generateTestData(numDrivers = 10, numTrips = 50) {
	const drivers = fisherYatesShuffle(names).slice(0, Math.min(numDrivers, 50));
	const trips = [];

	while (trips.length < numTrips) {
		const startEnd = generateStartEndPair();
		const trip = {
			driver: drivers[randBetweenBounds(0, numDrivers - 1)],
			start: startEnd.start,
			end: startEnd.end,
			miles: parseFloat((Math.random() * 110).toFixed(2)), // max distance of 110.99 miles
		};

		trips.push(trip);
	}

	const driversFormatted = drivers.map(driver => `Driver ${driver}`);
	const tripsFormatted = trips.map(
		trip => `Trip ${trip.driver} ${trip.start} ${trip.end} ${trip.miles}`
	);

	return [].concat(driversFormatted, tripsFormatted).join('\n');
}

module.exports = {
	fisherYatesShuffle,
	generateStartEndPair,
	generateTestData,
};
