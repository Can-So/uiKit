import { createTheme } from '@atlaskit/theme';
import * as componentTokens from './component-tokens';
var disabledRules = {
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
var invalidRules = {
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
// The following do not yet have a darkmode 'map': N20A, N10
var backgroundColor = {
    standard: componentTokens.defaultBackgroundColor,
    subtle: componentTokens.transparent,
    none: componentTokens.transparent,
};
var backgroundColorFocus = {
    standard: componentTokens.defaultBackgroundColorFocus,
    subtle: componentTokens.defaultBackgroundColorFocus,
    none: componentTokens.transparent,
};
var backgroundColorHover = {
    standard: componentTokens.defaultBackgroundColorHover,
    subtle: componentTokens.defaultBackgroundColorHover,
    none: componentTokens.transparent,
};
var borderColor = {
    standard: componentTokens.defaultBorderColor,
    subtle: componentTokens.transparent,
    none: componentTokens.transparent,
};
var borderColorFocus = {
    standard: componentTokens.defaultBorderColorFocus,
    subtle: componentTokens.defaultBorderColorFocus,
    none: componentTokens.transparent,
};
export var themeTokens = {
    borderColor: borderColor,
    borderColorFocus: borderColorFocus,
    backgroundColor: backgroundColor,
    backgroundColorFocus: backgroundColorFocus,
    backgroundColorHover: backgroundColorHover,
    disabledRules: disabledRules,
    invalidRules: invalidRules,
    textColor: componentTokens.textColor,
    placeholderTextColor: componentTokens.placeholderTextColor,
};
export var Theme = createTheme(function (_a) {
    var appearance = _a.appearance, mode = _a.mode;
    return ({
        borderColor: borderColor[appearance][mode],
        borderColorFocus: borderColorFocus[appearance][mode],
        backgroundColorHover: backgroundColorHover[appearance][mode],
        backgroundColorFocus: backgroundColorFocus[appearance][mode],
        backgroundColor: backgroundColor[appearance][mode],
        disabledRules: disabledRules[mode],
        invalidRules: invalidRules[mode],
        textColor: componentTokens.textColor[mode],
        placeholderTextColor: componentTokens.placeholderTextColor[mode],
    });
});
//# sourceMappingURL=theme.js.map