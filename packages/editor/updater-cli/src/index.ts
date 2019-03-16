/// <reference lib="es2017.object" />

import chalk from 'chalk';
import * as meow from 'meow';
import { updateCommand } from './commands/update';
import { changelogCommand } from './commands/changelog';
import { UpdateTaskFlags } from './commands/update/types';

// prettier-ignore
const HELP_MSG = `
${chalk.yellow.bold('[update]')}
   Updates a list of given packages to latest version.

   ${chalk.green('Options')}
     ${chalk.yellow('--exclude')}     Comma separated list of packages to exclude from update
     ${chalk.yellow('--force')}       Forces update even when all provided packages are up-to-date

   ${chalk.green('Examples')}
     ${chalk.dim('$ akup update @findable/editor-core')}
     ${chalk.dim('$ akup update @findable/editor-core @findable/renderer --exclude @findable/analytics-next,@findable/media-card')}

${chalk.yellow.bold('[changelog]')}
   Shows a changelog for a given package from current version to latest.

   ${chalk.green('Examples')}
     ${chalk.dim('$ akup changelog @findable/editor-core')}
`;

export function run() {
  const cli = meow(HELP_MSG);
  const [command, ...inputs] = cli.input;

  if (command === 'update') {
    return updateCommand(inputs, {
      exclude: (cli.flags.exclude || '').split(','),
      force: cli.flags.force,
      preset: cli.flags.preset,
    } as UpdateTaskFlags);
  }

  if (command === 'changelog') {
    return changelogCommand(inputs[0], inputs[1]);
  }

  // tslint:disable:no-console
  return Promise.resolve(console.log(cli.help));
}
