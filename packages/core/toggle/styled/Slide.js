import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import styled, { css } from 'styled-components';
import { colors, themed } from '@atlaskit/theme';
import { borderWidth, getHeight, getWidth, transition } from './constants';
var colorOptions = {
  bgChecked: themed({
    light: colors.G400,
    dark: colors.G300
  }),
  bgCheckedHover: themed({
    light: colors.G300,
    dark: colors.G200
  }),
  // hover go lighter
  bgCheckedDisabled: themed({
    light: colors.N20,
    dark: colors.DN70
  }),
  bgUnchecked: themed({
    light: colors.N200,
    dark: colors.DN70
  }),
  bgUncheckedHover: themed({
    light: colors.N70,
    dark: colors.DN60
  }),
  bgUncheckedDisabled: themed({
    light: colors.N20,
    dark: colors.DN70
  })
};

var getBgColor = function getBgColor(_ref) {
  var isChecked = _ref.isChecked,
      isDisabled = _ref.isDisabled,
      rest = _objectWithoutProperties(_ref, ["isChecked", "isDisabled"]);

  var color = colorOptions.bgUnchecked;
  if (isChecked) color = colorOptions.bgChecked;
  if (isDisabled && !isChecked) color = colorOptions.bgUncheckedDisabled;
  if (isDisabled && isChecked) color = colorOptions.bgCheckedDisabled;
  return color(rest);
};

var getHoverStyles = function getHoverStyles(_ref2) {
  var isChecked = _ref2.isChecked,
      isDisabled = _ref2.isDisabled,
      rest = _objectWithoutProperties(_ref2, ["isChecked", "isDisabled"]);

  var bgcolor;

  if (!isDisabled) {
    bgcolor = isChecked ? colorOptions.bgCheckedHover : colorOptions.bgUncheckedHover;
  }

  return css(["\n    &:hover {\n      ", ";\n      cursor: ", ";\n    }\n  "], bgcolor ? css(["\n            background-color: ", ";\n          "], bgcolor(rest)) : '', isDisabled ? 'not-allowed' : 'pointer');
};

var getBorderColor = function getBorderColor(_ref3) {
  var isFocused = _ref3.isFocused,
      rest = _objectWithoutProperties(_ref3, ["isFocused"]);

  return isFocused ? themed({
    light: colors.B100,
    dark: colors.B75
  })(rest) : 'transparent';
};

export default styled.div.withConfig({
  displayName: "Slide",
  componentId: "bnah1s-0"
})(["\n  background-clip: content-box;\n  background-color: ", ";\n  border-radius: ", "px;\n  border: ", " solid ", ";\n  display: block;\n  height: ", "px;\n  padding: ", ";\n  position: relative;\n  transition: ", ";\n  width: ", "px;\n\n  ", ";\n"], getBgColor, getHeight, borderWidth, getBorderColor, getHeight, borderWidth, transition, getWidth, getHoverStyles);