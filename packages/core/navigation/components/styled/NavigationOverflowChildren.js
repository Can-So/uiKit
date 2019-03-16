import styled from 'styled-components'; // We need to wrap the NavigationItems in a parent that is constrained to the same width
// as the grandparent, so that text truncation continues to get triggered inside the
// child NavigationItems. We could do this with CSS flex, but since flex styles are not
// used by the children, using CSS width here is simpler.

var NavigationOverflowChildren = styled.div.withConfig({
  displayName: "NavigationOverflowChildren",
  componentId: "sc-17r7om7-0"
})(["\n  width: 100%;\n"]);
NavigationOverflowChildren.displayName = 'NavigationOverflowChildren';
export default NavigationOverflowChildren;