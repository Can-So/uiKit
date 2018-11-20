// @flow

import React from 'react';
import TextField from '../src';

export default function() {
  return (
    <div>
      <label htmlFor="xsmall">xsmall</label>
      <TextField name="xsmall" size="xsmall" />

      <label htmlFor="small">small</label>
      <TextField name="small" size="small" />

      <label htmlFor="medium">medium</label>
      <TextField name="medium" size="medium" />

      <label htmlFor="large">large</label>
      <TextField name="large" size="large" />

      <label htmlFor="xlarge">xlarge</label>
      <TextField name="xlarge" size="xlarge" />

      <label htmlFor="custom-width">custom width (eg, 546)</label>
      <TextField name="custom-width" size="546" />

      <label htmlFor="default">default (100%)</label>
      <TextField name="default" />
    </div>
  );
}
