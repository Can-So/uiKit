import styled from 'styled-components';
import { themed, colors } from '@atlaskit/theme';
import { getWidth, paddingUnitless } from './constants';
var iconPadding = "".concat(paddingUnitless / 2, "px");

var getPadding = function getPadding(_ref) {
  var isChecked = _ref.isChecked;
  return isChecked ? "\n    padding-left: ".concat(iconPadding, ";\n    padding-right: 0;\n  ") : "\n    padding-left: 0;\n    padding-right: ".concat(iconPadding, ";\n  ");
}; // the Icon sizes are 16/24/32/48 so we have to force-scale the icons down to 20px this way


var iconSizing = function iconSizing(_ref2) {
  var size = _ref2.size;
  return size === 'large' ? "> span { height: 20px; width: 20px; }" : '';
};

var getIconColor = function getIconColor(_ref3) {
  var isChecked = _ref3.isChecked;
  return isChecked ? themed({
    light: 'inherit',
    dark: colors.DN30
  }) : themed({
    light: 'inherit',
    dark: colors.DN600
  });
};

export default styled.div.withConfig({
  displayName: "IconWrapper",
  componentId: "sc-1y3jy9j-0"
})(["\n  display: flex;\n  max-width: ", "px;\n  align-items: center;\n  ", ";\n  color: ", ";\n  ", ";\n"], function (props) {
  return getWidth(props) / 2;
}, getPadding, getIconColor, iconSizing);