import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    flex-shrink: 1;\n    margin: 0;\n    opacity: 0;\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import styled from 'styled-components';
import { whenCollapsed } from '../../theme/util';
import { gridSize } from '../../shared-variables';
var NavigationItemAction = styled.div.withConfig({
  displayName: "NavigationItemAction",
  componentId: "hri3df-0"
})(["\n  align-items: center;\n  display: flex;\n  flex-shrink: 0;\n  justify-content: center;\n  margin-left: ", "px;\n\n  ", ";\n"], gridSize / 2, whenCollapsed(_templateObject()));
NavigationItemAction.displayName = 'NavigationItemAction';
export default NavigationItemAction;