import { gridSize } from '@atlaskit/theme';
export var TRANSITION_DURATION = '200ms';
var gridSizeValue = gridSize();
export var AVATAR_SIZES = {
  xsmall: gridSizeValue * 2,
  small: gridSizeValue * 3,
  medium: gridSizeValue * 4,
  large: gridSizeValue * 5,
  xlarge: gridSizeValue * 12,
  xxlarge: gridSizeValue * 16
}; // border radius only applies to "square" avatars

export var AVATAR_RADIUS = {
  xsmall: 2,
  small: 2,
  medium: 3,
  large: 3,
  xlarge: 6,
  xxlarge: 12
};
export var BORDER_WIDTH = {
  xsmall: 2,
  small: 2,
  medium: 2,
  large: 2,
  xlarge: 2,
  xxlarge: 2
}; // NOTE: sizes xsmall & xxlarge DO NOT support
// - groups
// - presence
// - status

export var EXCESS_INDICATOR_FONT_SIZE = {
  small: 10,
  medium: 11,
  large: 12,
  xlarge: 16
};
export var ICON_SIZES = {
  small: 12,
  medium: 14,
  large: 15,
  xlarge: 18
};
export var ICON_OFFSET = {
  small: 0,
  medium: 0,
  large: 1,
  xlarge: 7
};
export var SQUARE_ICON_OFFSET = {
  small: 0,
  medium: 0,
  large: 0,
  xlarge: 1
};