/* eslint-disable */
const puppeteer = require('puppeteer');
const JSDOMEnvironment = require('jest-environment-jsdom');
const request = require('request-promise-native');
const fs = require('fs');
const os = require('os');
const path = require('path');
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
const wsEndpointDir = path.join(DIR, 'wsEndpoint');

async function getDockerWsEndpoint() {
  // Retrieve ws endpoint from docker
  const options = {
    uri: `http://localhost:9222/json/version`,
    json: true,
    resolveWithFullResponse: true,
  };
  const response = await request(options);
  console.log('Connecting to webSocket:', response.body.webSocketDebuggerUrl);
  return response.body.webSocketDebuggerUrl;
}

class PuppeteerEnvironment extends JSDOMEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    let wsEndpoint;

    if (process.env.CI) {
      // If it is in CI retrieve wsEndpoint from file stored in global setup
      wsEndpoint = fs.readFileSync(wsEndpointDir, 'utf8');
    } else {
      // Retrieve ws endpoint from docker
      wsEndpoint = await getDockerWsEndpoint();
    }

    if (!wsEndpoint) throw new Error('wsEndpoint not found');

    this.global.browser = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
      ignoreHTTPSErrors: true,
    });
  }
}

module.exports = PuppeteerEnvironment;

module.exports.getDockerWsEndpoint = getDockerWsEndpoint;
