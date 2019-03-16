import _objectSpread from "@babel/runtime/helpers/objectSpread";
import { colors, createTheme, gridSize } from '@findable/theme';
var gridSizeValue = gridSize();
var AVATAR_SIZES = {
  xsmall: gridSizeValue * 2,
  small: gridSizeValue * 3,
  medium: gridSizeValue * 4,
  large: gridSizeValue * 5,
  xlarge: gridSizeValue * 12,
  xxlarge: gridSizeValue * 16
}; // border radius only applies to "square" avatars

var AVATAR_RADIUS = {
  xsmall: 2,
  small: 2,
  medium: 3,
  large: 3,
  xlarge: 6,
  xxlarge: 12
};
var BORDER_WIDTH = {
  xsmall: 2,
  small: 2,
  medium: 2,
  large: 2,
  xlarge: 2,
  xxlarge: 2
};
var ICON_SIZES = {
  xsmall: 0,
  small: 12,
  medium: 14,
  large: 15,
  xlarge: 18,
  xxlarge: 0
};
var ICON_OFFSET = {
  xsmall: 0,
  small: 0,
  medium: 0,
  large: 1,
  xlarge: 7,
  xxlarge: 0
};
var SQUARE_ICON_OFFSET = {
  xsmall: 0,
  small: 0,
  medium: 0,
  large: 0,
  xlarge: 1,
  xxlarge: 0
};

function getBackgroundColor(props) {
  var backgroundColors = {
    light: colors.N40,
    dark: colors.DN50
  };
  return props.isLoading ? backgroundColors[props.mode] : 'transparent';
}

function getBorderRadius(props) {
  var borderWidth = props.includeBorderWidth ? BORDER_WIDTH[props.size] : 0;
  var borderRadius = props.appearance === 'circle' ? '50%' : "".concat(AVATAR_RADIUS[props.size] + borderWidth, "px");
  return borderRadius;
}

function getDimensions(props) {
  var borderWidth = props.includeBorderWidth ? BORDER_WIDTH[props.size] * 2 : 0;
  var size = AVATAR_SIZES[props.size] + borderWidth;
  var width = "".concat(size, "px");
  var height = width;
  return {
    height: height,
    width: width
  };
}

var getPresenceLayout = function getPresenceLayout(props) {
  var presencePosition = props.appearance === 'square' ? -(BORDER_WIDTH[props.size] * 2) : ICON_OFFSET[props.size];
  var presenceSize = ICON_SIZES[props.size];
  return {
    bottom: "".concat(presencePosition, "px"),
    height: "".concat(presenceSize, "px"),
    right: "".concat(presencePosition, "px"),
    width: "".concat(presenceSize, "px")
  };
};

var getStatusLayout = function getStatusLayout(props) {
  var statusPosition = props.appearance === 'square' ? SQUARE_ICON_OFFSET[props.size] : ICON_OFFSET[props.size];
  var statusSize = ICON_SIZES[props.size];
  return {
    height: "".concat(statusSize, "px"),
    right: "".concat(statusPosition, "px"),
    top: "".concat(statusPosition, "px"),
    width: "".concat(statusSize, "px")
  };
};

var propsDefaults = {
  appearance: 'circle',
  includeBorderWidth: false,
  isLoading: false,
  mode: 'light',
  presence: 'offline',
  size: 'xsmall'
};
export var Theme = createTheme(function (props) {
  var propsWithDefaults = _objectSpread({}, propsDefaults, props);

  return {
    backgroundColor: getBackgroundColor(propsWithDefaults),
    borderRadius: getBorderRadius(propsWithDefaults),
    dimensions: getDimensions(propsWithDefaults),
    presence: getPresenceLayout(propsWithDefaults),
    status: getStatusLayout(propsWithDefaults)
  };
});