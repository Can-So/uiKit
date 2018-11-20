// @flow
import { code, md } from '@atlaskit/docs';

export default md`
## Migrate from @atlaskit/util-shared-styles

### Reasons to migrate

1. @atlaskit/util-shared-styles will be deprecated soon
2. New feature requests are not accepted in @atlaskit/util-shared-styles
3. @atlaskit/theme is the source of truth for ADG styling

Keeping up with value *Be the change you seek* we migrated all the core packages and css-packs. While migrating these
package we came up with two migration paths. One is for the usage of util-shared-styles as css-in-js solution
and other for usage in less files.

### Migrating the CSS-IN-JS styles

In util-shared-styles we used to style the component like the following:

${code`
import styled from 'styled-components';
import { akGridSizeUnitless } from '@atlaskit/util-shared-styles';

const Header = styled.h1\`
  margin-right: \${akGridSizeUnitless * 4} px;
\`;
`}

The above style can be written with the theme package as:

${code`
import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';

const Header = styled.h1\`
  margin-right: \${gridSize() * 4}px;
\`;
`}

We have a code mod that will replace all the usage of util-shared-styles with theme in the javascript files.
Please see [codemod-util-shared-styles-to-theme](https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/packages/bitbucket/codemod-util-shared-styles-to-theme/)
and go through readme for details.

### Migrating the less styles

With the existing tooling we cannot consume the @atlaskit/theme package in less files. Therefore, building
our own tools was the only option.

We have build tooling to generating static styles from js at the build time. Since we are headed in css-in-js
direction this is the best bet. Please see [GitHub - ajaymathur/evaluate-inner-styles](https://github.com/ajaymathur/evaluate-inner-styles)
and go through readme for details.

In util-shared-styles we used to create styles in less files like following:

${code`
// styles.less
@import '../node_modules/@atlaskit/util-shared-styles/src/grid.less';

.header{
  margin-right: (@ak-grid-size * 1.5)
}
`}

The above styles can we written in js files using theme package as:

${code`
// styles.js
import evaluateInner from 'evaluate-inner-styles';
import { gridSize } from '@atlaskit/theme';

export default evaluateInnerStyles()\`
  .header: {
    margin-right: \${gridSize()}px;
  }
\`
`}

Additionally, in less we use less compiler to compile the less styles like following:

${code`
lessc styles.less styles.css
`}

The above functionality can we achieved using the following script:

${code`
// Get the default exported styles from styles.js
import styleSheet from '../styles';

// Write the styles to styles.css on disk
await writeFile(path.join(DIST, 'styles.css'), styleSheet);
`}

***( This is just a gist of script, please see [css-reset/js-to-css.js](https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/packages/css-packs/css-reset/build/js-to-css.js))***
`;
