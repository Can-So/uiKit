#!/usr/bin/env node

const path = require('path');
const exec = require('child_process').execSync;
const chalk = require('chalk').default;
const ora = require('ora');
const webpack = require('webpack');
const { fExists } = require('./utils/fs');
const { buildStats, createAtlaskitStatsGroups } = require('./utils/stats');
const { buildCacheGroups, createWebpackConfig } = require('./utils/webpack');
const { printReport } = require('./reporters/console');

const measureOutputPath = path.join(__dirname, '..', '..', '.measure-output');

main(process.argv[2], process.argv.includes('--analyze'));

function main(filePath, isAnalyze) {
  const entryPoint = path.resolve(__dirname, '../../packages', filePath);
  const spinner = ora(chalk.cyan(`Compiling "${filePath}"`)).start();

  if (!fExists(entryPoint)) {
    spinner.fail(chalk.red(`File "${entryPoint}" doesn't exist.`));
    process.exit(1);
  }

  // Async indicates group's combined size of all code-splitts.
  const mainStatsGroups = [
    {
      title: 'Source code',
      stats: [
        {
          name: 'main',
          fileName: 'main.js',
        },
        {
          name: 'async',
          fileName: 'main_async.js',
          cacheGroup: {
            name: 'main_async',
            test: module =>
              module.context &&
              module.context.includes(`packages/${filePath}/`),
            enforce: true,
            chunks: 'async',
          },
        },
      ],
    },
    {
      title: 'External Dependencies',
      stats: [
        {
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
      title: 'Atlaskit Dependencies',
      stats: createAtlaskitStatsGroups(
        path.join(__dirname, '..', '..', 'packages'),
        filePath,
      ),
    },
  ];

  const combinedStatsGroups = [
    {
      title: 'Combined',
      stats: [
        {
          name: 'main',
          fileName: 'combined_sync.js',
        },
        {
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
    outputDir: measureOutputPath,
    entryPoint: { main: entryPoint },
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
    outputDir: measureOutputPath,
    entryPoint: { combined_sync: entryPoint },
    optimization: {
      splitChunks: {
        cacheGroups: buildCacheGroups(combinedStatsGroups),
      },
    },
  });

  // Cleanup measure output directory
  try {
    exec(`rm -rf ${measureOutputPath}`);
  } catch (e) {}

  /**
   * Run both main and combined builds in parallel.
   */
  const compiler = webpack([mainConfig, combinedConfig]);
  compiler.run(err => {
    if (err) {
      return console.error(chalk.red(err));
    }

    const mainBuildStats = buildStats(measureOutputPath, mainStatsGroups);
    const combinedBuildStats = buildStats(
      measureOutputPath,
      combinedStatsGroups,
    );
    spinner.succeed(chalk.cyan(`Module "${filePath}" successfully built:\n`));
    printReport([...mainBuildStats, ...combinedBuildStats]);
  });
}
