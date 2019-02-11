#!/usr/bin/env node

// @flow

// Start of the hack for the issue with the webpack watcher that leads to it dying in attempt of watching files
// in node_modules folder which contains circular symbolic links

const DirectoryWatcher = require('watchpack/lib/DirectoryWatcher');
const _oldSetDirectory = DirectoryWatcher.prototype.setDirectory;
DirectoryWatcher.prototype.setDirectory = function(
  directoryPath,
  exist,
  initial,
  type,
) {
  // Any new files created under src/ will trigger a rebuild when in watch mode
  // If we are just adding snapshots, we can safely ignore those
  if (directoryPath.includes('__snapshots__')) return;
  if (directoryPath.includes('__image_snapshots__')) return;
  if (!directoryPath.includes('node_modules')) {
    _oldSetDirectory.call(this, directoryPath, exist, initial, type);
  }
};

// End of the hack

const bolt = require('bolt');
const minimatch = require('minimatch');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const historyApiFallback = require('connect-history-api-fallback');
const flattenDeep = require('lodash.flattendeep');
const createConfig = require('../config');
const utils = require('../config/utils');
const { print, devServerBanner, errorMsg } = require('../banner');

const HOST = 'localhost';
const PORT = +process.env.ATLASKIT_DEV_PORT || 9000;
const stats = require('../config/statsOptions');

async function runDevServer() {
  const workspacesGlobRaw = process.argv.slice(2);
  const report = !!process.argv.find(arg => arg.startsWith('--report'));
  const workspacesGlob = workspacesGlobRaw.map(workspace => {
    return workspace.startsWith('--')
      ? ''
      : workspace.replace(/^['"](.+)['"]$/, '$1'); // Unwrap string from quotes
  });
  const mode = 'development';
  const websiteEnv = 'local';
  const projectRoot = (await bolt.getProject({ cwd: process.cwd() })).dir;
  const workspaces = await bolt.getWorkspaces();
  const filteredWorkspaces = workspacesGlob.map(workspaceGlob => {
    return workspaceGlob
      ? workspaces.filter(ws =>
          minimatch(ws.dir, workspaceGlob, { matchBase: true }),
        )
      : workspaces;
  });

  const globs =
    workspacesGlob.length > 0
      ? utils.createWorkspacesGlob(flattenDeep(filteredWorkspaces), projectRoot)
      : utils.createDefaultGlob();

  if (!globs.length) {
    console.info(
      `${workspacesGlobRaw.toString()}: Nothing to run or pattern does not match!`,
    );
    process.exit(0);
  }

  print(
    devServerBanner({
      workspaces: filteredWorkspaces,
      workspacesGlob: workspacesGlob.toString(),
      port: PORT,
      host: HOST,
      isAll: !workspacesGlob.length,
    }),
  );

  //
  // Creating webpack instance
  //

  const config = createConfig({
    globs,
    mode,
    websiteEnv,
    report,
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
    stats,
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
