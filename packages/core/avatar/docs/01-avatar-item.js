// @flow
import React from 'react';
import { md, Example, Props, code } from '@findable/docs';

export default md`
\`AvatarItem\` is a wrapper designed to go around \`Avatar\`, when th avatar
will be displayed alongside text, such as a name and status.

## Usage

${code`import { AvatarItem } from '@findable/avatar';`}

${(
  <Example
    packageName="@findable/avatar"
    Component={require('../examples/03-basicAvatarItem').default}
    title="Avatar Item"
    source={require('!!raw-loader!../examples/03-basicAvatarItem')}
  />
)}

${(
  <Props
    heading="Avatar Item Props"
    props={require('!!extract-react-types-loader!../src/components/AvatarItem')}
  />
)}
`;
