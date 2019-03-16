// @flow
import React from 'react';
import Button from '@findable/button';

import Tooltip from '../src';

export default () => (
  <Tooltip content="Hello World">
    <Button>Hover Over Me</Button>
  </Tooltip>
);
