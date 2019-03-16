// @flow

import React from 'react';
import { md, Example, Props, code } from '@findable/docs';

export default md`
  The progress dots are visual indicators used when stepping a user through
  a journey, to allow them to keep track of their progress.

  They are typically accompanied by a carousel or other such UI device.

  ## Usage

  ${code`import { ProgressDots } from '@findable/progress-indicator';`}

  ${(
    <Example
      packageName="@findable/progress-indicator"
      Component={require('../examples/01-basic').default}
      title="Basic"
      source={require('!!raw-loader!../examples/01-basic')}
    />
  )}

  ${(
    <Props
      heading="ProgressDots Props"
      props={require('!!extract-react-types-loader!../src/components/Dots')}
    />
  )}


`;
