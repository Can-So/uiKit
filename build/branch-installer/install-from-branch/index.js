import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";

var fetch = require('node-fetch');

var chalk = require('chalk');

var spawndamnit = require('spawndamnit');

var prettyjson = require('prettyjson');

var sleep = function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

var log = function log(debug) {
  if (debug) {
    return function (message) {
      if (typeof message === 'string') {
        console.log(chalk.cyan(message));
      } else {
        console.log(prettyjson.render(message));
      }
    };
  }

  return function () {};
};

var CUSTOM_BUILD_DEPLOY_BRANCH_BUILD_DISTS_KEY = '-1200669939';
var API_URL = 'https://api.bitbucket.org/2.0/repositories/atlassian/atlaskit-mk-2';

var fetchVerbose =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(url) {
    var options,
        info,
        response,
        result,
        _args = arguments;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

            info = options.info || function () {};

            info("Trying to fetch ".concat(url));
            _context.next = 5;
            return fetch(url);

          case 5:
            response = _context.sent;
            info("HTTP Code ".concat(response.status));
            _context.next = 9;
            return response.json();

          case 9:
            result = _context.sent;
            info(result);
            return _context.abrupt("return", result);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function fetchVerbose(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getBuildStatus =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2(hashCommit, options) {
    var _ref3, _ref3$maxAttempts, maxAttempts, _ref3$timeout, timeout, _ref3$info, info, url, buildStatus, attempts, pipeline;

    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref3 = options || {}, _ref3$maxAttempts = _ref3.maxAttempts, maxAttempts = _ref3$maxAttempts === void 0 ? 1 : _ref3$maxAttempts, _ref3$timeout = _ref3.timeout, timeout = _ref3$timeout === void 0 ? 2000 : _ref3$timeout, _ref3$info = _ref3.info, info = _ref3$info === void 0 ? function () {} : _ref3$info;
            info("Get build status for ".concat(hashCommit, " commit"));
            url = "".concat(API_URL, "/commit/").concat(hashCommit, "/statuses/build/").concat(CUSTOM_BUILD_DEPLOY_BRANCH_BUILD_DISTS_KEY);
            buildStatus = false;
            attempts = 1;

          case 5:
            if (!(buildStatus !== 'SUCCESSFUL' && attempts <= maxAttempts)) {
              _context2.next = 16;
              break;
            }

            _context2.next = 8;
            return fetchVerbose(url, {
              info: info
            });

          case 8:
            pipeline = _context2.sent;
            buildStatus = (pipeline || {}).state;
            attempts++;

            if (!(buildStatus !== 'SUCCESSFUL' && maxAttempts > 1)) {
              _context2.next = 14;
              break;
            }

            _context2.next = 14;
            return sleep(timeout);

          case 14:
            _context2.next = 5;
            break;

          case 16:
            return _context2.abrupt("return", buildStatus);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getBuildStatus(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var getCommitHash =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee3(branchName) {
    var options,
        info,
        url,
        response,
        _args3 = arguments;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};

            info = options.info || function () {};

            info("Get commit hash for ".concat(branchName));
            url = "".concat(API_URL, "/refs/branches/").concat(branchName);
            _context3.next = 6;
            return fetchVerbose(url, options);

          case 6:
            response = _context3.sent;
            return _context3.abrupt("return", response.target.hash);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getCommitHash(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

var getCdnUrl = function getCdnUrl(hash) {
  hash = hash.substr(0, 12);
  return "http://s3-ap-southeast-2.amazonaws.com/atlaskit-artefacts/".concat(hash, "/dists");
};

var getManifest = function getManifest(cdnURL, _ref5) {
  var info = _ref5.info;
  var url = "".concat(cdnURL, "/manifest.json");
  return fetchVerbose(url, {
    info: info
  });
};

var getPackagesVersionWithTarURL = function getPackagesVersionWithTarURL(manifest, cdnURL) {
  var packages = [];
  Object.keys(manifest).forEach(function (dependency) {
    packages.push("\"".concat(dependency, "@").concat(cdnURL, "/").concat(manifest[dependency].tarFile, "\""));
  });
  return packages;
};

var checkBuildStatus = function checkBuildStatus(buildStatus) {
  if (!buildStatus) {
    console.log(chalk.black.bgRed('Build for deploy-branch-build-dists does not exist, you should run it on custom pipeline options'));
    return false;
  }

  if (buildStatus === 'INPROGRESS') {
    console.log(chalk.red('Build for deploy-branch-build-dists is running, you need to wait until the build finish'));
    return false;
  }

  if (buildStatus !== 'SUCCESSFUL') {
    console.log(chalk.black.bgRed.bold('Build for deploy-branch-build-dists is broken, please check it and try again later'));
    return false;
  }

  return true;
};

var installFromBranch =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee4(branchName) {
    var options,
        info,
        hash,
        buildStatus,
        cdnURL,
        manifest,
        packages,
        runner,
        dryRun,
        _args4 = arguments;
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};

            if (branchName) {
              _context4.next = 4;
              break;
            }

            process.exit(1);
            return _context4.abrupt("return", false);

          case 4:
            info = log(options.verbose);
            _context4.next = 7;
            return getCommitHash(branchName, {
              info: info
            });

          case 7:
            hash = _context4.sent;
            _context4.next = 10;
            return getBuildStatus(hash, {
              timeout: options.timeout,
              maxAttempts: options.maxAttempts,
              info: info
            });

          case 10:
            buildStatus = _context4.sent;

            if (!checkBuildStatus(buildStatus)) {
              process.exit(1);
            }

            cdnURL = getCdnUrl(hash);
            _context4.next = 15;
            return getManifest(cdnURL, {
              info: info
            });

          case 15:
            manifest = _context4.sent;
            packages = getPackagesVersionWithTarURL(manifest, cdnURL);
            runner = options.bolt ? 'bolt' : 'yarn';

            if (!options.dryRun) {
              _context4.next = 24;
              break;
            }

            dryRun = packages.map(function (pkg) {
              return "".concat(runner, " upgrade ").concat(pkg);
            });
            dryRun.forEach(function (pkg) {
              return console.log(chalk.yellow(pkg));
            });
            return _context4.abrupt("return", dryRun);

          case 24:
            return _context4.abrupt("return", spawndamnit(runner, ['upgrade', packages.join(' ')], {
              stdio: 'inherit',
              tty: process.stdout && process.stdout.isTTY || false
            }));

          case 25:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function installFromBranch(_x5) {
    return _ref6.apply(this, arguments);
  };
}();

module.exports = installFromBranch;
module.exports.getCommitHash = getCommitHash;
module.exports.getBuildStatus = getBuildStatus;
module.exports.checkBuildStatus = checkBuildStatus;
module.exports.getPackagesVersionWithTarURL = getPackagesVersionWithTarURL;