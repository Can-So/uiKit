// @flow

import React from 'react';
import { Field } from '@atlaskit/form';
import TextField from '../src';

export default function() {
  return (
    <div>
      <label>xsmall</label>
      <TextField size="xsmall" />

      <label>small</label>
      <TextField size="small" />

      <label>medium</label>
      <TextField size="medium" />

      <label>large</label>
      <TextField size="large" />

      <label>xlarge</label>
      <TextField size="xlarge" />

      <label>custom width (eg, 546)</label>
      <TextField size="546" />

      <label>default (100%)</label>
      <TextField />
    </div>
  );
}
