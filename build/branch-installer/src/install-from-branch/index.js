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

const CUSTOM_BUILD_DEPLOY_BRANCH_BUILD_DISTS_KEY = '-1200669939';
const API_URL =
  'https://api.bitbucket.org/2.0/repositories/atlassian/atlaskit-mk-2';

const fetchVerbose = async (url, options = {}) => {
  const info = options.info || (() => {});
  info(`Trying to fetch ${url}`);

  let response = await fetch(url);
  info(`HTTP Code ${response.status}`);
  let result = await response.json();
  info(result);

  return result;
};

const getBuildStatus = async (hashCommit, options) => {
  const { maxAttempts = 1, timeout = 2000, info = () => {} } = options || {};
  info(`Get build status for ${hashCommit} commit`);
  const url = `${API_URL}/commit/${hashCommit}/statuses/build/${CUSTOM_BUILD_DEPLOY_BRANCH_BUILD_DISTS_KEY}`;

  let buildStatus = false;
  let attempts = 1;

  while (buildStatus !== 'SUCCESSFUL' && attempts <= maxAttempts) {
    const pipeline = await fetchVerbose(url, { info });

    buildStatus = (pipeline || {}).state;
    attempts++;

    if (buildStatus !== 'SUCCESSFUL' && maxAttempts > 1) {
      await sleep(timeout);
    }
  }

  return buildStatus;
};

const getCommitHash = async (branchName, options = {}) => {
  const info = options.info || (() => {});
  info(`Get commit hash for ${branchName}`);
  const url = `${API_URL}/refs/branches/${branchName}`;
  const response = await fetchVerbose(url, options);

  return response.target.hash;
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

const checkBuildStatus = buildStatus => {
  if (!buildStatus) {
    console.log(
      chalk.black.bgRed(
        'Build for deploy-branch-build-dists does not exist, you should run it on custom pipeline options',
      ),
    );
    return false;
  }

  if (buildStatus === 'INPROGRESS') {
    console.log(
      chalk.red(
        'Build for deploy-branch-build-dists is running, you need to wait until the build finish',
      ),
    );
    return false;
  }

  if (buildStatus !== 'SUCCESSFUL') {
    console.log(
      chalk.black.bgRed.bold(
        'Build for deploy-branch-build-dists is broken, please check it and try again later',
      ),
    );
    return false;
  }

  return true;
};

const installFromBranch = async (branchName, options = {}) => {
  if (!branchName) {
    process.exit(1);
    return false;
  }

  const info = log(options.verbose);
  const hash = await getCommitHash(branchName, {
    info,
  });

  const buildStatus = await getBuildStatus(hash, {
    timeout: options.timeout,
    maxAttempts: options.maxAttempts,
    info,
  });

  if (!checkBuildStatus(buildStatus)) {
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
module.exports.getCommitHash = getCommitHash;
module.exports.getBuildStatus = getBuildStatus;
module.exports.checkBuildStatus = checkBuildStatus;
module.exports.getPackagesVersionWithTarURL = getPackagesVersionWithTarURL;
