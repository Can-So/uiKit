import styled from 'styled-components';
import { globalItemSizes } from '../../shared-variables';
var GlobalNavigationSecondaryContainer = styled.div.withConfig({
  displayName: "GlobalNavigationSecondaryContainer",
  componentId: "e1tamf-0"
})(["\n  /* align-self: center is used to horizontally align the global secondary nav items\n     to the center of the container nav when the nav items are shown in a\n     collapsed container nav */\n  align-self: center;\n  /* required to keep the secondary actions at the bottom */\n  flex-grow: 0;\n\n  /* Required to fix dropdowns in Safari. Won't be needed once layering is changed */\n  width: ", "px;\n"], globalItemSizes.small);
GlobalNavigationSecondaryContainer.displayName = 'GlobalNavigationSecondaryContainer';
export default GlobalNavigationSecondaryContainer;