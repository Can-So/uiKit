import styled from 'styled-components';
export default styled.div.withConfig({
  displayName: "styledExpander",
  componentId: "ps1py7-0"
})(["\n  max-height: ", "px;\n  opacity: ", ";\n  overflow: ", ";\n  transition: max-height 0.3s, opacity 0.3s;\n"], function (_ref) {
  var isExpanded = _ref.isExpanded;
  return isExpanded ? 150 : 0;
}, function (_ref2) {
  var isExpanded = _ref2.isExpanded;
  return isExpanded ? 1 : 0;
}, function (_ref3) {
  var isExpanded = _ref3.isExpanded;
  return isExpanded ? 'visible' : 'hidden';
});