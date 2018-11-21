import * as React from 'react';
import { md, code, Props, Example } from '@atlaskit/docs';

export default md`
  # User picker

  # WARNING

  This package is still in development and API will change frequently. There will likely be multiple breaking changes
  in a short span of time and it should not be consumed by customers for the time being.

  The purpose of the user picker package is to provide UI for displaying a set of users in a scrollable dropdown.

  ## Try it out

  Interact with a [live demo of the @atlaskit/user-picker component](https://atlaskit.atlassian.com/packages/elements/user-picker).

  ## Installation

  ~~~js
  npm install @atlaskit/user-picker
  # or
  yarn add @atlaskit/user-picker
  ~~~

  ## Using the component

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
