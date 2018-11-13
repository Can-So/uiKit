// @flow
import React from 'react';
import { md, Example, Props, code } from '@atlaskit/docs';

export default md`
  ### Usage

  Provides a standard way to create a text-based form input with an associated label.

${code`
import TextArea rom '@atlaskit/textarea';
`}

  @atlaskit/textarea exports a default component, this component manages the value of the input if this.props.value is not specified.

  ${(
    <Example
      packageName="@atlaskit/textarea-field"
      Component={require('../examples/0-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/0-basic')}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/TextArea')}
      heading="TextArea Props"
    />
  )}
`;
