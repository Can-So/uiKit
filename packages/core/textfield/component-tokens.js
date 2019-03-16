import { colors } from '@atlaskit/theme'; // The following are the name for color mappings in @atlaskit/themes
// The exports are the functions, not the objects, so could not be used here

export var disabledBackgroundColor = {
  light: colors.N20,
  dark: colors.DN20
}; // For validation red is the new 'yellow' which was { light: colors.Y300, dark: colors.Y300 }

export var invalidBorderColor = {
  light: colors.R400,
  dark: colors.R400
}; // The following do not yet have a darkmode 'map': N20A, N10

export var defaultBackgroundColor = {
  light: colors.N10,
  dark: colors.DN10
};
export var defaultBackgroundColorFocus = {
  light: colors.N0,
  dark: colors.DN10
};
export var defaultBackgroundColorHover = {
  light: colors.N30,
  dark: colors.DN30
};
export var defaultBorderColor = {
  light: colors.N40,
  dark: colors.DN40
};
export var defaultBorderColorFocus = {
  light: colors.B100,
  dark: colors.B75
};
export var transparent = {
  light: 'transparent',
  dark: 'transparent'
};
export var textColor = {
  light: colors.N900,
  dark: colors.DN600
};
export var disabledTextColor = {
  light: colors.N70,
  dark: colors.DN90
};
export var placeholderTextColor = {
  light: colors.N100,
  dark: colors.DN90
};