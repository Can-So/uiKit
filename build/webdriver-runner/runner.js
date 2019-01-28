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

function BrowserTestCase(testCase, options, tester) {
  if (!tester && typeof options === 'function') {
    tester = options;
  } else if (!tester) {
    console.error('Nothing to test!!!!');
    return false;
  }

  describe(filename, () => {
    let testsToRun = [];
    let skip = Array.isArray(options.skip) ? options.skip : [];
    clients
      .filter(c => !skip.includes(c.browserName.toLowerCase()))
      .map(c => {
        testsToRun.push(async (fn, ...args) => {
          await fn(c.driver, ...args);
        });
      });

    testRun(testCase, async (...args) => {
      await Promise.all(testsToRun.map(f => f(tester, ...args)));
    });
  });
}

/*::
type Tester<Object> = (opts?: Object, done?: () => void) => ?Promise<mixed>;
*/

function testRun(
  testCase /*: {name:string, skip?:boolean ,only?:boolean}*/,
  tester /*: Tester<Object>*/,
) {
  let testFn;
  if (testCase.only) {
    testFn = test.only;
  } else if (testCase.skip) {
    testFn = test.skip;
  } else {
    testFn = test;
  }

  let callback;
  if (tester && tester.length > 1) {
    callback = done => tester(done);
  } else {
    callback = () => tester();
  }
  // $FlowFixMe: Coerce object to string
  testFn(`${testCase}`, callback);
}

module.exports = { BrowserTestCase };
