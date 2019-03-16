import styled from 'styled-components';
import { gridSize, math } from '@findable/theme';
var SkeletonDefaultContainerHeaderInner = styled.div.withConfig({
  displayName: "SkeletonDefaultContainerHeaderInner",
  componentId: "v596gu-0"
})(["\n  display: flex;\n  align-items: center;\n  margin: ", "px\n    ", "px 0 ", "px;\n"], function (props) {
  return props.isAvatarHidden ? gridSize() * 2 : math.divide(gridSize, 2);
}, gridSize(), gridSize());
SkeletonDefaultContainerHeaderInner.displayName = 'SkeletonDefaultContainerHeaderInner';
export default SkeletonDefaultContainerHeaderInner;