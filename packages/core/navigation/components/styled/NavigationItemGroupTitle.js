import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    display: none;\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import styled from 'styled-components';
import { whenCollapsedAndNotInOverflowDropdown } from '../../theme/util';
import { truncate } from '../../utils/mixins';
import { gridSize } from '../../shared-variables';
var groupTitleFontSize = 11;
var NavigationItemGroupTitle = styled.div.withConfig({
  displayName: "NavigationItemGroupTitle",
  componentId: "etcd05-0"
})(["\n  font-size: ", "px;\n  line-height: ", ";\n  font-weight: 600;\n  ", " ", ";\n"], groupTitleFontSize, gridSize * 2 / groupTitleFontSize, truncate(), whenCollapsedAndNotInOverflowDropdown(_templateObject()));
NavigationItemGroupTitle.displayName = 'NavigationItemGroupTitle';
export default NavigationItemGroupTitle;