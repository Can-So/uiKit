import { gridSize } from '../shared-variables';
var fullWidth = '100vw';
var narrowWidth = 45 * gridSize;
var mediumWidth = 60 * gridSize;
var wideWidth = 75 * gridSize;
export var boxShadowSpread = gridSize * 4;
export var animationSpeed = '220ms';
export var animationTiming = 'cubic-bezier(0.15, 1, 0.3, 1)';
export var widthTransition = "width ".concat(animationSpeed, " ").concat(animationTiming);
export var drawerBackIconSize = gridSize * 5;
export var widths = {
  narrow: {
    width: "".concat(narrowWidth, "px"),
    offScreenTranslateX: "".concat(-narrowWidth - boxShadowSpread, "px")
  },
  medium: {
    width: "".concat(mediumWidth, "px"),
    offScreenTranslateX: "".concat(-mediumWidth - boxShadowSpread, "px")
  },
  wide: {
    width: "".concat(wideWidth, "px"),
    offScreenTranslateX: "".concat(-wideWidth - boxShadowSpread, "px")
  },
  full: {
    width: fullWidth,
    offScreenTranslateX: "calc(-".concat(fullWidth, " - ").concat(boxShadowSpread, "px)")
  }
};