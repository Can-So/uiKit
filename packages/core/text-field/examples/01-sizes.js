// @flow

import React from 'react';
import TextField from '../src';

export default function() {
  return (
    <div>
      <label for="xsmall">xsmall</label>
      <TextField name="xsmall" size="xsmall" />

      <label for="small">small</label>
      <TextField name="small" size="small" />

      <label for="medium">medium</label>
      <TextField name="medium" size="medium" />

      <label for="large">large</label>
      <TextField name="large" size="large" />

      <label for="xlarge">xlarge</label>
      <TextField name="xlarge" size="xlarge" />

      <label for="custom-width">custom width (eg, 546)</label>
      <TextField name="custom-width" size="546" />

      <label for="default">default (100%)</label>
      <TextField name="default" />
    </div>
  );
}
