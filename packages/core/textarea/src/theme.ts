import { createTheme } from '@atlaskit/theme';
import * as componentTokens from './component-tokens';

const invalidRules = {
  light: {
    borderColor: componentTokens.invalidBorderColor.light,
    borderColorFocus: componentTokens.defaultBorderColorFocus.light,
    backgroundColor: componentTokens.defaultBackgroundColor.light,
    backgroundColorFocus: componentTokens.defaultBackgroundColorFocus.light,
    backgroundColorHover: componentTokens.defaultBackgroundColorHover.light,
  },
  dark: {
    borderColor: componentTokens.invalidBorderColor.dark,
    borderColorFocus: componentTokens.defaultBorderColorFocus.dark,
    backgroundColor: componentTokens.defaultBackgroundColor.dark,
    backgroundColorFocus: componentTokens.defaultBackgroundColorFocus.dark,
    backgroundColorHover: componentTokens.defaultBackgroundColorHover.dark,
  },
};

const disabledRules = {
  light: {
    backgroundColor: componentTokens.disabled.light,
    backgroundColorFocus: componentTokens.disabled.light,
    backgroundColorHover: componentTokens.disabled.light,
    borderColor: componentTokens.defaultBorderColor.light,
    borderColorFocus: componentTokens.defaultBorderColorFocus.light,
    textColor: componentTokens.disabledTextColor.light,
  },
  dark: {
    backgroundColor: componentTokens.disabled.dark,
    backgroundColorFocus: componentTokens.disabled.dark,
    backgroundColorHover: componentTokens.disabled.dark,
    borderColor: componentTokens.defaultBorderColor.dark,
    borderColorFocus: componentTokens.defaultBorderColorFocus.dark,
    textColor: componentTokens.disabledTextColor.dark,
  },
};

// The following do not yet have a darkmode 'map': N20A, N10
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

export type ThemeAppearance = 'standard' | 'subtle' | 'none';
export type ThemeProps = {
  appearance: ThemeAppearance;
  mode: 'dark' | 'light';
};
export type ThemeTokens = {
  borderColor?: string;
  borderColorFocus?: string;
  backgroundColorHover?: string;
  backgroundColorFocus?: string;
  backgroundColor?: string;
  textColor?: string;
  disabledTextColor?: string;
  placeholderTextColor?: string;
};

export const themeTokens = {
  borderColor,
  borderColorFocus,
  backgroundColor,
  backgroundColorFocus,
  backgroundColorHover,
  disabledRules,
  invalidRules,
  textColor: componentTokens.textColor,
  placeholderTextColor: componentTokens.placeholderTextColor,
};

export const Theme = createTheme<ThemeTokens, ThemeProps>(
  ({ appearance, mode }) => ({
    borderColor: borderColor[appearance][mode],
    borderColorFocus: borderColorFocus[appearance][mode],
    backgroundColorHover: backgroundColorHover[appearance][mode],
    backgroundColorFocus: backgroundColorFocus[appearance][mode],
    backgroundColor: backgroundColor[appearance][mode],
    disabledRules: disabledRules[mode],
    invalidRules: invalidRules[mode],
    textColor: componentTokens.textColor[mode],
    placeholderTextColor: componentTokens.placeholderTextColor[mode],
  }),
);
