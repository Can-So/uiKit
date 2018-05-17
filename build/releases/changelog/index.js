const { generateMarkdownTemplate } = require('./template');
const fs = require('fs');
const bolt = require('bolt');
const path = require('path');
const os = require('os');
const util = require('util');
const { sep } = require('path');
const logger = require('../../utils/logger');

function writeFile(filePath, fileContents) {
  return util.promisify(cb => fs.writeFile(filePath, fileContents, cb))();
}

async function getRepoUrl(cwd, opts) {
  if (opts.repoUrl) return opts.repoUrl;
  const project = await bolt.getProject({ cwd });
  if (
    project &&
    project.config.bolt &&
    project.config.bolt.releases &&
    project.config.bolt.releases.baseCommitUrl
  )
    return project.config.bolt.releases.baseCommitUrl;
  return '';
}

async function updateChangelog(releaseObject, opts = { cwd: '', repoUrl: '' }) {
  const cwd = opts.cwd || process.cwd();
  const allPackages = await bolt.getWorkspaces({ cwd });
  const prefix = opts.prefix || '';
  const repoUrl = await getRepoUrl(cwd, opts);
  let udpatedChangelogs = [];
  // Updating ChangeLog files for each package
  for (let i = 0; i < releaseObject.releases.length; i++) {
    const release = releaseObject.releases[i];
    const pkg = allPackages.find(a => a.name === release.name);
    if (!pkg)
      logger.warn(
        `While writing changelog, could not find workspace ${
          release.name
        } in project.`,
      );
    const changelogPath = path.join(pkg.dir, 'CHANGELOG.md');

    const templateString = `\n\n${generateMarkdownTemplate(
      release,
      releaseObject,
      repoUrl,
    ).trim('\n')}\n`;
    try {
      if (fs.existsSync(changelogPath)) {
        await prependFile(changelogPath, templateString, pkg);
      } else {
        await writeFile(changelogPath, `# ${pkg.name}${templateString}`);
      }
    } catch (e) {
      logger.warn(e);
    }
    logger.log(`Updated file ${changelogPath}`);
    udpatedChangelogs.push(changelogPath);
  }
  return udpatedChangelogs;
}

async function prependFile(filePath, data, pkg) {
  const fileData = fs.readFileSync(filePath).toString();
  if (!fileData) {
    const completelyNewChangelog = `# ${pkg.name}${data}`;
    fs.writeFileSync(filePath, completelyNewChangelog);
    return;
  }
  const newChangelog = fileData.replace('\n', data);
  fs.writeFileSync(filePath, newChangelog);
}

module.exports = {
  updateChangelog,
};
