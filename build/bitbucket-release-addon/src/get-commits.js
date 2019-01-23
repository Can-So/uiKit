import parseChangesetCommit from '@atlaskit/build-releases/changeset/parseChangesetCommit';

function commitsToValues(response) {
  return response.values;
}

function commitUrl(user, repo, pullrequestid, page) {
  if (page) {
    return `/2.0/repositories/${user}/${repo}/pullrequests/${pullrequestid}/commits?page=${page}`;
  } else {
    return `/2.0/repositories/${user}/${repo}/pullrequests/${pullrequestid}/commits`;
  }
}

function getCommits(user, repo, pullrequestid, page) {
  return new Promise((resolve, reject) => {
    window.AP.require('request', request => {
      request({
        url: commitUrl(user, repo, pullrequestid, page),
        success(response) {
          if (response.next) {
            page = response.page;
            getCommits(user, repo, pullrequestid, page + 1).then(commits => {
              resolve(commitsToValues(response).concat(commits));
            });
          } else {
            resolve(commitsToValues(response));
          }
        },
        error(ex) {
          reject(`failed due to ${ex.toString()}`);
        },
      });
    });
  });
}

export default function getCommitsThenParse(user, repo, pullrequestid) {
  return getCommits(user, repo, pullrequestid).then(commits =>
    commits
      .map(commit => commit.message)
      .filter(commit => !!commit.match(/^CHANGESET: .+?\n/))
      .map(parseChangesetCommit)
      // remove any changesets that couldn't be parsed
      .filter(changsetOrUndefined => !!changsetOrUndefined),
  );
}
