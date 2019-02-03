// @flow
const fetch = require('node-fetch');
const get = require('lodash.get');
const sendLogs = require('@atlaskit/analytics-reporting');
/**
 * Test that fail, cause other blocks in the same file to cascade fail
 * So as a result we only pull out the first error as the cascade results aren't useful
 * To determine flaky tests.
 */
const extractResultInformationIntoProperties = results => {
  return results.testResults
    .filter(
      test =>
        test.numFailingTests > 0 ||
        (test.failureMessage && results.numFailedTestSuites > 0),
    )
    .map(test => ({
      failingTests: test.numFailingTests,
      testFilePath: test.testFilePath.replace(process.cwd(), ''), // Relative path to test
      failureMessage:
        get(test, 'testResults[0].failureMessages[0]') || test.failureMessage,
      duration: get(test, 'testResults[0].duration', 0),
      testName: get(test, 'testResults[0].fullName'),
      buildNumber: process.env.BITBUCKET_BUILD_NUMBER,
      branch: process.env.BITBUCKET_BRANCH,
    }));
};

const buildEventPayload = (properties, eventName) => {
  return {
    name: eventName,
    properties,
    server: process.env.CI ? 'master' : 'test',
    product: 'atlaskit',
    user: process.env.CI ? '-' : process.env.USER, // On CI we send as an anonymous user
    serverTime: Date.now(),
  };
};

module.exports = {
  reportFailure(results /*: any */, eventName /*: string */) {
    const properties = extractResultInformationIntoProperties(results);
    if (!properties.length) {
      return;
    }
    return sendLogs(
      JSON.stringify({
        events: properties.map(property =>
          buildEventPayload(property, eventName),
        ),
      }),
      () => {
        console.log(
          `Sent ${properties.length} integration test failure event${
            properties.length > 1 ? 's' : ''
          }`,
        );
      },
    );
  },
  reportLongRunningTests(results /*: any */, threshold /*: number */) {
    return sendLogs(
      JSON.stringify({
        events: results.map(result => {
          return {
            name: 'atlaskit.qa.integration_test.testtimes',
            server: process.env.CI ? 'master' : 'test',
            product: 'atlaskit',
            properties: {
              timeTaken: result.timeTaken,
              testFilePath: result.testFilePath,
              threshold,
            },
            user: process.env.CI ? '-' : process.env.USER, // On CI we send as an anonymous user
            serverTime: Date.now(),
          };
        }),
      }),
    ).then(res => {
      console.log(
        `Sent ${results.length} integration long running tests event${
          results.length > 1 ? 's' : ''
        }`,
      );
    });
  },
};
