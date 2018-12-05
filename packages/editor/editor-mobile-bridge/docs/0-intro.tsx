import * as React from 'react';
import { md, Example, code } from '@atlaskit/docs';

export default md`
This component allows mobile distribution of the Editor.

  ## Usage

  Use the encoder with editor-editor as follows:

  ${code`import { MobileEditor } from '@atlaskit/editor-mobile-bridge';`}

  ${(
    <Example
      packageName="@atlaskit/editor-mobile-bridge"
      Component={require('../examples/0-status').default}
      title="Basic"
      source={require('!!raw-loader!../examples/0-status')}
    />
  )}
`;
