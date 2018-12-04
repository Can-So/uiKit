#!/usr/bin/env node
const log = console.log;

const meow = require('meow');

const chalk = require('chalk');

const installFromBranch = require('./install-from-branch');

let c = meow(
  `
    Installs the AtlasKit dependency versions from the given branch.

    Usage
        $ atlaskit-branch-installer <branch-name>
      Options
        TODO: Maybe?
      Examples
        $ atlaskit-branch-installer ED-1252-typofix
`,
  {
    flags: {
      maxAttempts: {
        type: 'string',
        alias: 'a',
      },
      timeout: {
        type: 'string',
        alias: 't',
      },
    },
  },
);

installFromBranch(c.input[0], c.flags);

// pretty(c.input[0], c.flags);
