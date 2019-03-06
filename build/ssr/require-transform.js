const fs = require('fs');
const { sep, join } = require('path');
const resolveFrom = require('resolve-from');

/** This file is used to resolve imports in jest.
 *  This is used to make sure that packages resolve using the same algorithm as our webpack config
 *  (checking for "atlaskit:src", etc) meaning that we dont need the old root index.js hack anymore
 */

// This is the resolver used by webpack, which we configure similarly
// to AK website (see ./website/webpack.config.js - "resolve" field)
const wpResolver = require('enhanced-resolve').ResolverFactory.createResolver({
  fileSystem: fs,
  useSyncFileSystemCalls: true,
  mainFields: ['atlaskit:src', 'browser', 'main'],
  extensions: ['.js', '.ts', '.tsx'],
});

const resolver = (modulePath /*: string */, params /*: any */) => {
  // If resolving relative paths, make sure we use resolveFrom and not resolve
  if (modulePath.startsWith('.') || modulePath.startsWith(sep)) {
    try {
      return resolveFrom(params.basedir, modulePath);
    } catch (e) {} // eslint-disable-line
  }

  // Otherwise try to resolve to source files of AK packages using webpack resolver
  let result = wpResolver.resolveSync({}, params.basedir, modulePath);

  if (result) {
    // Dereference symlinks to ensure we don't create a separate
    // module instance depending on how it was referenced.
    // @link https://github.com/facebook/jest/pull/4761
    result = fs.realpathSync(result);
  }

  return result;
};

module.exports = ({ types: t }) => ({
  visitor: {
    CallExpression(path, state) {
      if (!path.data.visited && path.node.callee.name === 'require') {
        if (/\.(jpg|jpeg|png|gif|svg)/.test(path.node.arguments[0].value)) {
          const updatedModulePath = `${process.cwd()}/fileMock.js`;
          const [first, ...rest] = path.node.arguments;
          path.replaceWith(
            t.callExpression(path.node.callee, [
              t.stringLiteral(updatedModulePath),
              ...rest,
            ]),
          );
          path.data.visited = true;
        } else if (path.node.arguments[0].value.indexOf('@atlaskit/') > -1) {
          const modulePath = path.node.arguments[0].value;
          const updatedModulePath = resolver(modulePath, {
            basedir: join(state.file.opts.filename, '..'),
          });
          const [first, ...rest] = path.node.arguments;
          path.replaceWith(
            t.callExpression(path.node.callee, [
              t.stringLiteral(updatedModulePath),
              ...rest,
            ]),
          );
          path.data.visited = true;
        }
      }
    },
  },
});
