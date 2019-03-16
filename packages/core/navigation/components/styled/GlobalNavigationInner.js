import styled from 'styled-components';
import { globalOpenWidth, layout } from '../../shared-variables';
import { getProvided, isElectronMac, electronMacTopPadding } from '../../theme/util';

var getTopPadding = function getTopPadding(props) {
  return layout.padding.top + (isElectronMac(props.theme) ? electronMacTopPadding : 0);
};

var GlobalNavigationInner = styled.div.withConfig({
  displayName: "GlobalNavigationInner",
  componentId: "lcs82l-0"
})(["\n  align-items: center;\n  color: ", ";\n  background-color: ", ";\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  padding: ", "px 0 ", "px;\n  /* always keeping a fixed width so that the ContainerNavigation bleeds over the top of this */\n  width: ", "px;\n"], function (_ref) {
  var theme = _ref.theme;
  return getProvided(theme).text;
}, function (_ref2) {
  var theme = _ref2.theme;
  return getProvided(theme).background.primary;
}, getTopPadding, layout.padding.bottom, function (props) {
  return globalOpenWidth(isElectronMac(props.theme));
});
GlobalNavigationInner.displayName = 'GlobalNavigationInner';
export default GlobalNavigationInner;