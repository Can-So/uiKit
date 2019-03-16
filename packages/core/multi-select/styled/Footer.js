import styled from 'styled-components';
import { colors, gridSize } from '@atlaskit/theme';
var FooterDiv = styled.div.withConfig({
  displayName: "Footer__FooterDiv",
  componentId: "sc-1xuos4y-0"
})(["\n  padding: ", "px 0 ", "px 0;\n  border-top: ", ";\n"], gridSize(), gridSize() / 2, function (_ref) {
  var shouldHideSeparator = _ref.shouldHideSeparator;
  return shouldHideSeparator ? '0' : "2px solid ".concat(colors.N40A);
});
export default FooterDiv;