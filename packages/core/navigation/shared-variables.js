import { colors, gridSize as akGridSize, layers, themed } from '@findable/theme';
/**
 * NOTE: changing the width of the Navigation is considered a breaking change
 */

export var gridSize = akGridSize();
var defaultClosedWidth = gridSize * 8; // Not using grid units here because this is a macOS-specific value and is not
// related to the ADG 3 grid.

var extraElectronGlobalNavWidth = 4;
export var layout = {
  padding: {
    top: gridSize * 2,
    bottom: gridSize * 2,
    side: gridSize
  },
  width: {
    closed: {
      default: defaultClosedWidth,
      electron: defaultClosedWidth + extraElectronGlobalNavWidth
    }
  }
};
export var globalItemSizes = {
  small: gridSize * 4,
  medium: gridSize * 5,
  large: gridSize * 6
};
export var containerTitleBottomMargin = gridSize;
export var containerTitleHorizontalPadding = gridSize / 2;
export var containerTitleIconSpacing = gridSize;
export var drawerOffset = gridSize * 2;
export var drawerContainerHeaderAnimationSpeed = '220ms';
export var globalOpenWidth = function globalOpenWidth() {
  var isElectron = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return layout.width.closed[isElectron ? 'electron' : 'default'];
};
export var containerClosedWidth = function containerClosedWidth() {
  var isElectron = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return globalOpenWidth(isElectron);
};
export var containerOpenWidth = 240;
export var standardOpenWidth = function standardOpenWidth() {
  var isElectron = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return globalOpenWidth(isElectron) + containerOpenWidth;
};
export var resizeClosedBreakpoint = function resizeClosedBreakpoint() {
  var isElectron = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return globalOpenWidth(isElectron) + containerOpenWidth / 2;
};
export var drawerIconOffset = 80;
export var animationTimeUnitless = 200;
export var animationTime = "".concat(animationTimeUnitless, "ms");
export var resizeAnimationTime = animationTime;
export var zIndex = {
  base: layers.navigation(),
  // needs to sit on top of navigation and the drawer
  drawer: layers.blanket() + 1
}; // these are colors that are currently not controllable via theming

export var unthemedColors = {
  resizer: themed({
    light: colors.B100,
    dark: colors.B100
  }),
  presenceIconBg: colors.N0
};
export var scrollBarSize = gridSize;
export var scrollHintHeight = 2;
export var scrollHintSpacing = gridSize * 2;
export var globalPrimaryActions = function () {
  var itemSizes = {
    medium: gridSize * 5
  };
  var margin = {
    bottom: gridSize * 2
  };

  var height = function height(actionCount) {
    var innerHeight = itemSizes.medium * (actionCount + 1) + gridSize * 2;
    return {
      inner: innerHeight,
      outer: gridSize + margin.bottom + innerHeight
    };
  };

  return {
    height: height,
    margin: margin,
    itemSizes: itemSizes
  };
}();
export var globalSecondaryActions = function () {
  var itemSizes = {
    medium: gridSize * 5
  };
  var margin = {
    bottom: gridSize * 2
  };

  var height = function height(actionCount) {
    var innerHeight = itemSizes.medium * actionCount;
    return {
      inner: innerHeight,
      outer: margin.bottom + innerHeight
    };
  };

  return {
    height: height,
    margin: margin,
    itemSizes: itemSizes
  };
}();
export var resizerClickableWidth = gridSize * 2;
export var resizerVisibleWidth = 2;