import styled from 'styled-components';
import { colors, themed } from '@findable/theme';
import { drawerBackIconSize } from '../../utils/drawer-style-variables';
var DrawerPrimaryIcon = styled.div.withConfig({
  displayName: "DrawerPrimaryIcon",
  componentId: "sc-1ds7gho-0"
})(["\n  align-items: center;\n  display: flex;\n  height: ", "px;\n  justify-content: center;\n  width: ", "px;\n  color: ", ";\n"], drawerBackIconSize, drawerBackIconSize, themed({
  light: colors.N500,
  dark: colors.DN500
}));
DrawerPrimaryIcon.displayName = 'DrawerPrimaryIcon';
export default DrawerPrimaryIcon;