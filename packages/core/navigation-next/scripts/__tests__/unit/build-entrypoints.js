// @flow

const glob = require('glob');
const { execSync } = require('child_process');
const { resolve, join } = require('path');

const NAV_NEXT_DIR = resolve(join(__dirname, './../../../'));
const ATLASKIT_DIR = resolve(join(__dirname, './../../../../../../'));
const ENTRY_POINTS = [
  'AsyncLayoutManagerWithViewController.js',
  'AsyncLayoutManagerWithViewController.js.flow',
  'ItemsRenderer.js',
  'ItemsRenderer.js.flow',
  'LayoutManagerWithViewController.js',
  'LayoutManagerWithViewController.js.flow',
  'NavigationProvider.js',
  'NavigationProvider.js.flow',
  'SkeletonContainerView.js',
  'SkeletonContainerView.js.flow',
  'ui-controller.js',
  'ui-controller.js.flow',
  'view-controller.js',
  'view-controller.js.flow',
];

const getFileNameListByGlobExtension = extension =>
  glob
    .sync(`${NAV_NEXT_DIR}/*.${extension}`)
    .map(filename => filename.replace(`${NAV_NEXT_DIR}/`, ''));

execSync(
  `
NODE_ENV=production BABEL_ENV=production:esm bolt workspaces exec --parallel --only-fs packages/core/navigation-next -- babel src -d dist/esm --root-mode upward &&
bolt workspaces exec --only-fs packages/core/navigation-next -- flow-copy-source -v -i '**/__tests__/**' src dist/esm &&
node ${NAV_NEXT_DIR}/scripts/build-entrypoints.js
`,
  { cwd: ATLASKIT_DIR },
);

describe('Build Entrypoints', () => {
  it('should add the entrypoint and flowtype files in the root of the package', () => {
    expect(getFileNameListByGlobExtension('{js,flow}')).toEqual(ENTRY_POINTS);
  });
});
