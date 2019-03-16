import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import styled from 'styled-components';
import { colors, themed } from '@atlaskit/theme';
import { getHeight, paddingUnitless, transition } from './constants';
var backgroundColor = themed({
  light: colors.N0,
  dark: colors.DN600
});
var backgroundColorChecked = themed({
  light: colors.N0,
  dark: colors.DN0
});
var backgroundColorDisabled = themed({
  light: colors.N0,
  dark: colors.DN0
});

var getTransform = function getTransform(_ref) {
  var isChecked = _ref.isChecked,
      size = _ref.size;
  return isChecked ? "translateX(".concat(getHeight({
    size: size
  }), "px)") : 'initial';
};

var getBackgroundColor = function getBackgroundColor(_ref2) {
  var isChecked = _ref2.isChecked,
      isDisabled = _ref2.isDisabled,
      rest = _objectWithoutProperties(_ref2, ["isChecked", "isDisabled"]);

  if (isDisabled) return backgroundColorDisabled(rest);
  if (isChecked) return backgroundColorChecked(rest);
  return backgroundColor(rest);
};

export default styled.span.withConfig({
  displayName: "Handle",
  componentId: "n2edb7-0"
})(["\n  background-color: ", ";\n  border-radius: 50%;\n  bottom: ", "px;\n  content: '';\n  height: ", "px;\n  left: ", "px;\n  position: absolute;\n  transform: ", ";\n  transition: ", ";\n  width: ", "px;\n"], getBackgroundColor, 2 * paddingUnitless, function (props) {
  return getHeight(props) - paddingUnitless * 2;
}, 2 * paddingUnitless, getTransform, transition, function (props) {
  return getHeight(props) - paddingUnitless * 2;
});