// @flow
import React from 'react';
import { md, Example, Props } from '@atlaskit/docs';

import SimpleFacadeExample from '../examples/single-component';

export default md`
  ### Flat tables
  The simplest way to use the \`TableTree\` is to call it as an empty component
  and configure it through props.
  
  Several of the props are arrays where each item corresponds to the given
  column.
  
  ${(
    <Example
      component={SimpleFacadeExample}
      source={require('!!raw-loader!../examples/single-component')}
      title="Single component facade"
      language="javascript"
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/TableTree')}
    />
  )}
  
`;
