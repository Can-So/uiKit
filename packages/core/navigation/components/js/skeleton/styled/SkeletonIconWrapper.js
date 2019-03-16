import styled from 'styled-components';
var SkeletonIconWrapper = styled.div.withConfig({
  displayName: "SkeletonIconWrapper",
  componentId: "sc-1ezy5ca-0"
})(["\n  display: flex; /* to fix \"baseline space below inline-block element problem\" https://stackoverflow.com/q/17905827/1343917 */\n  flex-shrink: 0; /* so that too big width of header text does not change width of avatar */\n"]);
SkeletonIconWrapper.displayName = 'SkeletonIconWrapper';
export default SkeletonIconWrapper;