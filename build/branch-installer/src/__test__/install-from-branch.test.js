const installFromBranch = require('../install-from-branch');

describe('install-from-branch', () => {
  let stubExit;

  beforeEach(() => {
    stubExit = jest.spyOn(process, 'exit');
    stubExit.mockImplementation(jest.fn());
  });

  afterEach(() => {
    stubExit.mockRestore();
  });

  it('should exit 1 when branch name is not given', () => {
    installFromBranch();

    expect(stubExit).toHaveBeenCalledWith(1);
  });
});
