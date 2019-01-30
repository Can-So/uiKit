import * as React from 'react';

import Spinner from '@atlaskit/spinner';
import { Blanket, SpinnerWrapper } from './styled';

export default () => (
  <Blanket>
    <SpinnerWrapper>
      <Spinner size="large" invertColor={true} />
    </SpinnerWrapper>
  </Blanket>
);
