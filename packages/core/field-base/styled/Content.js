import styled, { css } from 'styled-components';
import { gridSize, fontSize, colors, themed } from '@atlaskit/theme';
import { getBackgroundColor, getBackgroundColorFocus, getBackgroundColorHover, getBorderColor, getBorderColorFocus } from './theme';
var borderRadius = '3px';
var borderWidth = 2;
var grid = gridSize();
var lineHeightBase = grid * 2.5;
var lineHeightCompact = grid * 2;
var heightBase = grid * 5;
var heightCompact = grid * 4;
var horizontalPadding = grid;
var innerHeight = grid * 3;
var transitionDuration = '0.2s';

var getBorderAndPadding = function getBorderAndPadding(_ref) {
  var paddingDisabled = _ref.paddingDisabled,
      compact = _ref.compact;
  var height = compact ? heightCompact : heightBase;
  var padding = paddingDisabled ? "0" : "".concat((height - 2 * borderWidth - innerHeight) / 2, "px ").concat(horizontalPadding - borderWidth, "px");
  return css(["\n    border-width: ", "px;\n    padding: ", ";\n  "], borderWidth, padding);
};

var getLineHeight = function getLineHeight(props) {
  var currentLineHeight = props.compact ? lineHeightCompact : lineHeightBase;
  return currentLineHeight / fontSize();
};

var getDisabledColor = themed({
  light: colors.N70,
  dark: colors.DN90
});

var getDisabledState = function getDisabledState(props) {
  return props.disabled && css(["\n    color: ", ";\n    pointer-events: none;\n  "], getDisabledColor(props));
};

var getHoverState = function getHoverState(props) {
  if (props.readOnly || props.isFocused || props.none) return null;
  return css(["\n    &:hover {\n      background-color: ", ";\n    }\n  "], getBackgroundColorHover(props));
};

var getBorderStyle = function getBorderStyle(props) {
  return props.appearance === 'none' ? 'none' : 'solid';
};

var getMinHeight = function getMinHeight(_ref2) {
  var compact = _ref2.compact;
  var minHeight = compact ? heightCompact : heightBase;
  return css(["\n    min-height: ", "px;\n  "], minHeight);
}; // need an element wrapping the children because IE11 doesn't apply min-height correctly
// to flex-elements. See https://github.com/philipwalton/flexbugs#3-min-height-on-a-flex-container-wont-apply-to-its-flex-items


export var ChildWrapper = styled.div.withConfig({
  displayName: "Content__ChildWrapper",
  componentId: "ve26fj-0"
})(["\n  display: flex;\n  flex-direction: column;\n  flex: 1 0 auto;\n  max-width: 100%;\n  ", ";\n"], function (p) {
  return getMinHeight(p);
});
var getColor = themed({
  light: colors.N900,
  dark: colors.DN600
});
export var Content = styled.div.withConfig({
  displayName: "Content",
  componentId: "ve26fj-1"
})(["\n  align-items: center;\n  background-color: ", ";\n  border-color: ", ";\n  border-radius: ", ";\n  border-style: ", ";\n  box-sizing: border-box;\n  color: ", ";\n  display: flex;\n  flex: 1 0 auto;\n  font-size: ", "px;\n  justify-content: space-between;\n  line-height: ", ";\n  max-width: 100%;\n  overflow: hidden;\n  transition: background-color ", " ease-in-out,\n    border-color ", " ease-in-out;\n  word-wrap: break-word;\n  ", " ", " ", ";\n"], function (props) {
  return props.isFocused ? getBackgroundColorFocus(props) : getBackgroundColor(props);
}, function (props) {
  return props.isFocused ? getBorderColorFocus(props) : getBorderColor(props);
}, borderRadius, getBorderStyle, getColor, fontSize, getLineHeight, transitionDuration, transitionDuration, getBorderAndPadding, getHoverState, getDisabledState);

var getMaxWidth = function getMaxWidth(maxWidth) {
  return maxWidth ? "".concat(maxWidth, "px") : '100%';
};
/* IE11 does not respect max-width when using flex-grow + nested flex content, similar to https://github.com/philipwalton/flexbugs#flexbug-11
 * and https://github.com/philipwalton/flexbugs#flexbug-17.
 * This can be fixed by setting the basis to 100%, allowing shrinking and setting the min-width to the original flex-basis value
 * (or 0 if it was auto).
 * Alternatively since we're just setting the contents to fit parent container when grow is set to true, we can just change flex-basis
 * to 100% and not worry about shrinking or growing.
 * See AK-4285.
 */


export var ContentWrapper = styled.div.withConfig({
  displayName: "Content__ContentWrapper",
  componentId: "ve26fj-2"
})(["\n  ", " ", " ", " max-width: ", ";\n"], function (props) {
  return props.disabled && "\n      cursor: not-allowed;\n    ";
}, function (props) {
  return props.grow ? css(["\n        flex: 0 0 ", ";\n      "], getMaxWidth(props.maxWidth)) : "\n          flex: 0 0 auto;\n        ";
}, function (props) {
  return props.grow ? "\n          display: block;\n        " : "\n          display: inline-block;\n          vertical-align: top;\n        ";
}, function (props) {
  return getMaxWidth(props.maxWidth);
});