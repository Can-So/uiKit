const child = require('child_process');
// TODO: This script is only TEMPORARY while the issue on Netlify is fixed.
const numberOfTries = 3;

const token = process.env.NETLIFY_TOKEN;

const stagingId = process.env.NETLIFY_SITE_ID_STAGING;

const prodId = process.env.NETLIFY_SITE_ID;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function deployWebsite() {
  return new Promise((resolve, reject) => {
    let cmd = `netlify deploy --dir dist/ -a ${token}`;

    if (process.env.STAGING) {
      cmd = `${cmd} -s ${stagingId}`;
    } else {
      cmd = `${cmd} -s ${prodId} --prod`;
    }

    const runningCmd = child.spawn(cmd, process.argv.slice(2), {
      stdio: 'inherit',
      shell: true,
    });

    runningCmd.on('error', reject);
  });
}

async function main() {
  for (let i = 0; i < numberOfTries; i++) {
    try {
      await deployWebsite();
      process.exit(0);
    } catch (e) {
      console.log(`The deployment failed with ${e}`);
      await sleep(5000 * Math.pow(2, i));
    }
  }
  process.exit(1);
}
main();
