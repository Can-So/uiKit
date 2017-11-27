// @flow
import React from 'react';
import { md, Example, Props } from '@atlaskit/docs';

export default md`
  This package exports a single \`Confluence Page Tree\` component.

  ${(
    <Example
      Component={require('../examples/basic').default}
      source={require('!!raw-loader!../examples/basic')}
      title="Basic Usage"
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/ConfluencePageTree')}
    />
  )}
`;
