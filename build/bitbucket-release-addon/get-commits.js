import parseChangesetCommit from '@findable/build-releases/changeset/parseChangesetCommit';

function commitsToValues(response) {
  return response.values;
}

function commitUrl(user, repo, pullrequestid) {
  return "/2.0/repositories/".concat(user, "/").concat(repo, "/pullrequests/").concat(pullrequestid, "/commits");
}

function getCommits(user, repo, pullrequestid, urlNext) {
  return new Promise(function (resolve, reject) {
    window.AP.require('request', function (request) {
      request({
        url: urlNext || commitUrl(user, repo, pullrequestid, urlNext),
        success: function success(response) {
          if (response.next) {
            getCommits(user, repo, pullrequestid, response.next).then(function (commits) {
              resolve(commitsToValues(response).concat(commits));
            });
          } else {
            resolve(commitsToValues(response));
          }
        },
        error: function error(ex) {
          reject("failed due to ".concat(ex.toString()));
        }
      });
    });
  });
}

export default function getCommitsThenParse(user, repo, pullrequestid) {
  return getCommits(user, repo, pullrequestid).then(function (commits) {
    return commits.map(function (commit) {
      return commit.message;
    }).filter(function (commit) {
      return !!commit.match(/^CHANGESET: .+?\n/);
    }).map(parseChangesetCommit) // remove any changesets that couldn't be parsed
    .filter(function (changsetOrUndefined) {
      return !!changsetOrUndefined;
    });
  });
}