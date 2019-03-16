import styled from 'styled-components';
import { colors, gridSize } from '@findable/theme';
var gridSizeUnitless = gridSize();
var ButtonWrapper = styled.div.withConfig({
  displayName: "ButtonWrapper",
  componentId: "sc-1htsnph-0"
})(["\n  background-color: ", ";\n  border-radius: ", "px;\n  box-shadow: 0 ", "px ", "px -", "px ", ",\n    0 0 1px ", ";\n  box-sizing: border-box;\n  width: ", "px;\n  z-index: 200;\n\n  &:last-child {\n    margin-left: ", "px;\n  }\n"], colors.N0, gridSizeUnitless / 2 - 1, gridSizeUnitless / 2, gridSizeUnitless, gridSizeUnitless / 4, colors.N50A, colors.N60A, gridSizeUnitless * 4, gridSizeUnitless / 2);
ButtonWrapper.displayName = 'ButtonWrapper';
export default ButtonWrapper;