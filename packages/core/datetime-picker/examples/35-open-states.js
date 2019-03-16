// @flow

import React from 'react';
import { Label } from '@findable/field-base';
import { DatePicker } from '../src';

export default () => {
  return (
    <div>
      <h3>DatePicker</h3>
      <Label label="Always open" />
      <DatePicker isOpen />
    </div>
  );
};
