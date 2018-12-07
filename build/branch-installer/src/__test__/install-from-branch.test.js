const fetchMock = require('fetch-mock').sandbox();
jest.setMock('node-fetch', fetchMock);

const installFromBranch = require('../install-from-branch');
const {
  getCommitHash,
  getBuildStatus,
  checkBuildStatus,
  getPackagesVersionWithTarURL,
} = require('../install-from-branch');

describe('install-from-branch', () => {
  let stubExit;

  beforeEach(() => {
    stubExit = jest.spyOn(process, 'exit');
    stubExit.mockImplementation(jest.fn());
  });

  afterEach(() => {
    stubExit.mockRestore();
    fetchMock.restore();
  });

  it('should exit 1 when branch name is not given', () => {
    installFromBranch();
    expect(stubExit).toHaveBeenCalledWith(1);
  });

  describe('#getCommitHash', () => {
    it('should get commit hash from branch name ', async done => {
      fetchMock.mock(/fake-branch$/, { target: { hash: '#fakeHash' } });
      const result = await getCommitHash('fake-branch');

      expect(result).toBe('#fakeHash');
      done();
    });
  });

  describe('#getBuildStatus', () => {
    it('should get build status from hash', async done => {
      fetchMock.mock(/.*(statuses\/build).*/, { state: 'SUCCESSFUL' });
      const result = await getBuildStatus('#hashCommit');

      expect(result).toBe('SUCCESSFUL');
      done();
    });
  });

  describe('#checkBuildStatus', () => {
    it('should returns true for SUCCESSFUL status', () => {
      const result = checkBuildStatus('SUCCESSFUL');

      expect(result).toBeTruthy();
    });

    it('should returns false for any other status', () => {
      const result = checkBuildStatus('OTHER');

      expect(result).toBeFalsy();
    });
  });

  describe('#getPackagesVersionWithTarURL', () => {
    it('should returns the packages in install description mode', () => {
      const cdnUrl = 'https://fake';
      const packges = {
        dep1: {
          tarFile: '111.tar',
        },
        dep2: {
          tarFile: '222.tar',
        },
      };
      const result = getPackagesVersionWithTarURL(packges, cdnUrl);

      expect(result).toEqual([
        '"dep1@https://fake/111.tar"',
        '"dep2@https://fake/222.tar"',
      ]);
    });
  });
});
