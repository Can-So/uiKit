#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;
const chalk = require('chalk').default;
const ora = require('ora');
const webpack = require('webpack');
const { fExists } = require('./utils/fs');
const {
  buildStats,
  createAtlaskitStatsGroups,
  diff,
  clearStats,
} = require('./utils/stats');
const { buildCacheGroups, createWebpackConfig } = require('./utils/webpack');
const { prepareForPrint } = require('./utils/print');
const { printReport } = require('./reporters/console');
const { printHowToReadStats } = require('./utils/how-to-read-stats');

module.exports = function main(
  filePath,
  isAnalyze,
  isJson,
  isLint,
  updateSnapshot,
) {
  return new Promise((resolve, reject) => {
    const measureOutputPath = path.join(filePath, '.measure-output');

    const sanitizedFilePath = filePath.replace('/', '__');
    const measureCompiledOutputPath = path.join(
      measureOutputPath,
      sanitizedFilePath,
    );
    const dirs = filePath.split(path.sep);
    const packageName = dirs[dirs.length - 1];

    const atlaskitPackagesDir = path.join(__dirname, '..', '..', 'packages');

    const spinner = ora(chalk.cyan(`Compiling "${packageName}"`)).start();

    if (!fExists(filePath)) {
      spinner.fail(chalk.red(`File "${filePath}" doesn't exist.`));
      process.exit(1);
    }

    // Async indicates group's combined size of all code-splitts.
    const mainStatsGroups = [
      {
        name: 'Source code',
        group: true,
        stats: [
          {
            id: 'src.main',
            name: 'main',
            fileName: 'main.js',
          },
          {
            id: 'src.async',
            name: 'async',
            fileName: 'main_async.js',
            cacheGroup: {
              name: 'main_async',
              test: module =>
                module.context && module.context.includes(filePath),
              enforce: true,
              chunks: 'async',
            },
          },
        ],
      },
      {
        name: 'External Dependencies',
        group: true,
        stats: [
          {
            id: 'node_modules.main',
            name: 'node_modules [main]',
            fileName: 'node_modules.js',
            cacheGroup: {
              name: 'node_modules',
              test: /[\\/]node_modules[\\/]/,
              enforce: true,
              chunks: 'all',
              priority: -5,
            },
          },
          {
            id: 'node_modules.async',
            name: 'node_modules [async]',
            fileName: 'node_modules_async.js',
            cacheGroup: {
              name: 'node_modules_async',
              test: /[\\/]node_modules[\\/]/,
              enforce: true,
              chunks: 'async',
              priority: 4,
            },
          },
        ],
      },
      {
        name: 'Atlaskit Dependencies',
        group: true,
        stats: createAtlaskitStatsGroups(
          atlaskitPackagesDir,
          path.relative(atlaskitPackagesDir, filePath),
        ),
      },
    ];

    const combinedStatsGroups = [
      {
        name: 'Combined',
        group: true,
        stats: [
          {
            threshold: 0.01,
            id: 'combined.main',
            name: 'main',
            fileName: 'combined_sync.js',
          },
          {
            threshold: 0.02,
            id: 'combined.async',
            name: 'async',
            fileName: 'combined_async.js',
            cacheGroup: {
              name: 'combined_async',
              enforce: true,
              chunks: 'async',
            },
          },
        ],
      },
    ];

    /**
     * Main config for detailed breakdown of dependencies, includes:
     * – main bundle: which is src of provided package
     * – node_modules bundle: includes all external dependencies
     * – package groups bundles: e.g. core, media, editor, etc...
     */
    const mainConfig = createWebpackConfig({
      outputDir: measureCompiledOutputPath,
      entryPoint: { main: filePath },
      optimization: {
        splitChunks: {
          cacheGroups: buildCacheGroups(mainStatsGroups),
        },
      },
      isAnalyze,
    });

    /**
     * Config for a combined build. Used to better approximate bundle
     * size since gzip size is highly affected by the size of the input.
     */
    const combinedConfig = createWebpackConfig({
      outputDir: measureCompiledOutputPath,
      entryPoint: { combined_sync: filePath },
      optimization: {
        splitChunks: {
          cacheGroups: buildCacheGroups(combinedStatsGroups),
        },
      },
    });

    /**
     * Run both main and combined builds in parallel.
     */
    const compiler = webpack([mainConfig, combinedConfig]);
    compiler.run(err => {
      if (err) {
        return console.error(chalk.red(err));
      }

      const joinedStatsGroups = [...mainStatsGroups, ...combinedStatsGroups];
      const stats = buildStats(measureCompiledOutputPath, joinedStatsGroups);

      // Cleanup measure output directory
      try {
        exec(`rm -rf ${measureCompiledOutputPath}`);
      } catch (e) {}

      const prevStatsPath = path.join(filePath, `bundle-size-ratchet.json`);

      let prevStats;
      if (fExists(prevStatsPath)) {
        prevStats = JSON.parse(fs.readFileSync(prevStatsPath, 'utf8'));
      }

      const statsWithDiff = prevStats ? diff(prevStats, stats) : stats;
      const statsExceededSizeLimit = statsWithDiff.filter(
        stat => stat.isTooBig,
      );
      const passedBundleSizeCheck = !statsExceededSizeLimit.length;

      if (passedBundleSizeCheck) {
        spinner.succeed(
          chalk.cyan(`Module "${packageName}" passed bundle size check`),
        );
      } else {
        spinner.fail(
          chalk.red(`Module "${packageName}" has exceeded size limit!`),
        );
      }

      console.log();
      if (isJson) {
        return console.log(JSON.stringify(stats, null, 2));
      } else if (!isLint || !passedBundleSizeCheck) {
        printHowToReadStats();
        printReport(prepareForPrint(joinedStatsGroups, statsWithDiff));
      }

      if (updateSnapshot) {
        fs.writeFileSync(
          prevStatsPath,
          JSON.stringify(clearStats(stats), null, 2),
          'utf8',
        );
      } else if (statsExceededSizeLimit.length && isLint) {
        return reject(`✖ Module "${packageName}" has exceeded size limit!`);
      }

      const result = passedBundleSizeCheck ? 1 : 0;
      resolve(result);
    });
  });
};
