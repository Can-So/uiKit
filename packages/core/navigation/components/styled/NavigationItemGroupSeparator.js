import styled from 'styled-components';
import { gridSize } from '../../shared-variables';
import { getProvided } from '../../theme/util';
var dividerLineHeight = 2;
var dividerTotalHeight = gridSize * 5;
var NavigationItemGroupSeparator = styled.div.withConfig({
  displayName: "NavigationItemGroupSeparator",
  componentId: "ne4oy6-0"
})(["\n  margin-top: ", "px;\n  margin-bottom: ", "px;\n  margin-left: -", "px;\n  height: ", "px;\n  background: ", ";\n  border-radius: 1px;\n"], (dividerTotalHeight - dividerLineHeight) / 2, (dividerTotalHeight - dividerLineHeight) / 2, gridSize, dividerLineHeight, function (_ref) {
  var theme = _ref.theme;
  return getProvided(theme).keyline;
});
NavigationItemGroupSeparator.displayName = 'NavigationItemGroupSeparator';
export default NavigationItemGroupSeparator;