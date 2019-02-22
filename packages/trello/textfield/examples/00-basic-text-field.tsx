import * as React from 'react';
import { NachosTextField } from '../src';

export default function() {
  return (
    <div>
      <label htmlFor="default-value">Default Value</label>
      <NachosTextField name="default-value" defaultValue="Tacos are yummy!" />

      <label htmlFor="focused">Focused</label>
      <NachosTextField name="focused" autoFocus defaultValue="Focus on me!" />
      <label htmlFor="invalid">Invalid</label>
      <NachosTextField name="invalid" isInvalid />
      <label htmlFor="disabled">Disabled</label>
      <NachosTextField
        name="disabled"
        isDisabled
        defaultValue="can't touch this..."
      />
      <label htmlFor="placeholder">Placeholder</label>
      <NachosTextField
        name="placeholder"
        placeholder="Click here to input..."
      />
    </div>
  );
}
