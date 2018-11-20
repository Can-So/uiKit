// @flow

import { themed } from '@atlaskit/theme';
import * as componentTokens from './component-tokens';

const disabledRules = {
  light: {
    backgroundColor: componentTokens.defaultBackgroundColor.light,
    backgroundColorFocus: componentTokens.disabled.Light,
    backgroundColorHover: componentTokens.disabled.light,
    borderColor: componentTokens.defaultBorderColor.light,
    borderColorFocus: componentTokens.defaultBorderColorFocus.light,
    textColor: componentTokens.disabledTextColor.light,
  },
  dark: {
    backgroundColor: componentTokens.defaultBackgroundColor.dark,
    backgroundColorFocus: componentTokens.disabled.dark,
    backgroundColorHover: componentTokens.disabled.dark,
    borderColor: componentTokens.defaultBorderColor.dark,
    borderColorFocus: componentTokens.defaultBorderColorFocus.dark,
    textColor: componentTokens.disabledTextColor.dark,
  },
};
const invalidRules = {
  light: {
    backgroundColor: componentTokens.defaultBackgroundColor.light,
    backgroundColorFocus: componentTokens.defaultBackgroundColorFocus.light,
    backgroundColorHover: componentTokens.defaultBackgroundColorHover.light,
    borderColor: componentTokens.invalidBorderColor.light,
    borderColorFocus: componentTokens.defaultBorderColorFocus.light,
  },
  dark: {
    backgroundColor: componentTokens.defaultBackgroundColor.dark,
    backgroundColorFocus: componentTokens.defaultBackgroundColorFocus.dark,
    backgroundColorHover: componentTokens.defaultBackgroundColorHover.dark,
    borderColor: componentTokens.invalidBorderColor.dark,
    borderColorFocus: componentTokens.defaultBorderColorFocus.dark,
  },
};
const backgroundColor = {
  standard: componentTokens.defaultBackgroundColor,
  subtle: componentTokens.transparent,
  none: componentTokens.transparent,
};
const backgroundColorFocus = {
  standard: componentTokens.defaultBackgroundColorFocus,
  subtle: componentTokens.defaultBackgroundColorFocus,
  none: componentTokens.transparent,
};
const backgroundColorHover = {
  standard: componentTokens.defaultBackgroundColorHover,
  subtle: componentTokens.defaultBackgroundColorHover,
  none: componentTokens.transparent,
};
const borderColor = {
  standard: componentTokens.defaultBorderColor,
  subtle: componentTokens.transparent,
  none: componentTokens.transparent,
};
const borderColorFocus = {
  standard: componentTokens.defaultBorderColorFocus,
  subtle: componentTokens.defaultBorderColorFocus,
  none: componentTokens.transparent,
};

export const themeTokens = {
  backgroundColor,
  backgroundColorFocus,
  backgroundColorHover,
  borderColor,
  borderColorFocus,
  placeholderTextColor: componentTokens.placeholderTextColor,
  textColor: componentTokens.textColor,
  invalidRules,
  disabledRules,
};

export type ThemeProps = {
  textField?: ({ appearance: string }) => {
    backgroundColor?: string,
    backgroundColorFocus?: string,
    backgroundColorHover?: string,
    borderColor?: string,
    borderColorFocus?: string,
    textColor?: string,
    disabledTextColor?: string,
    placeholderTextColor?: string,
  },
  mode?: 'light' | 'dark',
};

export default (props: ThemeProps): ThemeProps => {
  const mode = props.mode || 'light';
  return {
    textField: ({ appearance }) => ({
      backgroundColor: backgroundColor[appearance][mode],
      backgroundColorFocus: backgroundColorFocus[appearance][mode],
      backgroundColorHover: backgroundColorHover[appearance][mode],
      borderColor: borderColor[appearance][mode],
      borderColorFocus: borderColorFocus[appearance][mode],
      placeholderTextColor: componentTokens.placeholderTextColor[mode],
      textColor: componentTokens.textColor[mode],
      invalidRules: invalidRules[mode],
      disabledRules: disabledRules[mode],
    }),
    mode,
    ...props,
  };
};
