#!/usr/bin/env node

const exec = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
const chalk = require('chalk').default;
const gzipSize = require('gzip-size');
const prettyBytes = require('pretty-bytes');
const ora = require('ora');
const webpack = require('webpack');
const webpackConfig = require('@atlaskit/webpack-config');
const measureOutputPath = path.join(__dirname, '..', '..', '.measure-output');

main(process.argv[2], process.argv.includes('--analyze'));

function main(filePath, isAnalyze) {
  const entryPoint = path.resolve(__dirname, '../../packages', filePath);
  const spinner = ora(chalk.cyan(`Compiling "${filePath}"`)).start();
  if (!fExists(entryPoint)) {
    spinner.fail(chalk.red(`File "${entryPoint}" doesn't exist.`));
    process.exit(1);
  }
  const packagesGroups = createAtlaskitDepsGroups(filePath);

  /**
   * Main config for detailed breakdown of dependencies, includes:
   * – main bundle: which is src of provided package
   * – node_modules bundle: includes all external dependencies
   * – package groups bundles: e.g. core, media, editor, etc...
   */
  const mainConfig = createWebpackConfig({
    entryPoint: {
      main: entryPoint,
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          node_modules: {
            test: /[\\/]node_modules[\\/]/,
            name: 'node_modules',
            enforce: true,
            chunks: 'all',
          },
          ...packagesGroups.reduce((acc, group) => {
            acc[group.name] = group.cacheGroup;
            return acc;
          }, {}),
        },
      },
    },
    isAnalyze,
  });

  /**
   * Config for a combined build. Used to better approximate bundle
   * size since gzip size is highly affected by the size of the input.
   */
  const combinedConfig = createWebpackConfig({
    entryPoint: {
      combined_sync: entryPoint,
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          async: {
            name: 'combined_async',
            enforce: true,
            chunks: 'async',
          },
        },
      },
    },
  });

  cleanUp();

  /**
   * Run both main and combined builds in parallel.
   */
  const compiler = webpack([mainConfig, combinedConfig]);
  compiler.run(err => {
    if (err) {
      return console.error(chalk.red(err));
    }

    const packageOut = path.resolve(measureOutputPath, 'main.js');
    const externalDepsOut = path.resolve(measureOutputPath, 'node_modules.js');
    const combinedSyncOut = path.resolve(measureOutputPath, 'combined_sync.js');
    const combinedAsyncOut = path.resolve(
      measureOutputPath,
      'combined_async.js',
    );
    const stats = [
      fStats(packageOut),
      fStats(externalDepsOut),
      fStats(combinedSyncOut),
      fStats(combinedAsyncOut),
    ];

    const packagesGroupsStats = packagesGroups
      .filter(group =>
        fExists(path.resolve(measureOutputPath, group.chunkName + '.js')),
      )
      .map(group => ({
        name: group.name,
        stats: fStats(path.resolve(measureOutputPath, group.chunkName + '.js')),
      }));

    spinner.succeed(chalk.cyan(`Module "${filePath}" successfully built:\n`));
    printReport(stats, packagesGroupsStats);
  });
}

function createWebpackConfig({
  entryPoint,
  output,
  optimization,
  isAnalyze = false,
}) {
  const config = webpackConfig({
    mode: 'production',
    websiteEnv: 'production',
    noMinimize: false,
    report: isAnalyze,
    entry: entryPoint,
    output: {
      filename: '[name].js',
      path: measureOutputPath,
      publicPath: '/',
    },
  });
  config.plugins = config.plugins.slice(2);

  /**
   * Resolve some of the common deps to empty files,
   * so they are not affecting a package bundle size.
   */
  config.resolve.alias = {
    'styled-components': path.resolve(__dirname, 'noop.js'),
    react: path.resolve(__dirname, 'noop.js'),
    'react-dom': path.resolve(__dirname, 'noop.js'),
  };

  if (optimization) {
    config.optimization = optimization;
  }

  return config;
}

/**
 * Creates an array of all packages groups in the repo
 * and cacheGroups for them.
 */
function createAtlaskitDepsGroups(packagePath) {
  return fs
    .readdirSync(path.join(__dirname, '..', '..', 'packages'))
    .filter(gr => !gr.startsWith('.'))
    .map(name => {
      const chunkName = `atlaskit-${name}`;
      return {
        name,
        chunkName,
        cacheGroup: {
          test: module =>
            module.context &&
            module.context.includes(`packages/${name}/`) &&
            !module.context.includes('node_modules') &&
            !module.context.includes(packagePath),
          name: chunkName,
          enforce: true,
          chunks: 'all',
        },
      };
    });
}

/**
 * Removes output of previous measure.
 */
function cleanUp() {
  try {
    exec(`rm -rf ${measureOutputPath}`);
  } catch (e) {}
}

function formatFileStats(fileStats) {
  return [
    chalk.green(prettyBytes(fileStats.size)),
    `(${chalk.red(prettyBytes(fileStats.gzipSize))})`,
  ].join(' ');
}

function printReport(stats, atlaskitStats) {
  console.log(chalk.yellow('  Source Code:'));
  console.log(chalk.yellow.dim(`    –`), formatFileStats(stats[0]));
  console.log();

  console.log(chalk.yellow('  Atlaskit Dependencies:'));
  atlaskitStats.forEach(group => {
    console.log(
      chalk.yellow.dim(`    – ${group.name}:`),
      formatFileStats(group.stats),
    );
  });
  console.log();

  console.log(chalk.yellow('  External Dependencies:'));
  console.log(
    chalk.yellow.dim(`    – node_modules:`),
    formatFileStats(stats[1]),
  );
  console.log();

  console.log(chalk.yellow('  Combined:'));
  console.log(chalk.yellow.dim(`    – main: `), formatFileStats(stats[2]));
  console.log(chalk.yellow.dim(`    – async: `), formatFileStats(stats[3]));
}

function fStats(filePath) {
  return {
    size: fs.statSync(filePath).size,
    gzipSize: gzipSize.sync(fs.readFileSync(filePath)),
  };
}

function fExists(filePath) {
  try {
    fs.accessSync(filePath);
    return true;
  } catch (e) {
    return false;
  }
}
