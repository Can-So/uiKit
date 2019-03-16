import styled from 'styled-components';
import { gridSize } from '../../shared-variables';
var DrawerBackIconInner = styled.div.withConfig({
  displayName: "DrawerBackIconInner",
  componentId: "sc-10wih1j-0"
})(["\n  align-items: center;\n  display: flex;\n  transform: ", ";\n  transition: transform 220ms;\n"], function (_ref) {
  var isVisible = _ref.isVisible;
  return isVisible ? 'translateX(0)' : "translateX(".concat(-gridSize * 2, "px)");
});
DrawerBackIconInner.displayName = 'DrawerBackIconInner';
export default DrawerBackIconInner;