const fetch = require('node-fetch');
const spawndamnit = require('spawndamnit');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getBuildStatus = async (hashCommit, maxAttemps = 1, timeout = 2000) => {
  const url = `https://api.bitbucket.org/2.0/repositories/atlassian/atlaskit-mk-2/commit/${hashCommit}/statuses`;

  let ready = false;
  let attempts = 1;

  while (!ready && attempts <= maxAttemps) {
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        let result = Object.assign({}, { values: [] }, data);
        const pipeline = result.values.filter(x => x.type === 'build')[0] || {};

        if (pipeline.state === 'SUCCESSFUL') {
          ready = true;
        }

        attempts++;
      });

    if (!ready) {
      await sleep(timeout);
    }
  }

  return ready;
};

const getCommitHash = branchName => {
  const url = `https://api.bitbucket.org/2.0/repositories/atlassian/atlaskit-mk-2/refs/branches/${branchName}`;

  return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(jsonResponse) {
      return jsonResponse.target.hash;
    });
};

const getCdnUrl = hash => {
  hash = hash.substr(0, 12);
  return `http://s3-ap-southeast-2.amazonaws.com/atlaskit-artefacts/${hash}/dists`;
};

const getManifest = hash => {
  const url = `${getCdnUrl(hash)}/manifest.json`;

  return fetch(url).then(function(response) {
    return response.json();
  });
};

const installFromBranch = async (branchName, options) => {
  const hash = await getCommitHash(branchName);
  const hasBuildFinished = await getBuildStatus(hash);

  if (!hasBuildFinished) {
    throw 'Build is not finished yet'; //TODO: ADD BUILD STATUS MESSAGE
  }

  const manifest = await getManifest(hash);

  console.log(manifest);

  let boltString = '';
  Object.keys(manifest).forEach(dependency => {
    boltString += ` "${dependency}"@${getCdnUrl(hash)}/${
      manifest[dependency].tarFile
    }`;
  });

  return spawndamnit('bolt', ['upgrade', boltString], {
    stdio: 'inherit',
    tty: (process.stdout && process.stdout.isTTY) || false,
  });
};

module.exports = installFromBranch;
