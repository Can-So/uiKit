import styled from 'styled-components';
import { drawerBackIconSize } from '../../utils/drawer-style-variables';
import { getProvided } from '../../theme/util';
var DrawerBackIconOuter = styled.div.withConfig({
  displayName: "DrawerBackIconOuter",
  componentId: "sc-129mai6-0"
})(["\n  background-color: ", ";\n  border-radius: 50%;\n  color: ", ";\n  cursor: pointer;\n  display: flex;\n  height: ", "px;\n  justify-content: center;\n  width: ", "px;\n\n  &:active {\n    background-color: ", ";\n  }\n"], function (_ref) {
  var theme = _ref.theme;
  return getProvided(theme).item.default.background;
}, function (_ref2) {
  var theme = _ref2.theme;
  return getProvided(theme).text;
}, drawerBackIconSize, drawerBackIconSize, function (_ref3) {
  var theme = _ref3.theme;
  return getProvided(theme).item.active.background;
});
DrawerBackIconOuter.displayName = 'DrawerBackIconOuter';
export default DrawerBackIconOuter;