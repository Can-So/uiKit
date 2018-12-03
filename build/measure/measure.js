const chalk = require('chalk').default;
const fs = require('fs');
const gzipSize = require('gzip-size');
const path = require('path');
const prettyBytes = require('pretty-bytes');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const options = require('../webpack-config/config')({
  mode: 'production',
  websiteEnv: 'production',
  noMinimize: false,
  report: false,
});

options.entry = {
  main: path.resolve(__dirname, '../../packages', process.argv[2]),
};

options.plugins = options.plugins.slice(2);
if (process.argv.includes('--analyze')) {
  options.plugins.push(new BundleAnalyzerPlugin());
}

options.optimization = {
  splitChunks: {
    cacheGroups: {
      node_modules: {
        test: /[\\/]node_modules[\\/]/,
        name: 'node_modules',
        enforce: true,
        chunks: 'all',
      },
    },
  },
};

options.resolve.alias = {
  'styled-components': path.resolve(__dirname, 'noop.js'),
  react: path.resolve(__dirname, 'noop.js'),
  'react-dom': path.resolve(__dirname, 'noop.js'),
};

const combinedOptions = { ...options, output: { ...options.output } };
delete combinedOptions.optimization;

combinedOptions.output.filename = 'all.js';

const compiler = webpack([options, combinedOptions]);
compiler.run((err, s) => {
  if (err) {
    return console.error(chalk.red(err));
  }

  const outputDir = path.resolve(__dirname, '../../dist');
  const packageOut = path.resolve(outputDir, 'main.js');
  const moduleOut = path.resolve(outputDir, 'node_modules.js');
  const combinedOut = path.resolve(outputDir, 'all.js');

  const stats = [fStats(packageOut), fStats(moduleOut), fStats(combinedOut)];

  console.log(chalk.cyan('Module successfully built:\n'));
  console.log(
    chalk.yellow('  Source Code:'),
    chalk.green(prettyBytes(stats[0].size)),
    `(${chalk.red(prettyBytes(stats[0].gzipSize))})`,
  );
  console.log(
    chalk.yellow('  Dependencies:'),
    chalk.green(prettyBytes(stats[1].size)),
    `(${chalk.red(prettyBytes(stats[1].gzipSize))})`,
  );
  console.log(
    chalk.yellow('  Combined:'),
    chalk.green(prettyBytes(stats[2].size)),
    `(${chalk.red(prettyBytes(stats[2].gzipSize))})`,
  );
  // console.log('\n\nWatching...\n');
});

function fStats(filePath) {
  return {
    size: fs.statSync(filePath).size,
    gzipSize: gzipSize.sync(fs.readFileSync(filePath)),
  };
}
