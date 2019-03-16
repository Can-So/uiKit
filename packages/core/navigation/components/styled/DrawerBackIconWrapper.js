import styled from 'styled-components';
import { isElectronMac, electronMacTopPadding } from '../../theme/util';

var getTopOffset = function getTopOffset(_ref) {
  var iconOffset = _ref.iconOffset,
      theme = _ref.theme;
  return isElectronMac(theme) ? electronMacTopPadding + iconOffset : iconOffset;
};

var DrawerBackIconWrapper = styled.div.withConfig({
  displayName: "DrawerBackIconWrapper",
  componentId: "eyhbn7-0"
})(["\n  /** This needs to be display flex to fix an IE11 bug with position: absolute and a display: flex parent */\n  display: flex;\n  justify-content: center;\n  left: 0;\n  position: absolute;\n  width: 100%;\n  top: ", "px;\n"], getTopOffset);
DrawerBackIconWrapper.displayName = 'DrawerBackIconWrapper';
export default DrawerBackIconWrapper;