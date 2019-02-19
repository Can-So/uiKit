const chalk = require('chalk').default;

chalk.bgRedBright;

function printHowToReadStats() {
  let vl = chalk.gray('|');
  let hl = chalk.gray('└─');
  console.log(
    chalk.dim(`  How to read stats:
    ${chalk.yellow('– main:')} ${chalk.green('2.17 MB')} (${chalk.red(
      '574 kB',
    )})   [>1%]   ${chalk.red('+90.78 kB')} (${chalk.red('+24.5 kB')})
      ${vl}     ${vl}        ${vl}          ${vl}       ${vl}          ${hl} diff in source code size after gzip
      ${vl}     ${vl}        ${vl}          ${vl}       ${hl} diff in source code size
      ${vl}     ${vl}        ${vl}          ${hl} indicates that bundle size increased beyond a threshold
      ${vl}     ${vl}        ${hl} source code size gzip
      ${vl}     ${hl} source code size
      ${hl} name of a split, can be main or async
`),
  );
}

module.exports = { printHowToReadStats };
