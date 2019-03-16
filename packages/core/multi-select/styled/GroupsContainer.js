import styled from 'styled-components';
import { gridSize } from '@atlaskit/theme'; // we apply overflow and maxheight to the GroupWrapper if we are displaying a footer so that the
// footer is 'sticky' to the bottom (always visible)

var GroupsContainer = styled.div.withConfig({
  displayName: "GroupsContainer",
  componentId: "sc-1dbou9n-0"
})(["\n  overflow: ", ";\n  max-height: ", ";\n"], function (_ref) {
  var hasFooter = _ref.hasFooter;
  return hasFooter ? 'auto' : 'visible';
}, function (_ref2) {
  var hasFooter = _ref2.hasFooter;
  return hasFooter ? "".concat(gridSize() * 4 * 9.5, "px") : 'none';
});
export default GroupsContainer;