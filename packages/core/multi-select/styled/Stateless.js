import styled, { css } from 'styled-components';
import { colors, gridSize, fontSize } from '@atlaskit/theme';
var lineHeightDefault = gridSize() * 2 / fontSize();

var getPlaceholderStyle = function getPlaceholderStyle(style) {
  return css(["\n  &::-webkit-input-placeholder {\n    /* WebKit, Blink, Edge */\n    ", ";\n  }\n  &::-moz-placeholder {\n    /* Mozilla Firefox 19+ */\n    ", " opacity: 1;\n  }\n  &::-ms-input-placeholder {\n    /* Microsoft Edge */\n    ", ";\n  }\n  &:-moz-placeholder {\n    /* Mozilla Firefox 4 to 18 */\n    ", " opacity: 1;\n  }\n  &:-ms-input-placeholder {\n    /* Internet Explorer 10-11 */\n    ", ";\n  }\n"], style, style, style, style, style);
};

var getPlaceholderColor = css(["\n  color: ", ";\n"], colors.placeholderText);
var Input = styled.input.withConfig({
  displayName: "Stateless__Input",
  componentId: "wsqt66-0"
})(["\n  display: inline-block;\n  flex: 1 0 10px;\n  margin: 0;\n  padding: 0;\n  outline: 0;\n  border: 0;\n  background: none;\n  align-self: center;\n  font-size: ", "px;\n  line-height: ", ";\n\n  ", ";\n"], fontSize, lineHeightDefault, getPlaceholderStyle(getPlaceholderColor));
var SelectWrapper = styled.div.withConfig({
  displayName: "Stateless__SelectWrapper",
  componentId: "wsqt66-1"
})(["\n  display: inline-block;\n\n  ", ";\n"], function (_ref) {
  var shouldFitContainer = _ref.shouldFitContainer;
  return shouldFitContainer ? css(["\n          display: block;\n        "]) : css(["\n          display: inline-block;\n        "]);
});
export { Input, SelectWrapper };