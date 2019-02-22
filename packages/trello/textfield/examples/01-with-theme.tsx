import * as React from 'react';
import { NachosTextField, NTextFieldProps } from '../src';
import { nachosColors as colors } from '../src';

export default function() {
  const skyBlueTheme = props => {
    let backgroundColor = colors['sky-500'];
    if (props.isInvalid) {
      backgroundColor = colors['sky-50'];
    }
    return {
      container: {
        backgroundColor: backgroundColor,
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
        defaultValue="Tacos are yummy!"
        isInvalid
      />
    </div>
  );
}
