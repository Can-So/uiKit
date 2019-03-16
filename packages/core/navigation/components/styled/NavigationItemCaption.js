import styled from 'styled-components';
import { getProvided } from '../../theme/util';
import { layout } from '../../shared-variables';
var NavigationItemCaption = styled.span.withConfig({
  displayName: "NavigationItemCaption",
  componentId: "pti3us-0"
})(["\n  color: ", ";\n  margin-left: ", "px;\n"], function (_ref) {
  var theme = _ref.theme;
  return getProvided(theme).subText;
}, layout.padding.side);
NavigationItemCaption.displayName = 'NavigationItemCaption';
export default NavigationItemCaption;