import styled from 'styled-components';
import { colors, withTheme } from '@atlaskit/theme';
import { BORDER_WIDTH } from './constants'; // set fallbacks for border color/width to protect consumers from invalid values

export var Outer = withTheme(styled.span.withConfig({
  displayName: "Icon__Outer",
  componentId: "sc-1i6jzcz-0"
})(["\n  align-content: center;\n  align-items: center;\n  background-color: ", ";\n  border-radius: 50%;\n  box-sizing: border-box;\n  display: flex;\n  height: 100%;\n  overflow: hidden;\n  padding: ", "px;\n  width: 100%;\n"], function (props) {
  return props.bgColor || colors.background;
}, function (_ref) {
  var size = _ref.size;
  return BORDER_WIDTH[size] || BORDER_WIDTH.medium;
}));
export var Inner = styled.span.withConfig({
  displayName: "Icon__Inner",
  componentId: "sc-1i6jzcz-1"
})(["\n  align-items: center;\n  border-radius: 50%;\n  display: flex;\n  height: 100%;\n  overflow: hidden;\n  width: 100%;\n"]);