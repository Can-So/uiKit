const fetchMock = require('fetch-mock').sandbox();
jest.setMock('node-fetch', fetchMock);

const installFromBranch = require('../install-from-branch');
const { getCommitHash } = require('../install-from-branch');

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
});
