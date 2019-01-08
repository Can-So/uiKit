#!/usr/bin/env node
const log = console.log;
const meow = require('meow');
const chalk = require('chalk');
const measure = require('./measure');

let c = meow(
  `
    Usage
        $ measure <[paths]>
      Options
        --analyze 
        --json
        --lint
      Examples
        $ measure packages/editor/editor-core
`,
  {
    flags: {
      analyze: {
        type: 'boolean',
        default: false,
      },
      json: {
        type: 'boolean',
        default: false,
      },
      lint: {
        type: 'boolean',
        default: false,
      },
    },
  },
);

const paths = c.input;
if (paths) {
  paths.forEach(path => {
    measure(path, c.flags.analyze, c.flags.json, c.flags.lint);
  });
} else {
  console.log(chalk.red('no paths specified, no work to do. :D'));
}
