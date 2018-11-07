// @flow

import React from 'react';
import { code, md } from '@atlaskit/docs';
import migrateInJsImage from './assets/migrate-in-js.jpg';
import lessToCssCompileImage from './assets/less-to-css-compile.jpg';
import nestedStylesThemePackage from './assets/nested-styles-theme-package.jpg';

type ImageProps = {
  src: string,
  alt: string,
};

function Image({ src, alt }: ImageProps) {
  return (
    <img src={src} alt={alt} style={{ width: '100%', marginTop: '8px' }} />
  );
}

export default md`
## Migrate from @atlaksit/util-shared-styles

### Migrating in JS files

The only pre-requisite here is you must use styled-components so that the styles exported by the theme package are evaluated properly. 
If you are not already using styled-components in your code but you are using Atlaksit components then you already have styled-components in your 
application as it is peer-dependency in the components, therefore using it in your code should not have major impact on your bundle size.

To migrate to @atlaskit/theme package we can replace the imports from util-shared-styles package with theme package.

Here is an example of how we replaced the typography and grid size styles in a package:

${(
  <Image
    src={migrateInJsImage}
    alt="code before and after of importing gridsize and typography from theme package"
  />
)}

We have a codemod that does this job for you please check out [codemod-util-shared-styles-to-theme](https://bitbucket.org/atlassian/atlaskit-mk-2/src/master/packages/bitbucket/codemod-util-shared-styles-to-theme/)
, the readme has all the instructions on how to run this codemod in your repository.

## Migrating in less files

The @atlaskit/theme package does not export less files which makes it difficult to import the styles from
the package in less files. To resolve this we suggest moving away from less to a css-in-js
solution.

We have released a new package [evaluate-inner-styles](https://www.npmjs.com/package/evaluate-inner-styles) which will help to generate static CSS from JS.

Steps to migrate:

1. Compile the less to CSS-in-JS:

    a. Please use [http://lesscss.org/less-preview/](http://lesscss.org/less-preview/) to compile the Less styles to CSS.

    You will get compilation errors as style values being imported from util-shared-styles are not found. To resolve this
    please declare them with string on top so that we remember to replace them. To see an example,
    
    ***if you are using color \`@ak-color-B400\` in your less styles then add a new variable on top of the file \`@ak-color-B400: \${colors.B400}\`***

    ${<Image src={lessToCssCompileImage} alt="less compiled to css" />}

2. Create a corresponding JS file for the above less file and use the default export function from [evaluate-inner-styles](https://www.npmjs.com/package/evaluate-inner-styles)
    to evaluate and export your styles. The syntax of this function is same as offered by other css-in-js libraries like emotion and styled-components. 

    Below is example of how to use evaluate-inner-styles library with theme package:

    ${code`
    import { colors } from '@atlaskit/theme';
    import evaluateInerStyles from 'evaluate-inner-styles';
    export default evaluateInerStyles()\`
      div {
        color: \${colors.B400};
      }
    \`
    `}

3. Now instead of using the less compiler to generate CSS, you can use this small script to create styles from the above JS file

    ${code`
    import * as fs from 'fs';
    import * as path from 'path';
    import { promisify } from 'util';
    import makeDir from 'mkdirp';
    const writeFile = promisify(fs.writeFile);

    // Include your js stylesheet here
    import styleSheet from '../src/styles';

    // path the destination for the build css
    const DIST = path.join(__dirname, 'dist');

    async function buildCSSReset() {
      try {
        // Create the dist folder if it does not exist
        makeDir.sync(DIST);
        // Write the file
        await writeFile(path.join(DIST, 'bundle.css'), styleSheet);
      } catch (err) {
        console.error(\`Failed to build css-reset due to \${err}\`);
      }
    }

    // Execute the function
    buildCSSReset().then(() => {
      console.log('Successfully build css-reset');
    });
    `}

It is common use-case where we will have multiple less files so for that we can create an index file which imports the styles from all the other files and
exports them in logical order,

Example:

${code`
import baseStyles from './base';
import browserFixesStyles from './browser-fixes';
import resetStyles from './reset';
import tableStyles from './tables';
import utilStyles from './utils';

export default \`
\${resetStyles}
\${baseStyles}
\${tableStyles}
\${browserFixesStyles}
\${utilStyles}
\`;
`}

### Other solutions that we thought of but disregarded:

**import atlaskit/theme in less files and use variables from there ( not doing it )**

We looked for existing solutions and there was only one → [https://github.com/tompascall/js-to-styles-var-loader](https://github.com/tompascall/js-to-styles-var-loader) ,
this does not work for our use-case because we have deeply nested styles in @atlaskit/theme package and sometimes they are a function that we need
to call.

Let's take an example of typography styles:

${(
  <Image
    src={nestedStylesThemePackage}
    alt="nested styles in the theme package"
  />
)}

***(Not digging into details but we can see that heading is a function, look at the return in themed function.)***

Creating our own tooling to consume JS in less was an option but we have already seen the power of css-in-js thus we did not
go ahead with this solution.
`;
