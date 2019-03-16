import styled from 'styled-components';
import { layout } from '../../shared-variables';
import { isElectronMac, electronMacTopPadding } from '../../theme/util';

var getTopPadding = function getTopPadding(props) {
  return layout.padding.top + (isElectronMac(props.theme) ? electronMacTopPadding : 0);
};

var DrawerMain = styled.div.withConfig({
  displayName: "DrawerMain",
  componentId: "sc-1lj0ru9-0"
})(["\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  padding: ", "px 0 0;\n  overflow-y: auto;\n  width: 100%;\n"], getTopPadding);
DrawerMain.displayName = 'DrawerMain';
export default DrawerMain;