import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme';
var SkeletonContainerItemWrapper = styled.div.withConfig({
  displayName: "SkeletonContainerItemWrapper",
  componentId: "nffzbz-0"
})(["\n  box-sizing: border-box; /* to make width: 100%; work properly when padding or border is specified - so that item width is not bigger than container width */\n  display: flex;\n  align-items: center;\n  width: 100%;\n  padding-left: ", "px;\n  margin-top: ", "px;\n  margin-bottom: ", "px;\n"], gridSize() * 2, gridSize(), gridSize());
SkeletonContainerItemWrapper.displayName = 'SkeletonContainerItemWrapper';
export default SkeletonContainerItemWrapper;