import styled from 'styled-components';
import { colors, gridSize, math, themed } from '@atlaskit/theme';
export default styled.div.withConfig({
  displayName: "Group",
  componentId: "sc-1q26u8b-0"
})(["\n  box-sizing: border-box;\n  display: block;\n  margin-top: ", "px;\n\n  &:first-child {\n    margin-top: 0;\n  }\n"], gridSize);
export var Heading = styled.div.withConfig({
  displayName: "Group__Heading",
  componentId: "sc-1q26u8b-1"
})(["\n  align-items: baseline;\n  color: ", ";\n  display: flex;\n  flex: 1 1 auto;\n  font-weight: normal;\n  font-size: 14px;\n  line-height: 1;\n  margin: 0;\n  padding: ", "px ", "px;\n"], themed({
  light: colors.N300,
  dark: colors.DN300
}), gridSize, math.multiply(gridSize, 1.5));
export var HeadingAfter = styled.div.withConfig({
  displayName: "Group__HeadingAfter",
  componentId: "sc-1q26u8b-2"
})(["\n  flex: 0 0 auto;\n"]);
export var HeadingText = styled.div.withConfig({
  displayName: "Group__HeadingText",
  componentId: "sc-1q26u8b-3"
})(["\n  flex: 1 1 auto;\n  font-size: 12px;\n  text-transform: uppercase;\n"]);