import styled, { css } from 'styled-components';
import { fontSize, gridSize, colors } from '@atlaskit/theme';
var gridSizeUnitless = gridSize();
var lineHeightDefault = gridSizeUnitless * 2 / fontSize();

var getPlaceholderStyle = function getPlaceholderStyle(style) {
  return css(["\n  &::-webkit-input-placeholder {\n    /* WebKit, Blink, Edge */\n    ", ";\n  }\n  &::-moz-placeholder {\n    /* Mozilla Firefox 19+ */\n    ", " opacity: 1;\n  }\n  &::-ms-input-placeholder {\n    /* Microsoft Edge */\n    ", ";\n  }\n  &:-moz-placeholder {\n    /* Mozilla Firefox 4 to 18 */\n    ", " opacity: 1;\n  }\n  &:-ms-input-placeholder {\n    /* Internet Explorer 10-11 */\n    ", ";\n  }\n"], style, style, style, style, style);
};

var getPlaceholderColor = css(["\n  color: ", ";\n"], colors.placeholderText);
var Content = styled.div.withConfig({
  displayName: "Trigger__Content",
  componentId: "p117u5-0"
})(["\n  flex: 1 1 auto;\n  margin: 3px ", "px; /* magic number to make multi-select the same height as field-text, to be fixed TODO: AK-1699 */\n  white-space: nowrap;\n  width: 100%;\n"], gridSizeUnitless);
var Expand = styled.div.withConfig({
  displayName: "Trigger__Expand",
  componentId: "p117u5-1"
})(["\n  align-items: center;\n  display: flex;\n  flex: 0 0 ", "px;\n  justify-content: center;\n  margin: 0 ", "px;\n"], gridSizeUnitless * 3, gridSizeUnitless);
var Input = styled.input.withConfig({
  displayName: "Trigger__Input",
  componentId: "p117u5-2"
})(["\n  display: inline-block;\n  flex: 1 0 10px;\n  margin: 0;\n  padding: 0;\n  outline: 0;\n  border: 0;\n  background: none;\n  align-self: center;\n  font-size: ", "px;\n  line-height: ", ";\n  color: ", ";\n\n  ", ";\n"], fontSize, lineHeightDefault, colors.text, getPlaceholderStyle(getPlaceholderColor));
var TriggerDiv = styled.div.withConfig({
  displayName: "Trigger__TriggerDiv",
  componentId: "p117u5-3"
})(["\n  align-items: center;\n  display: flex;\n  width: 100%;\n  min-height: 37px; /* magic number to make multi-select the same height as field-text, to be fixed TODO: AK-1699 */\n\n  ", ";\n"], function (_ref) {
  var isDisabled = _ref.isDisabled;
  return isDisabled ? css(["\n          cursor: not-allowed;\n        "]) : '';
});
export { Content, Expand, TriggerDiv, Input };