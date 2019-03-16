import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    opacity: 0;\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import styled from 'styled-components';
import { whenCollapsed } from '../../theme/util';
var NavigationItemTextAfter = styled.div.withConfig({
  displayName: "NavigationItemTextAfter",
  componentId: "huo6tb-0"
})(["\n  position: relative;\n  z-index: 1;\n\n  ", ";\n"], whenCollapsed(_templateObject()));
NavigationItemTextAfter.displayName = 'NavigationItemTextAfter';
export default NavigationItemTextAfter;