// @flow

import React from 'react';
import Textfield from '../src';

export default function() {
  return (
    <div>
      <label htmlFor="xsmall">xsmall</label>
      <Textfield name="xsmall" size="xsmall" />

      <label htmlFor="small">small</label>
      <Textfield name="small" size="small" />

      <label htmlFor="medium">medium</label>
      <Textfield name="medium" size="medium" />

      <label htmlFor="large">large</label>
      <Textfield name="large" size="large" />

      <label htmlFor="xlarge">xlarge</label>
      <Textfield name="xlarge" size="xlarge" />

      <label htmlFor="custom-width">custom width (eg, 546)</label>
      <Textfield name="custom-width" size="546" />

      <label htmlFor="default">default (100%)</label>
      <Textfield name="default" />
    </div>
  );
}
