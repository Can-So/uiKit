#!/usr/bin/env node
const log = console.log;
const meow = require('meow');
const chalk = require('chalk');
const installFromBranch = require('./src/install-from-branch');

let c = meow(
  `
    Usage
        $ atlaskit-branch-installer <branch-name>
      Options
        --no-bolt Do not use bolt, use yarn.
        --dry-run Do not install the packages just print it
      Examples
        $ atlaskit-branch-installer ED-1252-typofix
`,
  {
    flags: {
      maxAttempts: {
        type: 'number',
        alias: 'a',
        default: 1,
      },
      timeout: {
        type: 'number',
        alias: 't',
        default: 2000,
      },
      bolt: {
        type: 'boolean',
        alias: 'bolt',
        default: true,
      },
      dryRun: {
        type: 'boolean',
        alias: 'd',
        default: false,
      },
    },
  },
);

const branchName = c.input[0];

if (branchName) {
  installFromBranch(branchName, c.flags);
} else {
  console.log(chalk.red('no branch name, no work to do. :D'));
}
