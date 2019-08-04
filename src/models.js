/**
 * Driver
 *
 * @class Driver
 */
class Driver {
	/**
	 * Creates an instance of Driver.
	 *
	 * @param {{name: string, trips: Trip[]}} params
	 * @memberof Driver
	 */
	constructor({ name = '[NO NAME]', trips = [] }) {
		this.name = name;
		this.trips = trips;
	}

	/**
	 * Filtered subset of trips that meet criteria
	 *
	 * @type {Trip[]}
	 * @readonly
	 * @memberof Driver
	 */
	get validTrips() {
		return this.trips.filter(function filterTrip(trip) {
			if (trip.milesPerHour <= 5) return false;
			if (trip.milesPerHour >= 100) return false;

			return true;
		});
	}

	/**
	 * Total miles the driver has driven
	 *
	 * @type {number}
	 * @readonly
	 * @memberof Driver
	 */
	get totalMiles() {
		return this.validTrips.reduce((sum, curr) => sum + curr.miles, 0);
	}

	/**
	 * Total hours the driver has driven
	 *
	 * @type {number}
	 * @readonly
	 * @memberof Driver
	 */
	get totalHours() {
		return this.validTrips.reduce((sum, curr) => sum + curr.hoursElapsed, 0);
	}

	/**
	 * Average mph the driver has gone over all trips
	 *
	 * @readonly
	 * @memberof Driver
	 */
	get averageMPH() {
		return this.totalHours ? this.totalMiles / this.totalHours : 0;
	}

	/**
	 * Returns a string describing the total miles and
	 * average miles per hour of the driver's trips
	 *
	 * @type {string}
	 * @readonly
	 * @memberof Driver
	 */
	get summary() {
		if (!this.totalMiles) {
			return `${this.name}: 0 miles`;
		}

		const miles = Math.round(this.totalMiles);
		const avgMPH = Math.round(this.averageMPH);

		return `${this.name}: ${miles} miles @ ${avgMPH}mph`;
	}
}

/**
 * Trip a Driver went on
 *
 * @class Trip
 */
class Trip {
	/**
	 * Creates an instance of Trip.
	 *
	 * @param {Object} params
	 * @param {string} params.driver - Name of the Driver
	 * @param {string} params.startTime - HH:MM 24-hour clock
	 * @param {string} params.endTime - HH:MM 24-hour clock
	 * @param {number} params.miles - Miles the trip went
	 * @memberof Trip
	 */
	constructor({
		driver = '[NO NAME]',
		startTime = '00:00',
		endTime = '00:00',
		miles = 0,
	}) {
		this.driver = driver;
		this.startTime = Trip.cleanTime(startTime);
		this.endTime = Trip.cleanTime(endTime);
		this.miles = parseFloat(miles);
	}

	/**
	 * Number of hours the trip elapsed
	 *
	 * @type {number}
	 * @readonly
	 * @memberof Trip
	 */
	get hoursElapsed() {
		const start = this.startTime.hour + this.startTime.minute / 60;
		const end = this.endTime.hour + this.endTime.minute / 60;

		return end - start;
	}

	/**
	 * Average Miles per hour of the trip
	 *
	 * @type {number}
	 * @readonly
	 * @memberof Trip
	 */
	get milesPerHour() {
		const mph = this.miles / this.hoursElapsed;

		return mph || 0;
	}

	/**
	 * Transforms the HH:MM time format to a useable object
	 *
	 * @static
	 * @param {string} input
	 * @returns {{hour: number, minute: number}}
	 * @memberof Trip
	 */
	static cleanTime(input) {
		const asInt = input.split(':').map(i => parseInt(i, 10));

		return {
			hour: asInt[0],
			minute: asInt[1],
		};
	}

	/**
	 * Summary of an individual Trip
	 *
	 * @type {string}
	 * @readonly
	 * @memberof Trip
	 */
	get summary() {
		return `${this.driver}: ${this.miles} miles @ ${this.milesPerHour}mph`;
	}
}

module.exports.Driver = Driver;
module.exports.Trip = Trip;
