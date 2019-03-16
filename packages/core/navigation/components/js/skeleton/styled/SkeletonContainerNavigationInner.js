import styled from 'styled-components';
import { containerOpenWidth, containerClosedWidth } from '../../../../shared-variables';
import { getProvided } from '../../../../theme/util';
var SkeletonContainerNavigationInner = styled.div.withConfig({
  displayName: "SkeletonContainerNavigationInner",
  componentId: "sc-1qt5vek-0"
})(["\n  height: 100%;\n  width: ", "px;\n  color: ", ";\n  background-color: ", ";\n"], function (_ref) {
  var isCollapsed = _ref.isCollapsed;
  return isCollapsed ? containerClosedWidth() : containerOpenWidth;
}, function (_ref2) {
  var theme = _ref2.theme;
  return getProvided(theme).text;
}, function (_ref3) {
  var theme = _ref3.theme;
  var background = getProvided(theme).background;
  return background.secondary || background.primary;
});
SkeletonContainerNavigationInner.displayName = 'SkeletonContainerNavigationInner';
export default SkeletonContainerNavigationInner;