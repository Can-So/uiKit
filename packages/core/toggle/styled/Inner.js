import styled from 'styled-components';
import { colors, themed } from '@atlaskit/theme';
import { transition } from './constants';
var color = themed({
  light: colors.N0,
  dark: colors.DN600
});
var disabledColor = themed({
  light: colors.N70,
  dark: colors.DN30
});

var getFlexDirection = function getFlexDirection(_ref) {
  var isChecked = _ref.isChecked;
  return isChecked ? 'row' : 'row-reverse';
};

export default styled.div.withConfig({
  displayName: "Inner",
  componentId: "sc-15bw73o-0"
})(["\n  color: ", ";\n  display: flex;\n  flex-direction: ", ";\n  height: 100%;\n  transition: ", ";\n  width: 100%;\n"], function (_ref2) {
  var isDisabled = _ref2.isDisabled;
  return isDisabled ? disabledColor : color;
}, getFlexDirection, transition);