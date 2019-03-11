import * as React from 'react';
import TextField from '../src';

export default function() {
  return (
    <div>
      <label htmlFor="default-value">Default Value</label>
      <TextField name="default-value" defaultValue="Tacos are yummy!" />

      <label htmlFor="focused">Focused</label>
      <TextField name="focused" autoFocus defaultValue="Focus on me!" />
      <label htmlFor="invalid">Invalid</label>
      <TextField
        name="invalid"
        isInvalid
        defaultValue="Tacos are disgusting!"
      />
      <label htmlFor="disabled">Disabled</label>
      <TextField
        name="disabled"
        isDisabled
        defaultValue="can't touch this..."
      />
      <label htmlFor="placeholder">Placeholder</label>
      <TextField name="placeholder" placeholder="Click here to input..." />
    </div>
  );
}
