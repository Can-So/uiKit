import styled from 'styled-components';
import { gridSize, math } from '@atlaskit/theme';
var Trigger = styled.div.withConfig({
  displayName: "Trigger",
  componentId: "sc-10ra0wx-0"
})(["\n  align-items: center;\n  display: flex;\n  min-height: ", "px;\n  outline: none;\n  width: 100%;\n"], math.multiply(gridSize, 4.5));
Trigger.displayName = 'SingleSelectTrigger';
export default Trigger;