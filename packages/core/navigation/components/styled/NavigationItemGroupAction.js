import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    margin-top: ", "px;\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    display: none;\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import styled from 'styled-components';
import { gridSize } from '../../shared-variables';
import { whenCollapsed, whenNotInOverflowDropdown } from '../../theme/util';
var NavigationItemGroupAction = styled.div.withConfig({
  displayName: "NavigationItemGroupAction",
  componentId: "sc-1jftvzk-0"
})(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  margin-left: ", "px;\n  min-width: ", "px;\n\n  ", " ", ";\n"], gridSize / 2, gridSize * 3, whenCollapsed(_templateObject()), whenNotInOverflowDropdown(_templateObject2(), gridSize));
NavigationItemGroupAction.displayName = 'NavigationItemGroupAction';
export default NavigationItemGroupAction;