const fs = require('fs');
const readline = require('readline');
const path = require('path');

const { parseDriver, parseTrip } = require('./parseReport');

function generateReport(args) {
	const rl = readline.createInterface({
		input: fs.createReadStream(path.resolve(args.input)),
	});

	rl.on('line', function onLine(line) {
		const command = line.substring(0, line.indexOf(' '));

		switch (command.toLowerCase()) {
			case 'driver':
				parseDriver(line);
				break;

			case 'trip':
				parseTrip(line);
				break;

			default:
				console.warn(`UNKNOWN COMMAND: ${command}`);
				console.warn(line);
				break;
		}
	});

	rl.on('close', function onClose() {
		const sorted = Object.values(global.drivers).sort(
			(a, b) => b.totalMiles - a.totalMiles
		);

		for (let index = 0; index < sorted.length; index += 1) {
			console.log(sorted[index].summary);
		}
	});
}

module.exports = generateReport;
