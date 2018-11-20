// @flow
import React from 'react';
import { md, Example, code } from '@atlaskit/docs';

export default md`
Text Field provides a form input.

${code`
import TextField from '@atlaskit/field-text';
`}

@atlaskit/textfield exports a default component, that is optionally controllable.
To control the component, specify a value prop; to specify the defaultValue but leave the component uncontrolled specify a defaultValue prop.

  ## Examples

  ${(
    <Example
      packageName="@atlaskit/text-field"
      Component={require('../examples/00-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/00-basic')}
    />
  )}

  ${(
    <Example
      packageName="@atlaskit/text-field"
      Component={require('../examples/01-sizes').default}
      title="Sizes"
      source={require('!!raw-loader!../examples/01-sizes')}
    />
  )}
`;
