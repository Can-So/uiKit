import styled, { css } from 'styled-components';
import { codeFontFamily, colors, fontSize } from '@atlaskit/theme';

var getPlaceholderStyle = function getPlaceholderStyle(style) {
  return css(["\n  &::-webkit-input-placeholder {\n    /* WebKit, Blink, Edge */\n    ", ";\n  }\n  &::-moz-placeholder {\n    /* Mozilla Firefox 19+ */\n    ", " opacity: 1;\n  }\n  &::-ms-input-placeholder {\n    /* Microsoft Edge */\n    ", ";\n  }\n  &:-moz-placeholder {\n    /* Mozilla Firefox 4 to 18 */\n    ", " opacity: 1;\n  }\n  &:-ms-input-placeholder {\n    /* Internet Explorer 10-11 */\n    ", ";\n  }\n"], style, style, style, style, style);
};

var getPlaceholderColor = css(["\n  color: ", ";\n"], colors.placeholderText); // Safari puts on some difficult to remove styles, mainly for disabled inputs
// but we want full control so need to override them in all cases

var overrideSafariDisabledStyles = "\n  -webkit-text-fill-color: unset;\n  -webkit-opacity: 1;\n";

var getMinimumRowsHeight = function getMinimumRowsHeight(_ref) {
  var minimumRows = _ref.minimumRows;
  return "min-height: ".concat(20 * minimumRows, "px;");
};

var getResizeStyles = function getResizeStyles(_ref2) {
  var enableResize = _ref2.enableResize;

  if (!enableResize) {
    return "resize: none;";
  }

  if (enableResize === 'horizontal') {
    return "resize: horizontal;";
  }

  if (enableResize === 'vertical') {
    return "resize: vertical;";
  }

  return null;
};

var TextArea = styled.textarea.withConfig({
  displayName: "TextArea",
  componentId: "l4fqfr-0"
})(["\n  background: transparent;\n  padding: 0;\n  margin: 0;\n  border: 0;\n  box-sizing: border-box;\n  color: inherit;\n  cursor: inherit;\n  font-family: ", ";\n  font-size: ", "px;\n  line-height: ", ";\n  min-width: 0;\n  outline: none;\n  width: 100%;\n\n  [disabled] {\n    ", ";\n  }\n\n  ", " ", "\n\n  &::-ms-clear {\n    display: none;\n  }\n\n  &:invalid {\n    box-shadow: none;\n  }\n\n  ", ";\n"], function (p) {
  return p.isMonospaced ? codeFontFamily() : 'inherit';
}, fontSize, 20 / fontSize(), overrideSafariDisabledStyles, getMinimumRowsHeight, getResizeStyles, getPlaceholderStyle(getPlaceholderColor));
export default TextArea;