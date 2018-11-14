// @flow
import { colors } from '@atlaskit/theme';

// The following are the name for color mappings in @atlaskit/themes
// The exports are the functions, not the objects, so could not be used here
const disabled = { light: colors.N20, dark: colors.DN20 };
// For validation red is the new 'yellow' which was { light: colors.Y300, dark: colors.Y300 }
const invalidBorderColor = { light: colors.R400, dark: colors.R400 };

const defaultBorderColorFocus = { light: colors.B100, dark: colors.B75 };
const defaultBorderColor = { light: colors.N40, dark: colors.DN40 };
const defaultBackgroundColor = { light: colors.N10, dark: colors.DN10 };
const defaultBackgroundColorHover = { light: colors.N30, dark: colors.DN30 };
const defaultBackgroundColorFocus = { light: colors.N0, dark: colors.DN10 };

const placeholderTextColor = { light: colors.N100, dark: colors.DN200 };
const textColor = { light: colors.N900, dark: colors.DN600 };
const disabledTextColor = { light: colors.N70, dark: colors.DN90 };
const transparent = { light: 'transparent', dark: 'transparent' };

export const invalidRules = {
  light: {
    borderColor: invalidBorderColor.light,
    borderColorFocus: defaultBorderColorFocus.light,
    backgroundColor: defaultBackgroundColor.light,
    backgroundColorFocus: defaultBackgroundColorFocus.light,
    backgroundColorHover: defaultBackgroundColorHover.light,
  },
  dark: {
    borderColor: invalidBorderColor.dark,
    borderColorFocus: defaultBorderColorFocus.dark,
    backgroundColor: defaultBackgroundColor.dark,
    backgroundColorFocus: defaultBackgroundColorFocus.dark,
    backgroundColorHover: defaultBackgroundColorHover.dark,
  },
};

export const disabledRules = {
  light: {
    backgroundColor: disabled.light,
    backgroundColorFocus: disabled.light,
    backgroundColorHover: disabled.light,
    borderColor: defaultBorderColor.light,
    borderColorFocus: defaultBorderColorFocus.light,
    textColor: disabledTextColor.light,
  },
  dark: {
    backgroundColor: disabled.dark,
    backgroundColorFocus: disabled.dark,
    backgroundColorHover: disabled.dark,
    borderColor: defaultBorderColor.dark,
    borderColorFocus: defaultBorderColorFocus.dark,
    textColor: disabledTextColor.dark,
  },
};

// The following do not yet have a darkmode 'map': N20A, N10
const backgroundColor = {
  standard: defaultBackgroundColor,
  subtle: transparent,
  none: transparent,
};
const backgroundColorFocus = {
  standard: defaultBackgroundColorFocus,
  subtle: defaultBackgroundColorFocus,
  none: transparent,
};

const backgroundColorHover = {
  standard: defaultBackgroundColorHover,
  subtle: defaultBackgroundColorHover,
  none: transparent,
};

const borderColor = {
  standard: defaultBorderColor,
  subtle: transparent,
  none: transparent,
};

const borderColorFocus = {
  standard: defaultBorderColorFocus,
  subtle: defaultBorderColorFocus,
  none: transparent,
};

export const themeTokens = {
  borderColor,
  borderColorFocus,
  backgroundColor,
  backgroundColorFocus,
  backgroundColorHover,
  disabledRules,
  invalidRules,
  textColor,
  placeholderTextColor,
};

export type ThemeAppearance = 'standard' | 'subtle' | 'none';

export type TextAreaThemeProps = {
  appearance: ThemeAppearance,
  isCompact: boolean,
};
export type ThemeProps = {
  textArea?: ({ appearance: ThemeAppearance, isCompact: boolean }) => {
    borderColor?: string,
    borderColorFocus?: string,
    backgroundColorHover?: string,
    backgroundColorFocus?: string,
    backgroundColor?: string,
    textColor?: string,
    disabledTextColor?: string,
    placeholderTextColor?: string,
    borderRadius?: string,
    borderWidth?: number,
    height?: number,
    lineHeight?: number,
    horizontalPadding?: number,
    innerHeight?: number,
    transitionDuration?: string,
  },
  mode?: 'light' | 'dark',
};

const getTextAreaTheme = mode => ({ appearance }: TextAreaThemeProps) => ({
  borderColor: borderColor[appearance][mode],
  borderColorFocus: borderColorFocus[appearance][mode],
  backgroundColorHover: backgroundColorHover[appearance][mode],
  backgroundColorFocus: backgroundColorFocus[appearance][mode],
  backgroundColor: backgroundColor[appearance][mode],
  disabledRules: disabledRules[mode],
  invalidRules: invalidRules[mode],
  textColor: textColor[mode],
  placeholderTextColor: placeholderTextColor[mode],
});

export const theme = (props: ThemeProps): ThemeProps => {
  const mode = props.mode || 'light';
  return {
    textArea: getTextAreaTheme(mode),
    mode,
    ...props,
  };
};
