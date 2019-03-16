import styled from 'styled-components'; // Display toggle needed to prevent edit click trigger exceeding hover width.
// Max-width required to prevent text overflow when display is inline.

var FieldBaseWrapper = styled.div.withConfig({
  displayName: "FieldBaseWrapper",
  componentId: "sc-14kmybr-0"
})(["\n  display: ", ";\n  max-width: 100%;\n  flex-basis: auto;\n  flex-grow: 1;\n  flex-shrink: 1;\n"], function (_ref) {
  var displayFullWidth = _ref.displayFullWidth;
  return displayFullWidth ? 'block' : 'inline-block';
});
FieldBaseWrapper.displayName = 'FieldBaseWrapper';
export default FieldBaseWrapper;