import * as React from 'react';
import NachosTextField, { NTextFieldProps } from '../src';
import { nachosColors as colors } from '../src';

export default function() {
  const skyBlueTheme = props => {
    let backgroundColor = colors['sky-500'];
    let borderColor = colors['sky-400'];

    if (props.isInvalid) {
      backgroundColor = colors['sky-50'];
      borderColor = colors['sky-100'];
    }
    return {
      container: {
        borderColor,
        backgroundColor,
        margin: '8px 12px',
      },
    };
  };

  return (
    <div>
      <label htmlFor="default-value">Default Value</label>
      <NachosTextField
        theme={(props: NTextFieldProps) => skyBlueTheme(props)}
        name="default-value"
        defaultValue="Tacos are yummy!"
      />
      <label htmlFor="default-value">Invalid</label>
      <NachosTextField
        theme={(props: NTextFieldProps) => skyBlueTheme(props)}
        name="default-value"
        defaultValue="Tacos are disgusting!"
        isInvalid
      />
    </div>
  );
}
