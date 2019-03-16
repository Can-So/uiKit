import { gridSize, themed, colors } from '@atlaskit/theme';
export var focusRingColor = themed({
  light: colors.B100,
  dark: colors.B75
});
export var tagHeightUnitless = 2.5 * gridSize();
export var tagHeight = "".concat(tagHeightUnitless, "px");
export var buttonWidthUnitless = tagHeightUnitless; // button should be square

export var buttonWidth = tagHeight; // button should be square

export var maxWidthUnitless = 25 * gridSize();
export var maxWidth = "".concat(maxWidthUnitless, "px");
export var maxTextWidthUnitless = maxWidthUnitless - tagHeightUnitless;
export var maxTextWidth = "".concat(maxTextWidthUnitless, "px");