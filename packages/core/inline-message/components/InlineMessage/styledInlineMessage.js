import styled, { css } from 'styled-components';
import { colors, themed } from '@atlaskit/theme';
import { itemSpacing } from '../../constants';
var getFocusColor = themed('appearance', {
  connectivity: {
    light: colors.B500,
    dark: colors.B200
  },
  confirmation: {
    light: colors.G400,
    dark: colors.G400
  },
  info: {
    light: colors.P500,
    dark: colors.P300
  },
  warning: {
    light: colors.Y500,
    dark: colors.Y500
  },
  error: {
    light: colors.R500,
    dark: colors.R500
  }
});
export var Root = styled.div.withConfig({
  displayName: "styledInlineMessage__Root",
  componentId: "sc-1o0swkp-0"
})(["\n  display: inline-block;\n  max-width: 100%;\n  &:focus {\n    outline: 1px solid ", ";\n  }\n"], getFocusColor);
export var ButtonContents = styled.div.withConfig({
  displayName: "styledInlineMessage__ButtonContents",
  componentId: "sc-1o0swkp-1"
})(["\n  align-items: center;\n  display: flex;\n  text-decoration: none;\n  ", ";\n"], function (_ref) {
  var isHovered = _ref.isHovered;
  return isHovered && css(["\n      color: ", ";\n      text-decoration: underline;\n    "], colors.N600);
});
var getTitleColor = themed({
  light: colors.N600,
  dark: colors.DN600
});
var getTextColor = themed({
  light: colors.N300,
  dark: colors.DN100
});
export var Title = styled.span.withConfig({
  displayName: "styledInlineMessage__Title",
  componentId: "sc-1o0swkp-2"
})(["\n  color: ", ";\n  font-weight: 500;\n  padding: 0 ", "px;\n"], getTitleColor, itemSpacing);
export var Text = styled.span.withConfig({
  displayName: "styledInlineMessage__Text",
  componentId: "sc-1o0swkp-3"
})(["\n  color: ", ";\n  padding: 0 ", "px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"], getTextColor, itemSpacing);