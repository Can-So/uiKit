import * as React from 'react';
import { md, code, Example, Props } from '@findable/docs';

export default md`
  \`\`\`NotificationIndicator\`\`\` is a React component that wraps an existing @findable/badge component with
  additional functionalities:
  
  * Populate its own state by fetching data through the provided notification-log-client.
  * Sets up automatic refresh when \`\`\`refreshRate\`\`\` is specified.
  * Disables automatic refresh when tab is inactive, unless forced.

  ## Usage

  ${code`import { NotificationIndicator } from '@findable/notification-indicator';`}

  ${(
    <Example
      Component={require('../examples/00-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/00-basic')}
    />
  )}

  ${(
    <Props
      heading="Props"
      props={require('!!extract-react-types-loader!../src/NotificationIndicator')}
    />
  )}
`;
