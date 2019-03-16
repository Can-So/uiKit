/* eslint-disable no-confusing-arrow */
import styled, { css } from 'styled-components';
import { gridSize, math } from '@atlaskit/theme';
import Button from '@atlaskit/button';
import { flagTextColor, flagFocusRingColor } from '../../theme'; // Outputs the styles for actions separator: mid-dot for non-bold flags, or space for bold flags.

var getDivider = function getDivider(_ref) {
  var hasDivider = _ref.hasDivider,
      useMidDot = _ref.useMidDot;
  return css(["\n  display: ", ";\n  content: \"", "\";\n  width: ", "px;\n"], hasDivider ? 'inline-block' : 'none', useMidDot ? "\xB7" : '', useMidDot ? math.multiply(gridSize, 2) : gridSize);
};

export default styled.div.withConfig({
  displayName: "styledFlagActions",
  componentId: "sc-11oivld-0"
})(["\n  display: flex;\n  flex-wrap: wrap;\n  padding-top: ", "px;\n"], gridSize);
export var Action = styled.div.withConfig({
  displayName: "styledFlagActions__Action",
  componentId: "sc-11oivld-1"
})(["\n  &::before {\n    color: ", ";\n    text-align: center;\n    vertical-align: middle;\n\n    ", ";\n  }\n"], flagTextColor, getDivider);
export var StyledButton = styled(Button).withConfig({
  displayName: "styledFlagActions__StyledButton",
  componentId: "sc-11oivld-2"
})(["\n  &,\n  a& {\n    font-weight: 500;\n    padding: 0 ", "px !important;\n    &:focus {\n      box-shadow: 0 0 0 2px ", ";\n    }\n  }\n"], function (p) {
  return p.appearance === 'link' ? 0 : gridSize();
}, flagFocusRingColor);