import styled from 'styled-components';
import { colors, gridSize } from '@atlaskit/theme';
import { BORDER_WIDTH } from '@atlaskit/avatar'; // TODO: use math utilities within styled component

var gutterUnitless = gridSize() / 2;
var gutter = "".concat(gutterUnitless, "px");
export var Grid = styled.div.withConfig({
  displayName: "AvatarGroup__Grid",
  componentId: "sc-19dfd4t-0"
})(["\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  line-height: 1;\n  margin-left: -", ";\n  margin-right: -", ";\n\n  > * {\n    margin-bottom: ", ";\n    padding-left: ", ";\n    padding-right: ", ";\n  }\n"], gutter, gutter, gridSize, gutter, gutter);
export var Stack = styled.div.withConfig({
  displayName: "AvatarGroup__Stack",
  componentId: "sc-19dfd4t-1"
})(["\n  display: flex;\n  line-height: 1;\n  /* Balance the negative margin of the children */\n  margin-right: ", "px;\n\n  > * {\n    margin-right: -", "px;\n  }\n"], function (props) {
  return BORDER_WIDTH[props.size] * 2 + gutterUnitless;
}, function (props) {
  return BORDER_WIDTH[props.size] * 2 + gutterUnitless;
});
export function getBackgroundColor(_ref) {
  var isActive = _ref.isActive,
      isHover = _ref.isHover;
  var themedBackgroundColor = colors.backgroundOnLayer;

  if (isHover) {
    themedBackgroundColor = colors.backgroundHover;
  }

  if (isActive) {
    themedBackgroundColor = colors.backgroundActive;
  }

  return themedBackgroundColor;
}