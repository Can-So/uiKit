import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";

var fetchMock = require('fetch-mock').sandbox();

jest.setMock('node-fetch', fetchMock);

var installFromBranch = require('../install-from-branch');

var _require = require('../install-from-branch'),
    getCommitHash = _require.getCommitHash,
    getBuildStatus = _require.getBuildStatus,
    checkBuildStatus = _require.checkBuildStatus,
    getPackagesVersionWithTarURL = _require.getPackagesVersionWithTarURL;

describe('install-from-branch', function () {
  var stubExit;
  beforeEach(function () {
    stubExit = jest.spyOn(process, 'exit');
    stubExit.mockImplementation(jest.fn());
  });
  afterEach(function () {
    stubExit.mockRestore();
    fetchMock.restore();
  });
  it('should exit 1 when branch name is not given', function () {
    installFromBranch();
    expect(stubExit).toHaveBeenCalledWith(1);
  });
  describe('#installFromBranch', function () {
    beforeEach(function () {
      fetchMock.mock(/branch-test$/, {
        target: {
          hash: '#fakeHash'
        }
      }).mock(/.*(statuses\/build).*/, {
        state: 'SUCCESSFUL'
      }).mock(/manifest\.json$/, {
        dep1: {
          tarFile: '111.tar'
        }
      });
    });
    it('should returns array of yarn/bolt upgrade packages',
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee(done) {
        var result;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return installFromBranch('branch-test', {
                  dryRun: true
                });

              case 2:
                result = _context.sent;
                expect(result).toEqual(['yarn upgrade "dep1@http://s3-ap-southeast-2.amazonaws.com/atlaskit-artefacts/#fakeHash/dists/111.tar"']);
                done();

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  });
  describe('#getCommitHash', function () {
    it('should get commit hash from branch name ',
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee2(done) {
        var result;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                fetchMock.mock(/fake-branch$/, {
                  target: {
                    hash: '#fakeHash'
                  }
                });
                _context2.next = 3;
                return getCommitHash('fake-branch');

              case 3:
                result = _context2.sent;
                expect(result).toBe('#fakeHash');
                done();

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());
  });
  describe('#getBuildStatus', function () {
    it('should get build status from hash',
    /*#__PURE__*/
    function () {
      var _ref3 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime.mark(function _callee3(done) {
        var result;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                fetchMock.mock(/.*(statuses\/build).*/, {
                  state: 'SUCCESSFUL'
                });
                _context3.next = 3;
                return getBuildStatus('#hashCommit');

              case 3:
                result = _context3.sent;
                expect(result).toBe('SUCCESSFUL');
                done();

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }());
  });
  describe('#checkBuildStatus', function () {
    it('should returns true for SUCCESSFUL status', function () {
      var result = checkBuildStatus('SUCCESSFUL');
      expect(result).toBeTruthy();
    });
    it('should returns false for any other status', function () {
      var result = checkBuildStatus('OTHER');
      expect(result).toBeFalsy();
    });
  });
  describe('#getPackagesVersionWithTarURL', function () {
    it('should returns the packages in install description mode', function () {
      var cdnUrl = 'https://fake';
      var packges = {
        dep1: {
          tarFile: '111.tar'
        },
        dep2: {
          tarFile: '222.tar'
        }
      };
      var result = getPackagesVersionWithTarURL(packges, cdnUrl);
      expect(result).toEqual(['"dep1@https://fake/111.tar"', '"dep2@https://fake/222.tar"']);
    });
  });
});