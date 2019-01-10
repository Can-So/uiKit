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
  executeMeasure(paths, c);
} else {
  console.log(chalk.red('no paths specified, no work to do. :D'));
}

async function executeMeasure(paths, c) {
  const path = paths.pop();
  await measure(path, c.flags.analyze, c.flags.json, c.flags.lint);

  if (paths.length > 0) {
    executeMeasure(paths, c);
  }
}
