const sendLogs = require('@atlaskit/analytics-reporting');

module.exports = {
  reportLongRunningTests(tests, threshold) {
    return sendLogs(
      JSON.stringify({
        events: tests.map(result => {
          return {
            name: 'atlaskit.qa.unit_test.testtimes',
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
        `Sent ${tests.length} long running unit tests event${
          tests.length > 1 ? 's' : ''
        }`,
      );
    });
  },
};
