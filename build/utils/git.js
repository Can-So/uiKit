const spawn = require('projector-spawn');
const path = require('path');

const parseChangesetCommit = require('../releases/changeset/parseChangesetCommit');

// Parses lines that are in the form 'HASH message goes here'
const parseCommitLine = line => {
  // ignore first result, it is the whole pattern match
  const [_, hash, message] = line.match(/([^ ]+) (.+)/);
  return { commit: hash, message };
};

async function getCommitsSince(ref) {
  const gitCmd = await spawn('git', [
    'rev-list',
    '--no-merges',
    '--abbrev-commit',
    `${ref}..HEAD`,
  ]);
  return gitCmd.stdout.trim().split('\n');
}

async function getChangedFilesSince(ref, fullPath = false) {
  // First we need to find the commit where we diverged from `ref` at using `git merge-base`
  let cmd = await spawn('git', ['merge-base', ref, 'HEAD']);
  const divergedAt = cmd.stdout.trim();
  // Now we can find which files we added
  cmd = await spawn('git', ['diff', '--name-only', divergedAt]);
  const files = cmd.stdout.trim().split('\n');
  if (!fullPath) return files;
  return files.map(file => path.resolve(file));
}

async function getBranchName() {
  const gitCmd = await spawn('git', ['rev-parse', '--abrev-ref', 'HEAD']);
  return gitCmd.stdout.trim().split('\n');
}

async function getMasterRef() {
  const gitCmd = await spawn('git', ['rev-parse', 'master']);
  return gitCmd.stdout.trim().split('\n')[0];
}

async function add(pathToFile) {
  const gitCmd = await spawn('git', ['add', pathToFile]);
  return gitCmd.code === 0;
}

async function commit(message) {
  const gitCmd = await spawn('git', ['commit', '-m', message, '--allow-empty']);
  return gitCmd.code === 0;
}

async function push(args = []) {
  const gitCmd = await spawn('git', ['push', ...args]);
  return gitCmd.code === 0;
}

// used to create a single tag at a time for the current head only
async function tag(tagStr) {
  const gitCmd = await spawn('git', ['tag', tagStr]);
  return gitCmd.code === 0;
}

async function rebase(maxAttempts = 3) {
  let attempts = 0;
  let rebased = false;
  let lastError = {};

  while (!rebased) {
    attempts++;
    try {
      await spawn('git', ['pull', '--rebase']);
      rebased = true;
    } catch (e) {
      lastError = e;
      if (attempts >= maxAttempts) {
        break;
      }
    }
  }

  if (!rebased) {
    throw new Error(
      `Failed to rebase after ${maxAttempts} attempts\n${JSON.stringify(
        lastError,
      )}`,
    );
  }
}

// We expose this as a combined command because we want to be able to do both commands
// atomically
async function rebaseAndPush(maxAttempts = 3) {
  let attempts = 0;
  let pushed = false;
  let lastError = {};

  while (!pushed) {
    attempts++;
    try {
      await spawn('git', ['pull', '--rebase']);
      await spawn('git', ['push', '--follow-tags']);
      pushed = true;
    } catch (e) {
      lastError = e;
      if (attempts >= maxAttempts) {
        break;
      }
    }
  }

  if (!pushed) {
    throw new Error(
      `Failed to push after ${maxAttempts} attempts.\n${JSON.stringify(
        lastError,
      )}`,
    );
  }
}

// helper method for getAllReleaseCommits and getAllChangesetCommits as they are almost identical
async function getAndParseJsonFromCommitsStartingWith(str) {
  // --grep lets us pass a regex, -z splits commits using NUL instead of newlines
  const gitCmd = await spawn('git', [
    'log',
    '--grep',
    `^${str}`,
    '-z',
    '--no-merges',
  ]);
  const result = gitCmd.stdout.trim().split('\0');
  const parsedCommits = result
    .map(parseFullCommit)
    // unfortunately, we have left some test data in the repo, which wont parse properly, so we
    // need to manually pull it out here.
    .filter(parsed => parsed.message.includes('---'))
    .map(parsedCommit => {
      const commit = parsedCommit.commit;
      const changeset = parseChangesetCommit(parsedCommit.message);
      if (!changeset) return undefined;
      // we only care about the changeset and the commit
      return { ...changeset, commit };
    })
    // this filter is for the same reason as above due to some unparsable JSON strings
    .filter(parsed => !!parsed);

  return parsedCommits;
}

async function getAllReleaseCommits() {
  return getAndParseJsonFromCommitsStartingWith('RELEASING: ');
}

async function getAllChangesetCommits() {
  return getAndParseJsonFromCommitsStartingWith('CHANGESET: ');
}

// TODO: This function could be a lot cleaner, simpler and less error prone if we played with
// the pretty format stuff from `git log` to make sure things will always be as we expect
// (i.e this function breaks if you dont put '--no-merges' in the git log command)
function parseFullCommit(commitStr) {
  const lines = commitStr.trim().split('\n');

  const hash = lines
    .shift()
    .replace('commit ', '')
    .substring(0, 7);
  const author = lines.shift().replace('Author: ', '');
  const date = new Date(
    lines
      .shift()
      .replace('Date: ', '')
      .trim(),
  );

  // remove the extra padding added by git show
  const message = lines
    .map(line => line.replace('    ', ''))
    .join('\n')
    .trim(); // There is one more extra line added by git
  return {
    commit: hash,
    author,
    date,
    message,
  };
}

async function getLastPublishCommit() {
  const isPublishCommit = msg => msg.startsWith('RELEASING: ');

  const gitCmd = await spawn('git', ['log', '-n', '500', '--oneline']);
  const result = gitCmd.stdout
    .trim()
    .split('\n')
    .map(line => parseCommitLine(line));
  const latestPublishCommit = result.find(res => isPublishCommit(res.message));

  return latestPublishCommit.commit;
}

async function getUnpublishedChangesetCommits() {
  // We fetch **all** of the commits because otherwise we can end up in race conditions where a
  // master build is running and another changeset is merged whilst its still running (the new
  // changeset would be released without being tested)
  const releaseCommits = await getAllReleaseCommits();
  const changesetCommits = await getAllChangesetCommits();
  // to find unpublished commits, we'll go through them one by one and compare them to all release
  // commits and see if there are any that dont have a release commit that matches them
  const unpublishedCommits = changesetCommits.filter(cs => {
    return !releaseCommits.find(publishCommit => {
      // release commits have references to the changesets that they come from
      return publishCommit.changesets.find(changeset => {
        return changeset.commit === cs.commit;
      });
    });
  });

  return unpublishedCommits;
}

module.exports = {
  getCommitsSince,
  getChangedFilesSince,
  getBranchName,
  getMasterRef,
  add,
  commit,
  push,
  tag,
  rebase,
  rebaseAndPush,
  getUnpublishedChangesetCommits,
  getAllReleaseCommits,
  getAllChangesetCommits,
  getLastPublishCommit,
};
