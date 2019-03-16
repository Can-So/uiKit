import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { colors, themed } from '@atlaskit/theme';
import { themeNamespace as buttonThemeNamespace } from '@atlaskit/button';
var lightButtonBackground = 'rgba(255, 255, 255, 0.08)';
export var flagBackgroundColor = themed('appearance', {
  error: {
    light: colors.R400,
    dark: colors.R300
  },
  info: {
    light: colors.N500,
    dark: colors.N500
  },
  normal: {
    light: colors.N0,
    dark: colors.DN50
  },
  success: {
    light: colors.G400,
    dark: colors.G300
  },
  warning: {
    light: colors.Y200,
    dark: colors.Y300
  }
});
export var flagBorderColor = themed('appearance', {
  // $FlowFixMe - theme is not found in props
  normal: {
    light: colors.N60A
  }
});
export var flagTextColor = themed('appearance', {
  error: {
    light: colors.N0,
    dark: colors.DN40
  },
  info: {
    light: colors.N0,
    dark: colors.DN600
  },
  normal: {
    light: colors.N500,
    dark: colors.DN600
  },
  success: {
    light: colors.N0,
    dark: colors.DN40
  },
  warning: {
    light: colors.N700,
    dark: colors.DN40
  }
});
export var flagShadowColor = themed('appearance', {
  error: {
    light: colors.N50A,
    dark: colors.N50A
  },
  info: {
    light: colors.N50A,
    dark: colors.N50A
  },
  normal: {
    light: colors.N50A,
    dark: colors.N50A
  },
  success: {
    light: colors.N50A,
    dark: colors.N50A
  },
  warning: {
    light: colors.N50A,
    dark: colors.N50A
  }
}); // $FlowFixMe - theme is not found in props

export var flagFocusRingColor = themed('appearance', {
  error: {
    light: colors.N40,
    dark: colors.N40
  },
  info: {
    light: colors.N40,
    dark: colors.N40
  },
  normal: {
    light: colors.B100,
    dark: colors.link
  },
  success: {
    light: colors.N40,
    dark: colors.N40
  },
  warning: {
    light: colors.N200,
    dark: colors.N200
  }
});
var shared = {
  textDecoration: {
    hover: 'underline',
    active: 'underline'
  }
};
export var getFlagTheme = function getFlagTheme(theme) {
  return _objectSpread({}, theme, _defineProperty({}, buttonThemeNamespace, _objectSpread({}, theme && theme[buttonThemeNamespace], {
    success: _objectSpread({}, shared, {
      color: {
        default: themed({
          light: colors.N0,
          dark: colors.DN40
        }),
        hover: themed({
          light: colors.N0,
          dark: colors.DN40
        }),
        active: themed({
          light: colors.N0,
          dark: colors.DN40
        })
      },
      background: {
        default: themed({
          light: lightButtonBackground,
          dark: colors.N30A
        })
      }
    }),
    info: _objectSpread({}, shared, {
      color: {
        default: themed({
          light: colors.N0,
          dark: colors.DN600
        }),
        hover: themed({
          light: colors.N0,
          dark: colors.DN600
        }),
        active: themed({
          light: colors.N0,
          dark: colors.DN600
        })
      },
      background: {
        default: themed({
          light: lightButtonBackground,
          dark: lightButtonBackground
        })
      }
    }),
    error: _objectSpread({}, shared, {
      color: {
        default: themed({
          light: colors.N0,
          dark: colors.DN600
        }),
        hover: themed({
          light: colors.N0,
          dark: colors.DN600
        }),
        active: themed({
          light: colors.N0,
          dark: colors.DN600
        })
      },
      background: {
        default: themed({
          light: lightButtonBackground,
          dark: colors.N30A
        })
      }
    }),
    warning: _objectSpread({}, shared, {
      color: {
        default: themed({
          light: colors.N700,
          dark: colors.DN40
        }),
        hover: themed({
          light: colors.N700,
          dark: colors.DN40
        }),
        active: themed({
          light: colors.N700,
          dark: colors.DN40
        })
      },
      background: {
        default: themed({
          light: colors.N30A,
          dark: colors.N30A
        })
      }
    }),
    normal: {}
  })));
};