const fetch = require('node-fetch');
const chalk = require('chalk');
const spawndamnit = require('spawndamnit');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const API_URL =
  'https://api.bitbucket.org/2.0/repositories/atlassian/atlaskit-mk-2';

const getBuildStatus = async (hashCommit, maxAttemps = 1, timeout = 2000) => {
  const url = `${API_URL}/commit/${hashCommit}/statuses`;

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
  const url = `${API_URL}/refs/branches/${branchName}`;

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

const getPackagesVersionWithTarURL = (manifest, cdnURL) => {
  const packages = [];
  Object.keys(manifest).forEach(dependency => {
    packages.push(`"${dependency}"@${cdnURL}/${manifest[dependency].tarFile}`);
  });

  return packages;
};

const installFromBranch = async (branchName, options) => {
  const hash = await getCommitHash(branchName);
  const hasBuildFinished = await getBuildStatus(hash, {
    timeout: options.timeout,
    maxAttempts: options.maxAttempts,
  });

  if (!hasBuildFinished) {
    console.log(chalk.red(`Build is not finished yet`));
    process.exit(1);
  }

  const manifest = await getManifest(hash);
  const cdnURL = getCdnUrl(hash);
  const packages = getPackagesVersionWithTarURL(manifest, cdnURL);

  const runner = options.bolt ? 'bolt' : 'yarn';

  if (options.dryRun) {
    packages.forEach(pkg => {
      console.log(chalk.yellow(`${runner} upgrade ${pkg}`));
    });
  } else {
    return spawndamnit(runner, ['upgrade', packages.join(' ')], {
      stdio: 'inherit',
      tty: (process.stdout && process.stdout.isTTY) || false,
    });
  }
};

module.exports = installFromBranch;
