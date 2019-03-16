import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    display: none;\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import styled from 'styled-components';
import NavigationItemAfter from '../styled/NavigationItemAfter';
import { whenCollapsed } from '../../theme/util';
var NavigationDropItemAfter = styled(NavigationItemAfter).withConfig({
  displayName: "NavigationDropItemAfter",
  componentId: "eg2rd-0"
})(["\n  ", ";\n"], whenCollapsed(_templateObject()));
NavigationDropItemAfter.displayName = 'NavigationDropItemAfter';
export default NavigationDropItemAfter;