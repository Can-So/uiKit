import * as React from 'react';
import { md, Example, code } from '@findable/docs';

export default md`
This component is an integration layer between @findable/editor-core and native iOS and Android editors.

  ## Usage

  Use the component in your React app as follows:
  
  ${code`import { MobileEditor } from '@findable/editor-mobile-bridge';`}

  ${(
    <Example
      packageName="@findable/editor-mobile-bridge"
      Component={require('../examples/0-status').default}
      title="Basic"
      source={require('!!raw-loader!../examples/0-status')}
    />
  )}
`;
