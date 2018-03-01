#!/usr/bin/env node

// @flow

// Start of the hack for the issue with the webpack watcher that leads to it dying in attempt of watching files
// in node_modules folder which contains circular symbolic links

const DirectoryWatcher = require('watchpack/lib/DirectoryWatcher');
const _oldcreateNestedWatcher = DirectoryWatcher.prototype.createNestedWatcher;
DirectoryWatcher.prototype.createNestedWatcher = function(
  dirPath /*: string */,
) {
  if (dirPath.includes('node_modules')) return;
  _oldcreateNestedWatcher.call(this, dirPath);
};

// End of the hack

const bolt = require('bolt');
const minimatch = require('minimatch');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const historyApiFallback = require('connect-history-api-fallback');
const createConfig = require('../config/iframe-config.js');
const utils = require('../config/utils');
const { print, devServerBanner, errorMsg } = require('../banner');

const HOST = 'localhost';
const PORT = 9001;

async function runDevServer() {
  const [entry, workspacesGlobRaw = ''] = process.argv.slice(2);
  const workspacesGlob = workspacesGlobRaw.replace(/^['"](.+)['"]$/, '$1'); // Unwrap string from quotes
  const env = 'development';
  const includePatterns = workspacesGlob ? false : true; // if glob exists we just want to show what matches it
  const projectRoot = (await bolt.getProject({ cwd: process.cwd() })).dir;
  const workspaces = await bolt.getWorkspaces();

  const filteredWorkspaces = workspacesGlob
    ? workspaces.filter(ws =>
        minimatch(ws.dir, workspacesGlob, { matchBase: true }),
      )
    : workspaces;

  const globs = workspacesGlob
    ? utils.createWorkspacesGlob(filteredWorkspaces, projectRoot)
    : utils.createDefaultGlob();

  if (!globs.length) {
    print(
      errorMsg({
        title: 'Nothing to run',
        msg: `Pattern "${workspacesGlob}" doesn't match anything.`,
      }),
    );

    process.exit(2);
  }

  print(
    devServerBanner({
      entry,
      workspacesGlob,
      workspaces: filteredWorkspaces,
      port: PORT,
      host: HOST,
      isAll: !workspacesGlob,
    }),
  );

  //
  // Creating webpack instance
  //

  const config = createConfig({
    entry,
    host: HOST,
    port: PORT,
    globs,
    env,
    includePatterns,
  });

  const compiler = webpack(config);

  //
  // Starting Webpack Dev Server
  //

  const server = new WebpackDevServer(compiler, {
    // Enable gzip compression of generated files.
    compress: true,

    historyApiFallback: true,

    overlay: true,
    stats: {
      colors: true,
      assets: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: true,
    },
  });

  return new Promise((resolve, reject) => {
    server.listen(PORT, HOST, err => {
      if (err) {
        console.log(err.stack || err);
        return reject(1);
      }

      server.use(
        historyApiFallback({
          disableDotRule: true,
          htmlAcceptHeaders: ['text/html'],
        }),
      );
    });
  });
}

runDevServer().catch(err => process.exit(err));
