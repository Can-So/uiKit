import { css } from 'styled-components';
export var truncate = function truncate() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '100%';
  return css(["\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  width: ", ";\n"], width);
};
export var focusOutline = function focusOutline(color) {
  return css(["\n  outline: none;\n  box-shadow: 0 0 0 2px ", ";\n"], color || '');
};