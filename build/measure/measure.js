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
      stats: createAtlaskitStatsGroups(filePath),
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
    entryPoint: { combined_sync: entryPoint },
    optimization: {
      splitChunks: {
        cacheGroups: buildCacheGroups(combinedStatsGroups),
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

    const mainBuildStats = buildStats(measureOutputPath, mainStatsGroups);
    const combinedBuildStats = buildStats(
      measureOutputPath,
      combinedStatsGroups,
    );
    spinner.succeed(chalk.cyan(`Module "${filePath}" successfully built:\n`));
    printReport([...mainBuildStats, ...combinedBuildStats]);
  });
}

function buildStats(outputPath, statsGroups) {
  return statsGroups.map(group => {
    return {
      title: group.title,
      group: group.group,
      stats: group.stats.reduce((acc, stat) => {
        if (stat.group) {
          acc.push(...buildStats(outputPath, [stat]));
          return acc;
        }

        if (!stat.fileName) return acc;

        const filePath = path.resolve(outputPath, stat.fileName);
        if (!fExists(filePath)) return acc;

        acc.push({
          name: stat.name,
          stats: fStats(filePath),
        });
        return acc;
      }, []),
    };
  });
}

function buildCacheGroups(statsGroups) {
  return statsGroups.reduce((acc, group) => {
    return group.stats.reduce((cacheGroups, item) => {
      if (item.cacheGroup) {
        cacheGroups[item.cacheGroup.name] = item.cacheGroup;
      }
      if (item.group) {
        cacheGroups = { ...cacheGroups, ...buildCacheGroups([item]) };
      }
      return cacheGroups;
    }, acc);
  }, {});
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
function createAtlaskitStatsGroups(packagePath) {
  return fs
    .readdirSync(path.join(__dirname, '..', '..', 'packages'))
    .filter(gr => !gr.startsWith('.'))
    .map(name => {
      const chunkName = `atlaskit-${name}`;
      const test = module =>
        module.context &&
        module.context.includes(`packages/${name}/`) &&
        !module.context.includes('node_modules') &&
        !module.context.includes(packagePath);

      return {
        title: name,
        group: true,
        stats: [
          {
            name: 'main',
            fileName: `${chunkName}.js`,
            cacheGroup: {
              name: chunkName,
              test,
              enforce: true,
              chunks: 'all',
              priority: -5,
            },
          },
          {
            name: 'async',
            fileName: `${chunkName}-async.js`,
            cacheGroup: {
              name: `${chunkName}-async`,
              test,
              enforce: true,
              chunks: 'async',
              priority: 5,
            },
          },
        ],
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
