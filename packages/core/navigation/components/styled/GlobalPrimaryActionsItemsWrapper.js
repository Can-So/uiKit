import styled from 'styled-components';
import { gridSize } from '../../shared-variables';
export var actionsMarginTop = gridSize * 2;
var GlobalPrimaryActionsItemsWrapper = styled.div.withConfig({
  displayName: "GlobalPrimaryActionsItemsWrapper",
  componentId: "syvucr-0"
})(["\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  margin-top: ", "px;\n"], actionsMarginTop);
GlobalPrimaryActionsItemsWrapper.displayName = 'GlobalPrimaryActionsItemsWrapper';
export default GlobalPrimaryActionsItemsWrapper;