'use strict';
// @flow
const webdriverio = require('webdriverio');
const uniqIdentifierStamp = process.env.LOCAL_IDENTIFIER || '';
const commit = process.env.BITBUCKET_COMMIT
  ? process.env.BITBUCKET_COMMIT + uniqIdentifierStamp
  : process.env.USER
  ? process.env.USER + uniqIdentifierStamp
  : uniqIdentifierStamp;

if (!process.env.BITBUCKET_BRANCH && process.env.USER) {
  process.env.BITBUCKET_BRANCH = process.env.USER + '_local_run';
}

function setBrowserStackClients() /*: Array<?Object>*/ {
  const RESOLUTION = '1920x1080';
  let launchers = {
    chrome: {
      os: 'Windows',
      os_version: '10',
      browserName: 'chrome',
      browser_version: '71.0',
      resolution: RESOLUTION,
    },
    firefox: {
      os: 'Windows',
      os_version: '10',
      browserName: 'firefox',
      browser_version: '64.0',
      resolution: RESOLUTION,
      'browserstack.geckodriver': '0.22.0',
      'browserstack.use_w3c': 'true',
    },
    ie: {
      os: 'Windows',
      os_version: '10',
      browserName: 'ie',
      browser_version: '11',
      resolution: RESOLUTION,
    },
    safari: {
      os: 'OS X',
      os_version: 'High Sierra',
      browserName: 'Safari',
      browser_version: '11.0',
      resolution: RESOLUTION,
    },
    edge: {
      os: 'Windows',
      os_version: '10',
      browserName: 'edge',
      browser_version: '17',
      resolution: RESOLUTION,
    },
  };
  if (process.env.LANDKID) {
    delete launchers.safari;
    delete launchers.ie;
    delete launchers.firefox;
    delete launchers.edge;
    process.env.BITBUCKET_BRANCH = 'Landkid';
  }
  const launchKeys = Object.keys(launchers);
  const options = launchKeys.map(launchKey => {
    const option = {
      desiredCapabilities: {
        os: launchers[launchKey].os,
        os_version: launchers[launchKey].os_version,
        browserName: launchers[launchKey].browserName,
        browser_version: launchers[launchKey].browser_version,
        project: 'Atlaskit Webdriver Tests',
        build: process.env.BITBUCKET_BRANCH,
        'browserstack.local': true,
        'browserstack.debug': true,
        'browserstack.idleTimeout': 300,
        'browserstack.localIdentifier': commit,
        resolution: launchers[launchKey].resolution,
      },
      host: 'hub.browserstack.com',
      port: 80,
      user: process.env.BROWSERSTACK_USERNAME,
      key: process.env.BROWSERSTACK_KEY,
      waitforTimeout: 3000,
    };
    const driver = webdriverio.remote(option);
    return {
      browserName: launchers[launchKey].browserName,
      driver: driver,
      isReady: false,
    };
  });

  return options;
}

function setLocalClients() /*: Array<?Object>*/ {
  const port = require('./chromeDriver').port;
  let isHeadless = process.env.HEADLESS !== 'false';
  // Keep only chrome for watch mode
  if (process.env.WATCH === 'true') isHeadless === 'false';
  const windowSize = '--window-size=1920,1080';
  const options = {
    port,
    desiredCapabilities: {
      browserName: 'chrome',
      chromeOptions: isHeadless
        ? { args: ['--headless', windowSize] }
        : { args: [windowSize] },
    },
  };
  const driver = webdriverio.remote(options);
  return [{ browserName: 'chrome', driver: driver, isReady: false }];
}

module.exports = { setLocalClients, setBrowserStackClients };
