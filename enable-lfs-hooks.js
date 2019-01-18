const fs = require('fs');

const modifyHook = ['pre-push', 'post-checkout', 'post-commit', 'post-merge'];
const command = `command_exists git-lfs`;
const message = `{ echo >&2 "\n repository is configured for Git LFS but 'git-lfs' was not found on your path.Refer https://product-fabric.atlassian.net/wiki/spaces/FBT/pages/864979766/Enabling+git-lfs+on+Atlaskit to enable lfs"}`;

let hookfiles = [];

modifyHook.forEach(hook => {
  hookfiles.push(`.git/hooks/${hook}`);
});

console.log('updating hooks -', hookfiles);

hookfiles.forEach(file => {
  fs.appendFileSync(file, `\n ${command} || ${message} \n`);
  const hook = file.split('/')[2];
  const lfscmd = `\n git lfs ${hook} "$@"`;
  fs.appendFileSync(file, lfscmd);
});
