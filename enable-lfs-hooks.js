//@flow
const fs = require('fs');

const modifyHook = ['pre-push', 'post-checkout', 'post-commit', 'post-merge'];
const command = `command -v git-lfs >/dev/null 2>&1`;
const message = `{ echo >&2 "\n repository is configured for Git LFS but 'git-lfs' was not found on your path. Refer to Atlaskit document https://product-fabric.atlassian.net/wiki/spaces/FBT/pages/864979766/Enabling+git-lfs+on+Atlaskit"; exit 2; }`;

const hookfiles = [];

modifyHook.forEach(hook => {
  hookfiles.push(`.git/hooks/${hook}`);
});

console.log('updating hooks -', hookfiles);

hookfiles.forEach(file => {
  fs.appendFileSync(file, `\n${command} || ${message} \n`);
  const hook = file.split('/')[2];
  const lfscmd = `\ngit lfs ${hook} "$@" `;
  fs.appendFileSync(file, lfscmd);
});
