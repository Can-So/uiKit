// @flow
import React from 'react';
import { md, Example, Props } from '@atlaskit/docs';

export default md`
  Creates a link that opens an [Inline Dialog](/components/inline-dialog).
  Provides an icon to indicate the type of dialog, with options for a heading
  and secondary text.

  ## Examples

  ${(
    <Example
      Component={require('../examples/01-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/01-basic')}
    />
  )}

  ${(
    <Example
      Component={require('../examples/02-different-types').default}
      title="Different Types"
      source={require('!!raw-loader!../examples/02-different-types')}
    />
  )}

  ${(
    <Props
      heading="Props"
      props={require('!!extract-react-types-loader!../src/components/InlineMessage')}
    />
  )}
`;
