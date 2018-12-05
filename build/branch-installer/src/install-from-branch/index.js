const fetch = require('node-fetch');
const chalk = require('chalk');
const spawndamnit = require('spawndamnit');
const prettyjson = require('prettyjson');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const log = debug => {
  if (debug) {
    return message => {
      if (typeof message === 'string') {
        console.log(chalk.cyan(message));
      } else {
        console.log(prettyjson.render(message));
      }
    };
  }

  return () => {};
};

const API_URL =
  'https://api.bitbucket.org/2.0/repositories/atlassian/atlaskit-mk-2';

const fetchVerbose = async (url, { info }) => {
  info(`Trying to fetch ${url}`);

  let response = await fetch(url);
  info(`HTTP Code ${response.status}`);
  let result = await response.json();
  info(result);

  return result;
};

const getBuildStatus = async (
  hashCommit,
  { maxAttemps = 1, timeout = 2000, info },
) => {
  info(`Get build status for ${hashCommit} commit`);
  const url = `${API_URL}/commit/${hashCommit}/statuses`;

  let ready = false;
  let attempts = 1;

  while (!ready && attempts <= maxAttemps) {
    await fetchVerbose(url, { info }).then(data => {
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

const getCommitHash = (branchName, { info }) => {
  info(`Get commit hash for ${branchName}`);
  const url = `${API_URL}/refs/branches/${branchName}`;

  return fetchVerbose(url, { info }).then(function(jsonResponse) {
    return jsonResponse.target.hash;
  });
};

const getCdnUrl = hash => {
  hash = hash.substr(0, 12);
  return `http://s3-ap-southeast-2.amazonaws.com/atlaskit-artefacts/${hash}/dists`;
};

const getManifest = (cdnURL, { info }) => {
  const url = `${cdnURL}/manifest.json`;
  return fetchVerbose(url, { info });
};

const getPackagesVersionWithTarURL = (manifest, cdnURL) => {
  const packages = [];
  Object.keys(manifest).forEach(dependency => {
    packages.push(`"${dependency}@${cdnURL}/${manifest[dependency].tarFile}"`);
  });

  return packages;
};

const installFromBranch = async (branchName, options) => {
  const info = log(options.verbose);
  const hash = await getCommitHash(branchName, {
    info,
  });
  const hasBuildFinished = await getBuildStatus(hash, {
    timeout: options.timeout,
    maxAttempts: options.maxAttempts,
    info,
  });

  if (!hasBuildFinished) {
    console.log(chalk.red(`Build is not finished yet`));
    process.exit(1);
  }

  const cdnURL = getCdnUrl(hash);
  const manifest = await getManifest(cdnURL, {
    info,
  });
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
