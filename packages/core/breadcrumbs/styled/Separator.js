import styled from 'styled-components';
import { colors, gridSize } from '@findable/theme';
var ThemeColor = {
  text: colors.N100
};
var Separator = styled.div.withConfig({
  displayName: "Separator",
  componentId: "c8t0qf-0"
})(["\n  color: ", ";\n  flex-shrink: 0;\n  padding: 0 ", "px;\n  text-align: center;\n  width: ", "px;\n"], ThemeColor.text, gridSize, gridSize);
Separator.displayName = 'Separator';
export default Separator;