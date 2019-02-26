import * as React from 'react';
import Textfield from '@atlaskit/textfield';
import nachosTFTheme from './theme';
import { TextFieldProps } from './types';

export default (
  textFieldProps: TextFieldProps & React.HTMLProps<HTMLButtonElement>,
) => {
  const nachosTheme = (adgTheme: any, themeProps: TextFieldProps) => ({
    container: {
      ...nachosTFTheme(adgTheme, themeProps).container,
      ...(textFieldProps.theme && textFieldProps.theme(themeProps).container),
    },
    input: {
      ...nachosTFTheme(adgTheme, themeProps).input,
      ...(textFieldProps.theme && textFieldProps.theme(themeProps).input),
    },
  });

  console.log(...textFieldProps);

  return <Textfield {...textFieldProps} theme={nachosTheme} />;
};
