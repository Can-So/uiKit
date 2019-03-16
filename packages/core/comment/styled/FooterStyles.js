import styled from 'styled-components';
import { colors, gridSize } from '@atlaskit/theme';
import { actionsPadding } from './constants';
var ThemeColor = {
  text: {
    default: colors.N500,
    error: colors.Y500
  }
};
export var ActionsItem = styled.div.withConfig({
  displayName: "FooterStyles__ActionsItem",
  componentId: "sc-7f01gi-0"
})(["\n  display: flex;\n\n  & + &::before {\n    color: ", ";\n    content: '\xB7';\n    display: inline-block;\n    text-align: center;\n    vertical-align: middle;\n    width: ", "px;\n  }\n"], ThemeColor.text.default, actionsPadding);
export var ErrorIcon = styled.span.withConfig({
  displayName: "FooterStyles__ErrorIcon",
  componentId: "sc-7f01gi-1"
})(["\n  color: ", ";\n  padding-right: ", "px;\n"], ThemeColor.text.error, gridSize());
export var ActionsContainer = styled.div.withConfig({
  displayName: "FooterStyles__ActionsContainer",
  componentId: "sc-7f01gi-2"
})(["\n  align-items: center;\n  display: flex;\n  flex-wrap: wrap;\n  margin-top: ", "px;\n"], gridSize() * 0.75);