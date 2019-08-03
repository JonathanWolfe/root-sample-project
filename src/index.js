const { Command } = require('commander');
const generateReport = require('./generateReport');

const program = new Command();

program
	.version('0.0.1', '-v --version')
	.description('Parse a driving history file into a report')
	.option('-i, --input <file>', 'Input file')
	.option('-o, --output <file>', 'Output file, uses STDOUT if absent');

program.parse(process.argv);

generateReport(program);
