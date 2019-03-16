import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";

function commitUrl(user, repo, pullrequestid) {
  return "/2.0/repositories/".concat(user, "/").concat(repo, "/pullrequests/").concat(pullrequestid, "/commits");
}

function fetchFolderInfo(user, repo, node, folderPath) {
  return "/2.0/repositories/".concat(user, "/").concat(repo, "/src/").concat(node, "/").concat(folderPath);
}

function getDiffStatFromMasterUrl(user, repo, hash) {
  return "/2.0/repositories/".concat(user, "/").concat(repo, "/diffstat/").concat(hash, "..master");
}

function getFileUrl(user, repo, hash, filePath) {
  return "/2.0/repositories/".concat(user, "/").concat(repo, "/src/").concat(hash, "/").concat(filePath);
}

function promisifyAPRequest(url) {
  return new Promise(function (resolve, reject) {
    window.AP.require('request', function (request) {
      request({
        url: url,
        success: function success(response) {
          resolve(response);
        },
        error: function error(_error) {
          reject(_error);
        }
      });
    });
  });
}

function getFullDiffStat(user, repo, hash) {
  var allValues = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  return promisifyAPRequest(getDiffStatFromMasterUrl(user, repo, hash)).then(function (res) {
    if (res.next) {
      return getFullDiffStat(user, repo, hash, [].concat(_toConsumableArray(allValues), _toConsumableArray(res.values)));
    }

    return [].concat(_toConsumableArray(allValues), _toConsumableArray(res.values));
  });
}
/**
 * If we ever need to make this faster for large PRs, we could calculate the full
 * number of requests after the first request and make serveral at a time in
 * parallel.
 */


export default function getChangesetInfo(user, repo, pullrequestid) {
  var hashPromise = promisifyAPRequest(commitUrl(user, repo, pullrequestid)).then(function (response) {
    if (!response.values) throw new Error('Could not find latest commit on branch');
    return response.values[0].hash;
  });
  return hashPromise.then(function (hash) {
    return getFullDiffStat(user, repo, hash).then(function (allDiffStats) {
      var relevantDiffs = allDiffStats.filter(function (diff) {
        return diff.status !== 'removed';
      }).filter(function (diff) {
        return diff.new.path.match(/\.changeset\/.+?\/changes.json$/);
      }).map(function (diff) {
        return getFileUrl(user, repo, hash, diff.new.path);
      }).map(promisifyAPRequest);
      return Promise.all(relevantDiffs);
    });
  });
}