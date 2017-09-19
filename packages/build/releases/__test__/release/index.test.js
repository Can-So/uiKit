const getFixturePath = require('jest-fixtures').getFixturePath;
const pyarn = require('pyarn');
const runRelease = require('../../release').run;
const createRelease = require('../../version/createRelease');
const cli = require('../../../utils/cli');
const git = require('../../../utils/git');
const fs = require('../../../utils/fs');
const isRunningInPipelines = require('../../../utils/isRunningInPipelines');
const logger = require('../../../utils/logger');

jest.mock('../../../utils/cli');
jest.mock('../../../utils/git');
jest.mock('../../../utils/fs');
jest.mock('../../../utils/isRunningInPipelines');
jest.mock('../../version/parseChangeSetCommit');
jest.mock('../../version/createRelease');
jest.mock('../../../utils/logger');

git.getLastPublishCommit.mockImplementation(() => Promise.resolve('xxYYxxY'));
git.getFullCommit.mockImplementation(() => Promise.resolve({}));
git.add.mockImplementation(() => Promise.resolve(true));
git.commit.mockImplementation(() => Promise.resolve(true));
git.push.mockImplementation(() => Promise.resolve(true));
fs.readFile.mockImplementation(() => Promise.resolve('{}'));
pyarn.publish = jest.fn();

const simpleReleaseObj = {
  releases: [{ name: 'pkg-a', commits: ['b8bb699'], version: '1.1.0' }],
  changesets:
  [{ summary: 'This is a summary',
    releases: [{ name: 'pkg-a', type: 'minor' }],
    dependents: [],
    commit: 'b8bb699',
  },
  ],
};

const multipleReleaseObj = {
  releases: [
    { name: 'pkg-a', commits: ['b8bb699'], version: '1.1.0' },
    { name: 'pkg-b', commits: ['b8bb699'], version: '1.0.1' },
  ],
  changesets:
  [{ summary: 'This is a summary',
    releases: [
      { name: 'pkg-a', type: 'minor' },
      { name: 'pkg-b', type: 'patch' },
    ],
    dependents: [],
    commit: 'b8bb699',
  },
  ],
};

describe('running release', () => {
  let cwd;

  beforeAll(async () => {
    cwd = await getFixturePath(__dirname, 'simple-project');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('in a simple project', () => {
    describe('when there are no changeset commits', () => {
      beforeEach(() => {
        git.getChangesetCommitsSince.mockImplementation(() => Promise.resolve([]));
      });

      it('should warn if no changeset commits exist', async () => {
        await runRelease({ cwd });
        const loggerWarnCalls = logger.warn.mock.calls;
        expect(loggerWarnCalls.length).toEqual(1);
        expect(loggerWarnCalls[0][0]).toEqual('No unreleased changesets found since xxYYxxY. Exiting');
      });
    });

    describe('when there are changeset commits', () => {
      // From here, we'll just mock from createRelease and ignore all the git operations (getChangesetCommitsSince, etc)
      beforeAll(() => {
        // We just need there to be a length > 0
        git.getChangesetCommitsSince.mockImplementation(() => Promise.resolve([1, 2, 3]));
      });

      it('should bump releasedPackages', async () => {
        createRelease.mockImplementation(() => simpleReleaseObj);

        await runRelease({ cwd });
        const fsWriteFileCalls = fs.writeFile.mock.calls;

        expect(fsWriteFileCalls.length).toEqual(1);
        const jsonWritten = JSON.parse(fsWriteFileCalls[0][1]);
        expect(jsonWritten).toEqual({ version: '1.1.0' });
      });

      it('should bump multiple released packages if required', async () => {
        createRelease.mockImplementation(() => multipleReleaseObj);

        await runRelease({ cwd });
        const fsWriteFileCalls = fs.writeFile.mock.calls;

        expect(fsWriteFileCalls.length).toEqual(2);
        // first call should be minor bump
        expect(JSON.parse(fsWriteFileCalls[0][1])).toEqual({ version: '1.1.0' });
        // second should be a patch
        expect(JSON.parse(fsWriteFileCalls[1][1])).toEqual({ version: '1.0.1' });
      });

      describe('if not running in CI', () => {
        beforeEach(() => {
          isRunningInPipelines.mockReturnValueOnce(false);
        });

        it('should ask for user confirmation if not running in CI', async () => {
          createRelease.mockImplementation(() => multipleReleaseObj);
          cli.askConfirm.mockReturnValueOnce(Promise.resolve(true));

          await runRelease({ cwd });

          const confirmationCalls = cli.askConfirm.mock.calls;
          expect(confirmationCalls.length).toEqual(1);
          expect(confirmationCalls[0][0]).toEqual('Publish these packages?');
        });

        it('should run publish if user confirms', async () => {
          createRelease.mockImplementation(() => multipleReleaseObj);
          cli.askConfirm.mockReturnValueOnce(Promise.resolve(true));

          await runRelease({ cwd });

          expect(pyarn.publish).toHaveBeenCalled();
        });

        it('should not  run publish if user  doesnt confirms', async () => {
          createRelease.mockImplementation(() => multipleReleaseObj);
          cli.askConfirm.mockReturnValueOnce(Promise.resolve(false));

          await runRelease({ cwd });
          expect(pyarn.publish).not.toHaveBeenCalled();
        });
      });

      describe('if running in CI', () => {
        beforeEach(() => {
          isRunningInPipelines.mockReturnValueOnce(true);
        });

        it('should not ask for user confirmation', async () => {
          createRelease.mockImplementation(() => multipleReleaseObj);

          await runRelease({ cwd });

          const confirmationCalls = cli.askConfirm.mock.calls;
          expect(confirmationCalls.length).toEqual(0);
        });

        it('should run pyarn.publish', async () => {
          createRelease.mockImplementation(() => multipleReleaseObj);

          await runRelease({ cwd });

          expect(pyarn.publish).toHaveBeenCalled();
        });
      });
    });
  });
});
