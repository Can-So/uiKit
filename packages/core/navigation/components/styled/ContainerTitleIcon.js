import styled from 'styled-components';
import { gridSize } from '../../shared-variables';
var size = gridSize * 5;
var borderRadius = 4;
var ContainerTitleIcon = styled.div.withConfig({
  displayName: "ContainerTitleIcon",
  componentId: "sc-1d3yje9-0"
})(["\n  align-items: center;\n  display: flex;\n  height: ", "px;\n  justify-content: center;\n  width: ", "px;\n\n  /* We need to ensure that any image passed in as a child (<img/>, <svg/>\n  etc.) receives the correct width, height and border radius. We don't\n  currently assume that the image passed in is the correct dimensions, or has\n  width / height 100% */\n  & > img {\n    border-radius: ", "px;\n    height: ", "px;\n    width: ", "px;\n  }\n"], size, size, borderRadius, size, size);
ContainerTitleIcon.displayName = 'ContainerTitleIcon';
export default ContainerTitleIcon;