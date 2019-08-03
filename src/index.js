#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Command } = require('commander');

const generateReport = require('./generateReport');
const { generateTestData } = require('../utils/generateData');

const program = new Command();

program.version('0.0.1', '-v --version');

program
	.command('parse')
	.description('Parse a driving history file into a report')
	.option('-i, --input <file>', 'Input file')
	.action(generateReport);

program
	.command('generate')
	.description('Generates Test Data to use as input')
	.option('-d, --drivers <number>', 'Number of drivers to use (Default 10, Max 50)')
	.option('-t, --trips <number>', 'Number of trips to log (Default 50)')
	.option('-o, --output', 'Writes output to utils/generated_data.txt')
	.action(function generate(args) {
		const drivers = args.drivers || 10;
		const trips = args.trips || 50;
		const output = generateTestData(drivers, trips);

		if (args.output) {
			fs.writeFile(
				path.resolve(__dirname, '../utils/generated_data.txt'),
				output,
				function callback(err) {
					if (err) console.error(err);
					else console.log('Generated!');
				}
			);
		} else {
			console.log(output);
		}
	});

// error on unknown commands
program.on('command:*', function bad() {
	console.error(
		'Invalid command: %s\nSee --help for a list of available commands.',
		program.args.join(' ')
	);
	process.exit(1);
});

program.allowUnknownOption(false);

const parsed = program.parse(process.argv);

// no command run, show help
if (!(parsed.args && parsed.args.length > 0 && typeof (parsed.args[0] === 'object'))) {
	program.outputHelp();
}
