import { css } from 'styled-components';
import { colors, themed } from '@atlaskit/theme';
import { AVATAR_RADIUS, AVATAR_SIZES, BORDER_WIDTH, TRANSITION_DURATION } from './constants';
var backgroundColorFocus = colors.B200;
var overlayColorDefault = 'transparent';
var overlayColorHover = colors.N70A;
var overlayColorSelected = colors.N200A;
var overlayColorDisabled = themed({
  light: 'rgba(255, 255, 255, 0.7)',
  dark: colors.DN80A
}); // "square" avatars are explicit

export function getBorderRadius(props) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    includeBorderWidth: false
  };
  var borderWidth = config.includeBorderWidth ? BORDER_WIDTH[props.size] : 0;
  return props.appearance === 'circle' ? '50%' : "".concat(AVATAR_RADIUS[props.size] + borderWidth, "px");
}
export var getSize = function getSize(props) {
  return AVATAR_SIZES[props.size];
}; // for testing

export function getAvatarDimensions(props) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    includeBorderWidth: false,
    sizeOnly: false
  };
  var borderWidth = config.includeBorderWidth ? BORDER_WIDTH[props.size] * 2 : 0;
  var size = AVATAR_SIZES[props.size] + borderWidth;
  return config.sizeOnly ? size : "\n    height: ".concat(size, "px;\n    width: ").concat(size, "px;\n  ");
} // expose here for use with multiple element types

export function getInnerStyles(props) {
  var boxSizing = 'content-box';
  var borderWidth = "".concat(BORDER_WIDTH[props.size], "px");
  var isInteractive = Boolean(props.isInteractive || props.href || props.onClick); // We make the distinction between isInteractive and isClickable as supplying a tooltip
  // makes the avatar interactive but not clickable

  var isClickable = Boolean(props.href || props.onClick);
  var backgroundColor = props.borderColor || colors.background; // Inherit cursor styles so we don't cancel out pointer cursors in places like avatar group more dropdown

  var cursor = 'inherit';
  var outline = 'none';
  var overlayShade = overlayColorDefault;
  var overlayOpacity = 0;
  var pointerEvents = 'auto';
  var position = 'static';
  var transform = 'translateZ(0)';
  var transitionDuration = '0s'; // Interaction: Hover

  if (isInteractive && (props.isActive || props.isHover)) {
    overlayShade = overlayColorHover;
    overlayOpacity = 1;
  } // Interaction: Active


  if (isClickable && props.isActive) {
    transform = 'scale(0.9)';
  } // Interaction: Focus


  if (isInteractive && props.isFocus && !props.isActive) {
    outline = 'none';
    backgroundColor = backgroundColorFocus;
    transitionDuration = TRANSITION_DURATION;
  } // Disabled


  if (props.isDisabled) {
    cursor = 'not-allowed';
    overlayShade = overlayColorDisabled;
    overlayOpacity = 1;
    pointerEvents = 'none';
  } // Clickable


  if (isClickable) {
    cursor = 'pointer';
  } // Loading


  if (props.isSelected) {
    overlayShade = overlayColorSelected;
    overlayOpacity = 1;
  } // Stack


  if (props.stackIndex) {
    position = 'relative';
  }

  return css(["\n    ", ";\n    align-items: stretch;\n    background-color: ", ";\n    border: 0;\n    border-radius: ", ";\n    padding: ", ";\n    box-sizing: ", ";\n    cursor: ", ";\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    outline: ", ";\n    overflow: hidden;\n    pointer-events: ", ";\n    position: ", ";\n    transform: ", ";\n    transition: background-color ", " ease-out;\n\n    a &,\n    button & {\n      cursor: pointer;\n    }\n\n    &::after {\n      background-color: ", ";\n      border-radius: ", ";\n      bottom: ", ";\n      content: ' ';\n      left: ", ";\n      opacity: ", ";\n      pointer-events: none;\n      position: absolute;\n      right: ", ";\n      top: ", ";\n      transition: opacity ", ";\n    }\n\n    &::-moz-focus-inner {\n      border: 0;\n      margin: 0;\n      padding: 0;\n    }\n  "], getAvatarDimensions, backgroundColor, function (p) {
    return getBorderRadius(p, {
      includeBorderWidth: true
    });
  }, borderWidth, boxSizing, cursor, outline, pointerEvents, position, transform, transitionDuration, overlayShade, getBorderRadius, borderWidth, borderWidth, overlayOpacity, borderWidth, borderWidth, TRANSITION_DURATION);
}