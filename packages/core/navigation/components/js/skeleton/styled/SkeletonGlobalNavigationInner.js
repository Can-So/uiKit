import styled from 'styled-components';
import { containerClosedWidth } from '../../../../shared-variables';
import { getProvided } from '../../../../theme/util';
var SkeletonGlobalNavigationInner = styled.div.withConfig({
  displayName: "SkeletonGlobalNavigationInner",
  componentId: "sc-13fziax-0"
})(["\n  height: 100%;\n  width: ", "px;\n  color: ", ";\n  background-color: ", ";\n"], containerClosedWidth(), function (_ref) {
  var theme = _ref.theme;
  return getProvided(theme).text;
}, function (_ref2) {
  var theme = _ref2.theme;
  return getProvided(theme).background.primary;
});
SkeletonGlobalNavigationInner.displayName = 'SkeletonGlobalNavigationInner';
export default SkeletonGlobalNavigationInner;