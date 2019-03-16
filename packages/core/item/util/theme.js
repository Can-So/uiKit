import { colors, gridSize as akGridSize, borderRadius } from '@atlaskit/theme';
export var themeNamespace = '@atlaskit-shared-theme/item'; // Used for Group titles and Item descriptions

export var compactSmallFontSize = 10;
export var compactLineHeight = 1.2;
export var gridSize = akGridSize();
export var defaultTheme = {
  afterItemSpacing: {
    compact: akGridSize(),
    default: akGridSize()
  },
  beforeItemSpacing: {
    compact: akGridSize(),
    default: akGridSize()
  },
  borderRadius: borderRadius(),
  focus: {
    outline: colors.B100
  },
  height: {
    compact: 0,
    default: 0
  },
  padding: {
    default: {
      bottom: akGridSize() / 2,
      left: akGridSize() / 2,
      right: akGridSize() / 2,
      top: akGridSize() / 2
    },
    compact: {
      bottom: akGridSize(),
      left: akGridSize(),
      right: akGridSize(),
      top: akGridSize()
    }
  },
  default: {
    background: colors.background,
    text: colors.text,
    secondaryText: colors.N200
  },
  selected: {
    background: colors.backgroundActive,
    text: colors.N500,
    secondaryText: colors.N200
  },
  active: {
    background: colors.backgroundActive,
    text: colors.textActive,
    secondaryText: colors.N200
  },
  hover: {
    background: colors.backgroundHover,
    text: colors.textHover,
    secondaryText: colors.N200
  },
  disabled: {
    background: colors.N0,
    text: colors.N200,
    secondaryText: colors.N200
  },
  // same as hover in this case
  dragging: {
    background: colors.N20,
    text: colors.N800,
    secondaryText: colors.N200
  }
};

var isValidCssValue = function isValidCssValue(value) {
  return value !== undefined && value !== null && value !== '';
}; // Returns the theme that contains the requested theme key(s), preferring the user-supplied
// theme if it is provided.


export var themeWithKeys = function themeWithKeys(maybeTheme, key, parentKey) {
  if (parentKey) {
    return maybeTheme && maybeTheme[parentKey] && isValidCssValue(maybeTheme[parentKey][key]) ? maybeTheme : defaultTheme;
  }

  return maybeTheme && isValidCssValue(maybeTheme[key]) ? maybeTheme : defaultTheme;
}; // Returns the theme value for the requested key(s), falling back to the default theme if the
// user-supplied theme doesn't exist or doesn't contain the requested key(s)

export var getThemeStyle = function getThemeStyle(maybeTheme, key, parentKey) {
  var theme = themeWithKeys(maybeTheme, key, parentKey);
  return parentKey ? theme[parentKey][key] : theme[key];
};