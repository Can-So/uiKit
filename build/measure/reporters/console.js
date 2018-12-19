const chalk = require('chalk').default;
const prettyBytes = require('pretty-bytes');

function formatFileStats(fileStats) {
  return [
    chalk.green(prettyBytes(fileStats.size)),
    `(${chalk.red(prettyBytes(fileStats.gzipSize))})`,
  ].join(' ');
}

function printReport(stats, level = 1) {
  stats.forEach(group => {
    if (!group.stats.length) return;

    const title = `${group.title}:`;
    console.log(chalk.yellow(title.padStart(title.length + level * 2, ' ')));

    group.stats.forEach(stat => {
      if (stat.group) return printReport([stat], level + 1);

      const subTitle = `– ${stat.name}:`;
      console.log(
        chalk.yellow.dim(subTitle.padStart(subTitle.length + level * 2 + 2)),
        formatFileStats(stat.stats),
      );
    });

    if (level === 1) {
      console.log();
    }
  });
}

module.exports = { printReport };
