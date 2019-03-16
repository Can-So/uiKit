import styled from 'styled-components';
import { animationTimeUnitless, unthemedColors, resizerClickableWidth, resizerVisibleWidth } from '../../shared-variables';
var ResizerInner = styled.div.withConfig({
  displayName: "ResizerInner",
  componentId: "sc-1hg4s68-0"
})(["\n  cursor: ew-resize;\n  height: 100%;\n\n  /* position: absolute so that it will not effect the width of the navigation */\n  position: absolute;\n\n  right: -", "px;\n  width: ", "px;\n\n  &::before {\n    content: '';\n    height: 100%;\n    left: -", "px;\n    position: absolute;\n    transition: background-color ", "ms ease-in-out\n      ", "ms;\n    width: ", "px;\n  }\n  &:hover::before {\n    background: ", ";\n  }\n"], resizerClickableWidth, resizerClickableWidth, resizerVisibleWidth / 2, animationTimeUnitless + 100, animationTimeUnitless, resizerVisibleWidth, unthemedColors.resizer);
ResizerInner.displayName = 'ResizerInner';
export default ResizerInner;