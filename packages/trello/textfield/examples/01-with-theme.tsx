import * as React from 'react';
import TextField, { colors, TextFieldThemeProps } from '..';

export default function() {
  const skyBlueTheme = (props: TextFieldThemeProps) => {
    let backgroundColor = colors['sky-500'];
    let borderColor = colors['sky-400'];
    if (props.isInvalid) {
      backgroundColor = colors['sky-50'];
      borderColor = colors['sky-100'];
    }

    if (props.isHovered) {
      backgroundColor = colors['sky-300'];
      borderColor = colors['sky-200'];
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
      <TextField
        // appearance="blue"
        theme={(props: TextFieldThemeProps) => skyBlueTheme(props)}
        name="default-value"
        defaultValue="Tacos are yummy!"
      />
      <label htmlFor="default-value">Invalid</label>
      <TextField
        theme={(props: TextFieldThemeProps) => skyBlueTheme(props)}
        name="default-value"
        defaultValue="Tacos are disgusting!"
        isInvalid
      />
    </div>
  );
}
