// @flow
const prettier = require('prettier');
const synonyms = require('../icons/synonyms');

module.exports = icons =>
  prettier.format(
    `
/* eslint-disable global-require */
/**
 * NOTE:
 *
 * This file is automatically generated by the build process.
 * DO NOT CHANGE IT BY HAND or your changes will be lost.
 *
 * To change the format of this file, modify icon/build/createIconsDocs.js.
 * Add synonyms in icon/icons/synonyms.js.
 */

${icons
      .map(
        ({ fileKey, displayName }) =>
          `import ${displayName} from '@atlaskit/icon/glyph/${fileKey}';`,
      )
      .join('')}

export default {
  ${icons
    .map(({ fileKey, displayName }) => {
      const componentName = displayName.toLowerCase().replace(/icon$/, '');
      const packageNames =
        fileKey !== componentName ? [fileKey, componentName] : [fileKey];
      const packageSynonyms = synonyms[fileKey] || [];
      const keywords = [...packageNames, ...packageSynonyms].map(
        keyword => `'${keyword}'`,
      );
      return `
      '${fileKey}': {
        keywords: [${keywords.join(', ')}],
        component: ${displayName},
        componentName: '${displayName}',
        package: '@atlaskit/icon/glyph/${fileKey}',
      },`;
    })
    .join('')}
}
`,
    {
      printWidth: 200,
      singleQuote: true,
      trailingComma: 'es5',
    },
  );
