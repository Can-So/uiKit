import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import styled, { css } from 'styled-components';
import { gridSize, fontSize, colors, math } from '@atlaskit/theme';
import { buttonWidthUnitless, maxTextWidth, maxTextWidthUnitless } from '../constants'; // Common styles for Text & Link

var COMMON_STYLES = css(["\n  font-size: ", "px;\n  font-weight: normal;\n  line-height: 1;\n  margin-left: ", "px;\n  margin-right: ", "px;\n  padding: 2px 0;\n  max-width: ", ";\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"], fontSize, math.divide(gridSize, 2), math.divide(gridSize, 2), function (_ref) {
  var isRemovable = _ref.isRemovable;
  return isRemovable ? "".concat(maxTextWidthUnitless - buttonWidthUnitless, "px") : maxTextWidth;
});
export var Text = styled.span.withConfig({
  displayName: "styled__Text",
  componentId: "sc-17jb35i-0"
})(["\n  ", ";\n"], COMMON_STYLES); // Styles exclusive to Link

var getFocusedStyles = function getFocusedStyles(_ref2) {
  var isFocused = _ref2.isFocused,
      color = _ref2.color,
      rest = _objectWithoutProperties(_ref2, ["isFocused", "color"]);

  if (color !== 'standard') return css(["\n      color: inherit;\n    "]);
  if (isFocused) return css(["\n      color: ", ";\n    "], colors.link(rest));
  return null;
};

export var linkStyles = css(["\n  ", " ", " text-decoration: ", ";\n\n  &:hover {\n    color: ", ";\n    ", ";\n  }\n"], COMMON_STYLES, getFocusedStyles, function (_ref3) {
  var color = _ref3.color;
  return color === 'standard' ? 'none' : 'underline';
}, colors.linkHover, function (_ref4) {
  var color = _ref4.color;
  return color === 'standard' ? '' : css(["\n            color: inherit;\n          "]);
});
export var Link = styled.a.withConfig({
  displayName: "styled__Link",
  componentId: "sc-17jb35i-1"
})(["\n  ", ";\n"], linkStyles);