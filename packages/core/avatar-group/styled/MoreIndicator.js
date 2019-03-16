import styled from 'styled-components';
import { colors, themed, withTheme } from '@atlaskit/theme';
import { getBorderRadius, getInnerStyles, BORDER_WIDTH } from '@atlaskit/avatar';
var EXCESS_INDICATOR_FONT_SIZE = {
  small: 10,
  medium: 11,
  large: 12,
  xlarge: 16
};

var getBorderWidth = function getBorderWidth(p) {
  return p.isFocus && !p.isActive ? "".concat(BORDER_WIDTH[p.size], "px") : 0;
};

export var Outer = withTheme(styled.button.withConfig({
  displayName: "MoreIndicator__Outer",
  componentId: "sc-1l94pmy-0"
})(["\n  ", " background: 0;\n"], getInnerStyles));
export var Inner = withTheme(styled.span.withConfig({
  displayName: "MoreIndicator__Inner",
  componentId: "sc-1l94pmy-1"
})(["\n  background-color: ", ";\n  border-radius: ", ";\n  align-items: center;\n  box-shadow: 0 0 0 ", " ", ";\n  color: ", ";\n  cursor: pointer;\n  display: flex;\n  flex-basis: 100%;\n  flex-grow: 1;\n  font-size: ", "px;\n  justify-content: center;\n  transition: box-shadow 200ms;\n"], themed({
  light: colors.N40,
  dark: colors.DN70
}), getBorderRadius, getBorderWidth, colors.B200, themed({
  light: colors.N500,
  dark: colors.DN400
}), function (props) {
  return EXCESS_INDICATOR_FONT_SIZE[props.size];
}));