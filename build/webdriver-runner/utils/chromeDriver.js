// @flow
'use strict';
const chromedriver = require('chromedriver');

/*
 * util module to support
 *   a. install chrome-driver
 *   b. start and stop chrome driver server
 */

const port = 9515;
const args = ['--url-base=wd/hub', `--port=${port}`];

async function startServer() {
  chromedriver.start(args);
  console.log('Started chrome server');
}

function stopServer() {
  chromedriver.stop();
  console.log('Stopping chrome server');
}

module.exports = { startServer, stopServer, port };
