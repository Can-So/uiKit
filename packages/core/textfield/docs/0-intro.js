// @flow
import React from 'react';
import { md, Example, code, Props } from '@atlaskit/docs';

export default md`
Text Field provides a form input.

${code`
import Textfield from '@atlaskit/textfield';
`}

@atlaskit/textfield exports a default component, that is optionally controllable.
To control the component, specify a value prop; to specify the defaultValue but leave the component uncontrolled specify a defaultValue prop.

  ## Examples

  ${(
    <Example
      packageName="@atlaskit/textfield"
      Component={require('../examples/00-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/00-basic')}
    />
  )}

  ${(
    <Example
      packageName="@atlaskit/textfield"
      Component={require('../examples/01-widths').default}
      title="Widths"
      source={require('!!raw-loader!../examples/01-widths')}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/Textfield')}
    />
  )}
`;
