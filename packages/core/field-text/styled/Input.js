import styled, { css } from 'styled-components';
import { codeFontFamily, colors, fontSize, themed } from '@atlaskit/theme';

var getPlaceholderColor = function getPlaceholderColor(_ref) {
  var disabled = _ref.disabled;

  if (disabled) {
    return themed({
      light: colors.N70,
      dark: colors.DN90
    });
  }

  return themed({
    light: colors.N100,
    dark: colors.DN90
  });
}; // can't group these placeholder styles into one block because browsers drop
// entire style blocks when any single selector fails to parse


var getPlaceholderStyle = function getPlaceholderStyle() {
  return css(["\n  &::-webkit-input-placeholder {\n    /* WebKit, Blink, Edge */\n    color: ", ";\n  }\n  &::-moz-placeholder {\n    /* Mozilla Firefox 19+ */\n    color: ", ";\n    opacity: 1;\n  }\n  &::-ms-input-placeholder {\n    /* Microsoft Edge */\n    color: ", ";\n  }\n  &:-ms-input-placeholder {\n    /* Internet Explorer 10-11 */\n    color: ", ";\n  }\n"], getPlaceholderColor, getPlaceholderColor, getPlaceholderColor, getPlaceholderColor);
}; // Safari puts on some difficult to remove styles, mainly for disabled inputs
// but we want full control so need to override them in all cases


var overrideSafariDisabledStyles = "\n  -webkit-text-fill-color: unset;\n  -webkit-opacity: 1;\n";
var InputElement = styled.input.withConfig({
  displayName: "Input__InputElement",
  componentId: "sc-1o6bj35-0"
})(["\n  background: transparent;\n  border: 0;\n  box-sizing: border-box;\n  color: inherit;\n  cursor: inherit;\n  font-family: ", ";\n  font-size: ", "px;\n  min-width: 0;\n  outline: none;\n  width: 100%;\n\n  [disabled] {\n    ", ";\n  }\n\n  &::-ms-clear {\n    display: none;\n  }\n\n  &:invalid {\n    box-shadow: none;\n  }\n  ", ";\n"], function (p) {
  return p.isMonospaced ? codeFontFamily() : 'inherit';
}, fontSize, overrideSafariDisabledStyles, getPlaceholderStyle);
export default InputElement;