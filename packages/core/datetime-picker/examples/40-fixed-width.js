// @flow

import React from 'react';
import { Label } from '@findable/field-base';
import { gridSize } from '@findable/theme';
import { DatePicker, DateTimePicker, TimePicker } from '../src';

export default () => {
  return (
    <div>
      <Label label="Date picker" />
      <DatePicker
        innerProps={{ style: { width: gridSize() * 20 } }}
        onChange={console.log}
      />
      <Label label="Time picker" />
      <TimePicker
        innerProps={{ style: { width: gridSize() * 20 } }}
        onChange={console.log}
      />
      <Label label="Date / time picker" />
      <DateTimePicker
        innerProps={{ style: { width: gridSize() * 40 } }}
        onChange={console.log}
      />
    </div>
  );
};
