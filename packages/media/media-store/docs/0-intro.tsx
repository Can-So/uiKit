import * as React from 'react';
import { md, code, Example } from '@atlaskit/docs';

export default md`
  This package is the Media Store API Web Client Library.

  ## Usage

  ${code`import { MediaImage } from '@atlaskit/media-image';

  `}

  ${(
    <Example
      Component={require('../examples/0-media-store').default}
      title="Media Store"
      source={require('!!raw-loader!../examples/0-media-store')}
    />
  )}
`;
