import styled from 'styled-components';
import { colors, borderRadius, themed } from '@atlaskit/theme';
import { buttonWidthUnitless, focusRingColor } from '../constants';
var focusColor = themed({
  light: colors.R300,
  dark: colors.R200
}); // NOTE:
// "-moz-focus-inner" removes some inbuilt padding that Firefox adds (taken from reduced-ui-pack)
// the focus ring is red unless combined with hover, then uses default blue

export var Button = styled.button.withConfig({
  displayName: "styled__Button",
  componentId: "sc-1cs6xoa-0"
})(["\n  align-items: center;\n  appearance: none;\n  background: none;\n  border: none;\n  border-radius: ", ";\n  color: ", ";\n  display: flex;\n  justify-content: center;\n  margin: 0;\n  padding: 0;\n\n  &::-moz-focus-inner {\n    border: 0;\n    margin: 0;\n    padding: 0;\n  }\n\n  &:focus {\n    box-shadow: 0 0 0 2px ", ";\n    outline: none;\n  }\n\n  &:hover {\n    color: ", ";\n\n    &:focus {\n      box-shadow: 0 0 0 2px ", ";\n      outline: none;\n    }\n  }\n"], function (_ref) {
  var isRounded = _ref.isRounded;
  return isRounded ? "".concat(buttonWidthUnitless / 2, "px") : "".concat(borderRadius(), "px");
}, colors.N500, focusColor, colors.R500, focusRingColor);