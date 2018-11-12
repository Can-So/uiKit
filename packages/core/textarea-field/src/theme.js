// @flow
import { colors, gridSize, fontSize } from '@atlaskit/theme';

// The following are the name for color mappings in @atlaskit/themes
// The exports are the functions, not the objects, so could not be used here
const disabled = { light: colors.N20, dark: colors.DN20 };
// For validation red is the new 'yellow' which was { light: colors.Y300, dark: colors.Y300 }
const red = { light: colors.R400, dark: colors.R400 };

// The following do not yet have a darkmode 'map': N20A, N10
const backgroundColor = {
  standard: { light: colors.N10, dark: colors.DN10 },
  disabled,
  invalid: { light: colors.N10, dark: colors.DN10 },
  subtle: { light: 'transparent', dark: 'transparent' },
  none: { light: 'transparent', dark: 'transparent' },
};
const backgroundColorFocus = {
  standard: { light: colors.N0, dark: colors.DN10 },
  disabled,
  invalid: { light: colors.N0, dark: colors.DN10 },
  subtle: { light: colors.N0, dark: colors.DN10 },
  none: { light: 'transparent', dark: 'transparent' },
};

const backgroundColorHover = {
  standard: { light: colors.N30, dark: colors.DN30 },
  disabled,
  invalid: { light: colors.N30, dark: colors.DN30 },
  subtle: { light: colors.N30, dark: colors.DN30 },
  none: { light: 'transparent', dark: 'transparent' },
};

const borderColor = {
  standard: { light: colors.N40, dark: colors.DN40 },
  disabled: { light: colors.N40, dark: colors.DN40 },
  invalid: red,
  subtle: { light: 'transparent', dark: 'transparent' },
  none: { light: 'transparent', dark: 'transparent' },
};

const borderColorFocus = {
  standard: { light: colors.B100, dark: colors.B75 },
  disabled: { light: colors.B100, dark: colors.B75 },
  invalid: { light: colors.B100, dark: colors.B75 },
  subtle: { light: colors.B100, dark: colors.B75 },
  none: { light: 'transparent', dark: 'transparent' },
};

const placeholderTextColor = { light: colors.N100, dark: colors.DN200 };

const textColor = { light: colors.N900, dark: colors.DN600 };
const disabledTextColor = { light: colors.N70, dark: colors.DN90 };

export type ThemeAppearance =
  | 'standard'
  | 'disabled'
  | 'invalid'
  | 'subtle'
  | 'none';

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

const grid = gridSize();
const borderRadius = '3px';
const borderWidth = 2;
const lineHeightBase = grid * 2.5;
const lineHeightCompact = grid * 2;
const heightBase = grid * 5;
const heightCompact = grid * 4;
const horizontalPadding = grid;
const innerHeight = grid * 3;
const transitionDuration = '0.2s';

const getLineHeight = isCompact =>
  (isCompact ? lineHeightCompact : lineHeightBase) / fontSize();
const getHeight = isCompact => (isCompact ? heightCompact : heightBase);

export default (props: ThemeProps): ThemeProps => {
  const mode = props.mode || 'light';
  return {
    textArea: ({
      appearance,
      isCompact,
    }: {
      appearance: ThemeAppearance,
      isCompact: boolean,
    }) => ({
      borderColor: borderColor[appearance][mode],
      borderColorFocus: borderColorFocus[appearance][mode],
      backgroundColorHover: backgroundColorHover[appearance][mode],
      backgroundColorFocus: backgroundColorFocus[appearance][mode],
      backgroundColor: backgroundColor[appearance][mode],
      textColor: textColor[mode],
      disabledTextColor: disabledTextColor[mode],
      placeholderTextColor: placeholderTextColor[mode],
      borderRadius,
      borderWidth,
      baseHeight: getHeight(isCompact),
      lineHeight: getLineHeight(isCompact),
      horizontalPadding,
      innerHeight,
      transitionDuration,
    }),
    mode,
    ...props,
  };
};
