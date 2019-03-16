function commitUrl(user, repo, pullrequestid) {
  return `/2.0/repositories/${user}/${repo}/pullrequests/${pullrequestid}/commits`;
}

function fetchFolderInfo(user, repo, node, folderPath) {
  return `/2.0/repositories/${user}/${repo}/src/${node}/${folderPath}`;
}

function getDiffStatFromMasterUrl(user, repo, hash) {
  return `/2.0/repositories/${user}/${repo}/diffstat/${hash}..master`;
}

function getFileUrl(user, repo, hash, filePath) {
  return `/2.0/repositories/${user}/${repo}/src/${hash}/${filePath}`;
}

function promisifyAPRequest(url) {
  return new Promise((resolve, reject) => {
    window.AP.require('request', request => {
      request({
        url: url,
        success(response) {
          resolve(response);
        },
        error(error) {
          reject(error);
        },
      });
    });
  });
}

function getFullDiffStat(user, repo, hash, allValues = []) {
  return promisifyAPRequest(getDiffStatFromMasterUrl(user, repo, hash)).then(
    res => {
      if (res.next) {
        return getFullDiffStat(user, repo, hash, [...allValues, ...res.values]);
      }
      return [...allValues, ...res.values];
    },
  );
}

/**
 * If we ever need to make this faster for large PRs, we could calculate the full
 * number of requests after the first request and make serveral at a time in
 * parallel.
 */
export default function getChangesetInfo(user, repo, pullrequestid) {
  let hashPromise = promisifyAPRequest(
    commitUrl(user, repo, pullrequestid),
  ).then(response => {
    if (!response.values)
      throw new Error('Could not find latest commit on branch');
    return response.values[0].hash;
  });
  return hashPromise.then(hash =>
    getFullDiffStat(user, repo, hash).then(allDiffStats => {
      const relevantDiffs = allDiffStats
        .filter(diff => diff.status !== 'removed')
        .filter(diff => diff.new.path.match(/\.changeset\/.+?\/changes.json$/))
        .map(diff => getFileUrl(user, repo, hash, diff.new.path))
        .map(promisifyAPRequest);
      return Promise.all(relevantDiffs);
    }),
  );
}
