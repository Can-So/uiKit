// @flow
import React from 'react';
import { md, Example } from '@atlaskit/docs';

export default md`
  For use cases that need more fine-grained control, the \`TreeTable\` allows for templating based on the 
  render prop pattern and several exported subcomponents.
  
  The render prop is called whenever a tree row needs to be displayed.
  It receives row's data and should return a React
  component — a row of data cells.
  
  ## Examples

  ${(
    <Example
      Component={require('../examples/render-prop-async').default}
      source={require('!!raw-loader!../examples/render-prop-async')}
      title="Basic"
      language="javascript"
    />
  )}

  ${(
    <Example
      Component={require('../examples/render-prop-no-headers').default}
      source={require('!!raw-loader!../examples/render-prop-no-headers')}
      title="No headers"
      language="javascript"
    />
  )}
`;
