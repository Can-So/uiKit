// @flow
import React from 'react';
import { md, Props } from '@atlaskit/docs';

export default md`
  These are the props available to the main \`Navigation\` component export. They
  are used for both controlling the appearance of itself and other sub-components
  as well as fixing the layout of the navigation components by acceptin many
  of them as props.

  ${(
    <Props
      shouldCollapseProps
      heading="Navigation Component Props"
      props={require('!!extract-react-types-loader!../src/components/js/Navigation.js')}
    />
  )}
`;
