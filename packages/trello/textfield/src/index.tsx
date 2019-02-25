import * as React from 'react';
import Textfield from '@atlaskit/textfield';
import nachosTFTheme from './theme';

export type TextFieldTheme = {
  container?: {};
  input?: {};
};

export type TextFieldProps = {
  isFocused?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  theme?: any;
};

export default (textFieldProps: TextFieldProps) => {
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

  return <Textfield {...textFieldProps} theme={nachosTheme} />;
};
