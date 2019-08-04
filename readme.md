# Root Code Sample Project

This project injests a file containing a driver's trips and output a report about them.

## Sample Data

-   The initial sample data is included in the repo at `./utils/sample_data.txt`
-   Additional sample data can be generated via the tool, see below for usage for
    `generate` command

## Usage

Invoke the tool via `node ./src/index.js`. Use the `--help` flag to see additional flags
you can provide.

**Prerequisites**:

-   You will need to have [NodeJS](https://nodejs.org) installed
-   Run `npm install` inside the root directory

```
$ node ./src/index.js
Usage: index [options] [command]

Options:
  -v --version        output the version number
  -h, --help          output usage information

Commands:
  parse [options]     Parse a driving history file into a report
  generate [options]  Generates Test Data to use as input
```

```
$ node ./src/index.js parse --help
Usage: parse [options]

Parse a driving history file into a report

Options:
  -i, --input <file>  Input file
  -h, --help          output usage information
```

```
$ node ./src/index.js generate --help
Usage: generate [options]

Generates Test Data to use as input

Options:
  -d, --drivers <number>  Number of drivers to use (Default 10, Max 50)
  -t, --trips <number>    Number of trips to log (Default 50)
  -o, --output            Writes output to utils/generated_data.txt
  -h, --help              output usage information
```

## Copy-Paste Commands

Here are some commands to copy-paste that will test all the capabilities:

-   `node ./src/index.js parse --input ./utils/sample_data.txt`
-   `node ./src/index.js generate --drivers 5`
-   `node ./src/index.js parse --input ./utils/generated_data.txt`
