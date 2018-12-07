import * as React from 'react';
import { md, code, Props, Example } from '@atlaskit/docs';
import { SectionMessage } from '@atlaskit/section-message';

export default md`
${(
  <SectionMessage appearance="warning">
    <p>
      <strong>
        Note: @atlaskit/user-picker is currently a developer preview.
      </strong>
    </p>
    <p>
      Please experiment with and test this package, but be aware that the API
      may change at any time. Use at your own risk, preferrably not in
      production.
    </p>
  </SectionMessage>
)}

  The purpose of the user picker package is to provide UI for displaying a set of users in a scrollable dropdown.

  ## Usage

  Import the component in your React app as follows:

  ${code`import UserPicker from '@atlaskit/user-picker';`}

  ${(
    <Example
      packageName="@atlaskit/user-picker"
      Component={require('../examples/00-simple').default}
      title="User Picker"
      source={require('!!raw-loader!../examples/00-simple')}
    />
  )}

  ${(
    <Props
      heading="User Picker Props"
      props={require('!!extract-react-types-loader!../src/components/UserPicker')}
    />
  )}
`;
