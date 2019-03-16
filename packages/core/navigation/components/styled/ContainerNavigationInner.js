import styled from 'styled-components';
import { layout } from '../../shared-variables';
import { getProvided, isElectronMac, electronMacTopPadding } from '../../theme/util';

var getTopPadding = function getTopPadding(props) {
  return layout.padding.top + (isElectronMac(props.theme) ? electronMacTopPadding : 0);
};

var ContainerNavigationInner = styled.div.withConfig({
  displayName: "ContainerNavigationInner",
  componentId: "sc-1cibwmi-0"
})(["\n  background-color: ", ";\n  color: ", ";\n  display: flex;\n  flex-direction: column;\n  padding-top: ", "px;\n  /* fill the entire space of the flex container */\n  width: 100%;\n"], function (_ref) {
  var theme = _ref.theme;
  var background = getProvided(theme).background;

  if (background.secondary) {
    return background.secondary;
  }

  return background.primary;
}, function (_ref2) {
  var theme = _ref2.theme;
  return getProvided(theme).text;
}, getTopPadding);
ContainerNavigationInner.displayName = 'ContainerNavigationInner';
export default ContainerNavigationInner;