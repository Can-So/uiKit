const fetch = require('node-fetch');
const spawndamnit = require('spawndamnit');

const getBuildStatus = async branchName => {
  const url =
    '/2.0/repositories/{username}/{repo_slug}/pipelines/{pipeline_uuid}/steps/';
  console.log('TODO: Implement me');
  return true;
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
  // const url = `${getCdnUrl(hash)}/manifest.json`;
  const url = `${getCdnUrl(hash)}/metadata.json`;

  return fetch(url).then(function(response) {
    return response.json();
  });
  4;
};

const installFromBranch = async (branchName, options) => {
  const hasBuildFinished = await getBuildStatus(branchName);

  if (!hasBuildFinished) {
    throw 'Build is not finished yet'; //TODO: ADD BUILD STATUS MESSAGE
  }

  const hash = await getCommitHash(branchName);
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
