import styled from 'styled-components';
import { gridSize, math } from '@findable/theme';
var SkeletonGlobalIconOuter = styled.div.withConfig({
  displayName: "SkeletonGlobalIconOuter",
  componentId: "sc-1kpch5t-0"
})(["\n  margin-bottom: ", "px;\n\n  &:last-child {\n    margin-bottom: 0;\n  }\n"], math.divide(gridSize, 2));
SkeletonGlobalIconOuter.displayName = 'SkeletonGlobalIconOuter';
export default SkeletonGlobalIconOuter;