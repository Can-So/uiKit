'use strict';
const jest = require('jest');
const meow = require('meow');
const reporting = require('./reporting');

const LONG_RUNNING_TESTS_THRESHOLD_SECS = 30;

process.env.NODE_ENV = 'test';

const cli = meow({
  flags: {
    updateSnapshot: {
      type: 'boolean',
      alias: 'u',
    },
    watch: {
      type: 'boolean',
    },
    runInBand: {
      type: 'boolean',
    },
    passWithNoTests: {
      type: 'boolean',
    },
  },
});

async function main(testPaths) {
  const status = await jest.runCLI(
    {
      _: cli.input,
      watch: cli.flags.watch || !!process.env.WATCH,
      updateSnapshot: cli.flags.updateSnapshot,
      passWithNoTests: cli.flags.passWithNoTests,
      runInBand: cli.flags.runInBand,
    },
    [process.cwd()],
  );

  const longRunningTests = status.results.testResults
    .filter(result => {
      const timeTaken = (result.perfStats.end - result.perfStats.start) / 3600;
      return timeTaken > LONG_RUNNING_TESTS_THRESHOLD_SECS;
    })
    .map(result => {
      return {
        testFilePath: result.testFilePath.replace(process.cwd(), ''),
        timeTaken: +(
          (result.perfStats.end - result.perfStats.start) /
          3600
        ).toFixed(2),
      };
    });

  if (longRunningTests.length) {
    reporting.reportLongRunningTests(
      longRunningTests,
      LONG_RUNNING_TESTS_THRESHOLD_SECS,
    );
  }
  process.exit(!status.results || status.results.success ? 0 : 1);
}

main().catch(err => {
  console.error(err.toString());
  process.exit(1);
});
