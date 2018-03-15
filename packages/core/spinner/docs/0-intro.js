// @flow
import React from 'react';
import { md, Example, Props } from '@atlaskit/docs';

export default md`
  Spinners are used for showing a system process of unknown length going on
  that ends with the system displaying results to the user. The spinner
  animates in, as well as animating out when \`isCompleting\` is
  passed to it.

  The inverted spinner matches the dark spinner for display in non-dark
  contexts. In a dark context, the inverted spinner remains the same color.

  ## Examples

  ${(
    <Example
      Component={require('../examples/0-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/0-basic')}
    />
  )}
  
  ${(
    <Example
      Component={require('../examples/1-usage').default}
      title="Animation Options"
      source={require('!!raw-loader!../examples/1-usage')}
    />
  )}
 
  ${<Props props={require('!!extract-react-types-loader!../src/Spinner')} />}
`;
