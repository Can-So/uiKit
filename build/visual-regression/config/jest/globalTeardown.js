/* eslint-disable */
const os = require('os');
const path = require('path');
const puppeteer = require('puppeteer');
const rimraf = require('rimraf');
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
const getDockerWsEndpoint = require('./jsdomEnvironment').getDockerWsEndpoint;
const docker = require('../../docker-helper');

/**
 * Shutdown all puppeteer services
 *  - CI stop local puppeteer
 *  - Local stop docker
 */
async function globalTeardown() {
  if (process.env.CI) {
    // Close browser created in globalSetup and remove web socket file
    await global.__BROWSER__.close();
    rimraf.sync(DIR);
  } else {
    // Connect to docker puppeteer to close browser
    const wsEndpoint = await getDockerWsEndpoint();
    dockerBrowser = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
      ignoreHTTPSErrors: true,
    });

    dockerBrowser.close();

    // Stop docker execution
    await docker.stopDocker();
  }
}

module.exports = globalTeardown;
