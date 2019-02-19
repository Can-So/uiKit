/* eslint-disable */
const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
const docker = require('../../docker-helper');

/**
 * Start puppeteer service
 *  - CI start local puppeteer
 *  - Local start a docker instance running puppeteer
 */
async function globalSetup() {
  if (process.env.CI) {
    // If it is in CI start puppeteer and stored websocket endpoint
    // launch and run puppeteer if inside of CI
    console.log('puppeteer:', puppeteer.executablePath());
    const puppeteerOptions = {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
    };
    if (process.env.DEBUG == 'true') {
      puppeteerOptions.slowMo = 100;
      puppeteerOptions.headless = false;
    }
    const browser = await puppeteer.launch(puppeteerOptions);
    global.__BROWSER__ = browser;
    mkdirp.sync(DIR);
    fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint()); // Shared endpoint with all thread nodes
  } else {
    await docker.startDocker();
  }
}

module.exports = globalSetup;
