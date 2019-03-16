import styled from 'styled-components';
import { gridSize, math } from '@atlaskit/theme';
var Expand = styled.div.withConfig({
  displayName: "Expand",
  componentId: "r9emlm-0"
})(["\n  align-items: center;\n  display: flex;\n  flex: 0 0 ", "px;\n  justify-content: center;\n  margin: 0 ", "px;\n"], math.multiply(gridSize, 3), gridSize);
Expand.displayName = 'SingleSelectExpand';
export default Expand;