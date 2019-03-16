import styled from 'styled-components';
import { standardOpenWidth, containerClosedWidth } from '../../../../shared-variables';
var SkeletonNavigationOuter = styled.div.withConfig({
  displayName: "SkeletonNavigationOuter",
  componentId: "yx1q7o-0"
})(["\n  width: ", "px;\n  height: 100vh;\n"], function (_ref) {
  var isCollapsed = _ref.isCollapsed;
  return isCollapsed ? containerClosedWidth() : standardOpenWidth;
});
SkeletonNavigationOuter.displayName = 'SkeletonNavigationOuter';
export default SkeletonNavigationOuter;