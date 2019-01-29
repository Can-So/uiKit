'use strict';
// @flow

/*
 * Setup webdriver clients depending on environment on which the test is run against.
 * BrowserTestCase is customized wrapper over jest-test-runner handling test setup, execution and
 * teardown for webdriver tests .
 */

// increase default jasmine timeout not to fail on webdriver tests as tests run can
// take a while depending on the number of threads executing.

// increase this time out to handle queuing on browserstack
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200e3;
const isBrowserStack = process.env.TEST_ENV === 'browserstack';
const setupClients = require('./utils/setupClients');
const path = require('path');

let clients /*: Array<?Object>*/ = [];

if (isBrowserStack) {
  clients = setupClients.setBrowserStackClients();
} else {
  clients = setupClients.setLocalClients();
}

const launchClient = async client => {
  if (
    client &&
    (client.isReady ||
      (client.driver.requestHandler && client.driver.requestHandler.sessionID))
  ) {
    return;
  }

  client.isReady = true;
  return client.driver.init();
};

const endSession = async client => {
  if (client && client.isReady) {
    client.isReady = false;
    await client.driver.end();
  }
};
const filename = path.basename(module.parent.filename);

beforeAll(async function() {
  const c = [];

  for (const client of clients) {
    if (!client) {
      continue;
    }

    client.driver.desiredCapabilities.name = filename;
    c.push(launchClient(client));
  }

  await Promise.all(c);
});

afterAll(async function() {
  await Promise.all(clients.map(endSession));
});

function BrowserTestCase(
  testCase /*: string */,
  options /*: {skip?: string[]} */,
  tester /*: Tester<Object> */,
) {
  describe(filename, () => {
    let testsToRun = [];
    let skip = [];
    if (options && options.skip) {
      skip = Array.isArray(options.skip) ? options.skip : [];
    }

    clients
      .filter(
        c => c && c.browserName && !skip.includes(c.browserName.toLowerCase()),
      )
      .map(c => {
        testsToRun.push(async fn => {
          if (c && c.driver) {
            await fn(c.driver);
          }
        });
      });

    testRun(testCase, async (...args) => {
      await Promise.all(testsToRun.map(f => f(tester)));
    });
  });
}

/*::
type Tester<Object> = (opts?: Object, done?: () => void) => ?Promise<mixed>;
*/

function testRun(testCase /*: string */, tester /*: Tester<Object>*/) {
  const testFn = test;
  let callback;
  if (tester && tester.length > 1) {
    callback = done => tester(done);
  } else {
    callback = () => tester();
  }
  testFn(testCase, callback);
}

module.exports = { BrowserTestCase };
