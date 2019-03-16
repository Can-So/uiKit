import styled from 'styled-components';
import { colors, themed, gridSize, borderRadius } from '@atlaskit/theme';
import { buttonWidthUnitless, tagHeight, focusRingColor } from '../constants';
import { backgroundColor, backgroundColorHover, textColor, textColorHover } from '../theme';
var gridSizeUnitless = gridSize();
var colorRemoval = themed({
  light: colors.R500,
  dark: colors.DN30
});
var colorRemovalHover = themed({
  light: colors.N700,
  dark: colors.DN30
});
var backgroundColorRemoval = themed({
  light: colors.R50,
  dark: colors.R100
});
export var Span = styled.span.withConfig({
  displayName: "styled__Span",
  componentId: "sc-19s9he1-0"
})(["\n  &:focus {\n    box-shadow: 0 0 0 2px ", ";\n    outline: none;\n  }\n\n  background-color: ", ";\n  color: ", ";\n  border-radius: ", ";\n  cursor: default;\n  display: flex;\n  height: ", ";\n  line-height: 1;\n  margin: ", "px;\n  padding: 0;\n  overflow: ", ";\n\n  &:hover {\n    box-shadow: none;\n    background-color: ", ";\n    color: ", ";\n  }\n"], focusRingColor, function (p) {
  return p.markedForRemoval ? backgroundColorRemoval(p) : backgroundColor(p);
}, function (p) {
  return p.markedForRemoval ? colorRemoval(p) : textColor(p);
}, function (_ref) {
  var isRounded = _ref.isRounded;
  return isRounded ? "".concat(buttonWidthUnitless / 2, "px") : "".concat(borderRadius(), "px");
}, tagHeight, gridSizeUnitless / 2, function (_ref2) {
  var isRemoved = _ref2.isRemoved,
      isRemoving = _ref2.isRemoving;
  return isRemoved || isRemoving ? 'hidden' : 'initial';
}, function (p) {
  return p.markedForRemoval ? backgroundColorRemoval(p) : backgroundColorHover(p);
}, function (p) {
  return p.markedForRemoval ? colorRemovalHover(p) : textColorHover(p);
});