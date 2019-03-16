import styled from 'styled-components';
import { gridSize, layout } from '../../shared-variables';
import { isElectronMac, electronMacTopPadding } from '../../theme/util';

var getWidth = function getWidth(_ref) {
  var theme = _ref.theme;
  return isElectronMac(theme) ? layout.width.closed.electron : layout.width.closed.default;
};

var baseTopPadding = layout.padding.top + gridSize;

var getTopPadding = function getTopPadding(props) {
  return baseTopPadding + (isElectronMac(props.theme) ? electronMacTopPadding : 0);
};

var DrawerSide = styled.div.withConfig({
  displayName: "DrawerSide",
  componentId: "y7lfkt-0"
})(["\n  align-items: center;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  flex: 1 0 auto;\n  padding: ", "px 0 ", "px 0;\n  position: relative;\n  width: ", "px;\n"], getTopPadding, baseTopPadding, getWidth);
DrawerSide.displayName = 'DrawerSide';
export default DrawerSide;