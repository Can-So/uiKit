import { code, Example, md, Props } from '@atlaskit/docs';
import * as React from 'react';

export default md`
  This is the platform field for selecting users.
  This package provides two different modes of selection: single and multi user picker.

  ## Usage

  Import the component in your React app as follows:

  ${code`import UserPicker from '@atlaskit/user-picker';`}

  ${(
    <Example
      packageName="@atlaskit/user-picker"
      Component={require('../examples/00-single').default}
      title="Single User Picker"
      source={require('!!raw-loader!../examples/00-single')}
    />
  )}

  ${(
    <Example
      packageName="@atlaskit/user-picker"
      Component={require('../examples/01-multi').default}
      title="Multi User Picker"
      source={require('!!raw-loader!../examples/01-multi')}
    />
  )}

  ${(
    <Example
      packageName="@atlaskit/user-picker"
      Component={require('../examples/09-watchers').default}
      title="Watchers"
      source={require('!!raw-loader!../examples/09-watchers')}
    />
  )}

  ${(
    <Props
      heading="User Picker Props"
      props={require('!!extract-react-types-loader!../example-helpers/PropsWrapper')}
    />
  )}
`;
