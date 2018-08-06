import * as React from 'react';
import { md, Example } from '@atlaskit/docs';

export default md`
  # @atlaskit/smart-card

  Turns a URL into a card with metadata sourced from the vendor.

  ## Installation

  ~~~
  yarn add @atlaskit/smart-card
  ~~~

  ## Usage
  ${(
    <Example
      Component={require('../examples/0-intro').default}
      title="An editable example"
      source={require('!!raw-loader!../examples/0-intro')}
    />
  )}


`;
