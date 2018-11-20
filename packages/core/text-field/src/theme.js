// @flow

import { colors, themed } from '@atlaskit/theme';

// The following are the name for color mappings in @atlaskit/themes
// The exports are the functions, not the objects, so could not be used here
const disabled = { light: colors.N20, dark: colors.DN20 };
// For validation red is the new 'yellow' which was { light: colors.Y300, dark: colors.Y300 }
const red = { light: colors.R400, dark: colors.R400 };

// The following do not yet have a darkmode 'map': N20A, N10
const defaultBackgroundColor = { light: colors.N10, dark: colors.DN10 };
const defaultBackgroundColorFocus = { light: colors.N0, dark: colors.DN10 };
const defaultBackgroundColorHover = { light: colors.N30, dark: colors.DN30 };
const defaultBorderColor = { light: colors.N40, dark: colors.DN40 };
const defaultBorderColorFocus = { light: colors.B100, dark: colors.B75 };
const transparent = { light: 'transparent', dark: 'transparent' };

const disabledRules = {
  light: {
    backgroundColor: defaultBackgroundColor.light,
    backgroundColorFocus: disabled.Light,
    backgroundColorHover: disabled.light,
    borderColor: colors.N40,
    borderColorFocus: colors.B100,
    textColor: colors.N70,
  },
  dark: {
    backgroundColor: defaultBackgroundColor,
    backgroundColorFocus: disabled,
    backgroundColorHover: disabled,
    borderColor: colors.DN40,
    borderColorFocus: colors.B75,
    textColor: colors.DN90,
  },
};
const invalidRules = {
  light: {
    backgroundColor: defaultBackgroundColor,
    backgroundColorFocus: colors.N0,
    backgroundColorHover: colors.N30,
    borderColor: red.light,
    borderColorFocus: colors.B100,
  },
  dark: {
    backgroundColor: defaultBackgroundColor,
    backgroundColorFocus: colors.DN10,
    backgroundColorHover: colors.DN30,
    borderColor: red.dark,
    borderColorFocus: colors.B75,
  },
};

const backgroundColor = {
  standard: defaultBackgroundColor,
  disabled: { light: colors.N10, dark: colors.DN10 },
  invalid: { light: colors.N10, dark: colors.DN10 },
  subtle: { light: 'transparent', dark: 'transparent' },
  none: { light: 'transparent', dark: 'transparent' },
};

const backgroundColorFocus = {
  standard: defaultBackgroundColorFocus,
  disabled,
  invalid: defaultBackgroundColorFocus,
  subtle: defaultBackgroundColorFocus,
  none: transparent,
};

const backgroundColorHover = {
  standard: defaultBackgroundColorHover,
  disabled,
  invalid: defaultBackgroundColorHover,
  subtle: defaultBackgroundColorHover,
  none: transparent,
};

const borderColor = {
  standard: defaultBorderColor,
  disabled: defaultBorderColor,
  invalid: red,
  subtle: transparent,
  none: transparent,
};
const borderColorFocus = {
  standard: defaultBorderColorFocus,
  disabled: defaultBorderColorFocus,
  invalid: defaultBorderColorFocus,
  subtle: defaultBorderColorFocus,
  none: transparent,
};

const textColor = { light: colors.N900, dark: colors.DN600 };

const disabledTextColor = { light: colors.N70, dark: colors.DN90 };

const placeholderTextColor = { light: colors.N100, dark: colors.DN90 };

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
      disabledTextColor: disabledTextColor[mode],
      placeholderTextColor: placeholderTextColor[mode],
      textColor: textColor[mode],
      invalidRules: invalidRules[mode],
      disabledRules: disabledRules[mode],
    }),
    mode,
    ...props,
  };
};
