// @flow

import React from 'react';
import { Label } from '@findable/field-base';
import { TimePicker } from '../src';

export default () => {
  return (
    <div>
      <Label label="Stock" />
      <TimePicker onChange={console.log} />

      <Label label="Disabled input" />
      <TimePicker isDisabled onChange={console.log} />
    </div>
  );
};
