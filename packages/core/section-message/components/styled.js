import styled from 'styled-components';
import { borderRadius, colors, math, gridSize, typography } from '@atlaskit/theme';
export var Container = styled.section.withConfig({
  displayName: "styled__Container",
  componentId: "sc-92zysz-0"
})(["\n  display: flex;\n  border-radius: ", "px;\n  background-color: ", ";\n  padding: ", "px;\n"], borderRadius, function (_ref) {
  var backgroundColor = _ref.backgroundColor;
  return backgroundColor;
}, math.multiply(gridSize, 2));
export var Title = styled.h1.withConfig({
  displayName: "styled__Title",
  componentId: "sc-92zysz-1"
})(["\n  margin: 0;\n  ", ";\n"], typography.h500);
export var Description = styled.div.withConfig({
  displayName: "styled__Description",
  componentId: "sc-92zysz-2"
})(["\n  * + & {\n    margin-top: 8px;\n  }\n"]);
export var Actions = styled.ul.withConfig({
  displayName: "styled__Actions",
  componentId: "sc-92zysz-3"
})(["\n  display: flex;\n  list-style: none;\n  padding-left: 0;\n  * + & {\n    margin-top: 8px;\n  }\n"]);
export var Action = styled.li.withConfig({
  displayName: "styled__Action",
  componentId: "sc-92zysz-4"
})(["\n  align-items: center;\n  display: flex;\n  margin: 0;\n  & + &::before {\n    color: ", ";\n    content: '\xB7';\n    display: inline-block;\n    text-align: center;\n    vertical-align: middle;\n    width: ", "px;\n  }\n"], colors.N500, math.multiply(gridSize, 2)); // If the icon is not wrapped in a div with a width, and we instead use margin or
// padding, the icon is shrunk by the padding.
// Since the icons will have a consistent size, we can treat them as pre-calculated
// space.

export var IconWrapper = styled.div.withConfig({
  displayName: "styled__IconWrapper",
  componentId: "sc-92zysz-5"
})(["\n  flex: 0 0 auto;\n  width: ", "px;\n  > span {\n    margin: -2px 0;\n    vertical-align: top;\n  }\n"], math.multiply(gridSize, 5));