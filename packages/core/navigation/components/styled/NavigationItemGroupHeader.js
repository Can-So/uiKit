import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    margin-left: -", "px;\n    margin-right: -", "px;\n    margin-top: ", "px;\n    margin-bottom: ", "px;\n    border-top: 1px solid ", ";\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    margin-left: -", "px;\n    margin-top: ", "px;\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import styled from 'styled-components';
import { gridSize } from '../../shared-variables';
import { getProvided, whenCollapsedAndNotInOverflowDropdown, whenNotInOverflowDropdown } from '../../theme/util';
var NavigationItemGroupHeader = styled.div.withConfig({
  displayName: "NavigationItemGroupHeader",
  componentId: "sc-1n5ggwv-0"
})(["\n  display: flex;\n  ", " ", ";\n"], whenNotInOverflowDropdown(_templateObject(), gridSize, gridSize * 1.5), whenCollapsedAndNotInOverflowDropdown(_templateObject2(), gridSize, gridSize, gridSize, gridSize, function (_ref) {
  var theme = _ref.theme;
  return getProvided(theme).keyline;
}));
NavigationItemGroupHeader.displayName = 'NavigationItemGroupHeader';
export default NavigationItemGroupHeader;