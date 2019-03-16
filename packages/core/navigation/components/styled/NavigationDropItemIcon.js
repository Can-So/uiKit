import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    display: none;\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import styled from 'styled-components';
import NavigationItemIcon from '../styled/NavigationItemIcon';
import { whenCollapsed } from '../../theme/util';
var NavigationDropItemIcon = styled(NavigationItemIcon).withConfig({
  displayName: "NavigationDropItemIcon",
  componentId: "sc-12a6lf3-0"
})(["\n  padding-right: 0;\n\n  ", ";\n"], whenCollapsed(_templateObject()));
NavigationDropItemIcon.displayName = 'NavigationDropItemIcon';
export default NavigationDropItemIcon;