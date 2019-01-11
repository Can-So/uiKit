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
      updateSnapshot: {
        type: 'boolean',
        default: false,
      },
    },
  },
);

const paths = c.input;

if (paths) {
  executeMeasure(paths, c).then((errors = []) => {
    if (errors.length > 0) {
      console.log(
        chalk.red('Bundle size build failed with the following errors:'),
      );

      errors.forEach(error => {
        console.log(chalk.red(error));
      });

      process.exit(1);
    } else {
      if (c.flags.updateSnapshot) {
        console.log(chalk.green('Updated bundle size snapshots'));
      } else {
        console.log(chalk.green('No significant bundle size changes detected'));
      }

      process.exit(0);
    }
  });
} else {
  console.log(chalk.red('no paths specified, no work to do. :D'));
}

async function executeMeasure(paths, c, errors = []) {
  const path = paths.pop();

  try {
    await measure(
      path,
      c.flags.analyze,
      c.flags.json,
      c.flags.lint,
      c.flags.updateSnapshot,
    );
  } catch (error) {
    errors.push(error);
  }

  if (paths.length > 0) {
    return executeMeasure(paths, c, errors);
  } else {
    return errors;
  }
}
