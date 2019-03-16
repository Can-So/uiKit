import styled from 'styled-components';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { gridSize, math, layers } from '@atlaskit/theme';
export default styled.div.withConfig({
  displayName: "styledFlagGroup",
  componentId: "sc-1dirlpz-0"
})(["\n  bottom: ", "px;\n  left: ", "px;\n  position: fixed;\n  z-index: ", ";\n"], math.multiply(gridSize, 6), math.multiply(gridSize, 10), layers.flag);
export var SROnly = styled.h1.withConfig({
  displayName: "styledFlagGroup__SROnly",
  componentId: "sc-1dirlpz-1"
})(["\n  border: 0;\n  clip: rect(1px, 1px, 1px, 1px);\n  height: 1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  white-space: nowrap;\n  width: 1px;\n"]);
export var Inner = styled(TransitionGroup).withConfig({
  displayName: "styledFlagGroup__Inner",
  componentId: "sc-1dirlpz-2"
})(["\n  position: relative;\n"]);