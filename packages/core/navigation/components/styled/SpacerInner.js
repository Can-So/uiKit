import styled from 'styled-components';
import { resizeAnimationTime } from '../../shared-variables';
var SpacerInner = styled.div.withConfig({
  displayName: "SpacerInner",
  componentId: "sc-1x4fjuo-0"
})(["\n  transition: ", ";\n"], function (_ref) {
  var shouldAnimate = _ref.shouldAnimate;
  return shouldAnimate ? "width ".concat(resizeAnimationTime) : 'none';
});
SpacerInner.displayName = 'SpacerInner';
export default SpacerInner;