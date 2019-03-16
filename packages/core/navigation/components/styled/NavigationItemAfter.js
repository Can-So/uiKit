import styled from 'styled-components';
import { isCollapsed } from '../../theme/util';

var getDisplay = function getDisplay(_ref) {
  var theme = _ref.theme,
      isDropdownTrigger = _ref.isDropdownTrigger;

  if (isDropdownTrigger && isCollapsed(theme)) {
    return 'none';
  }

  return 'block';
};

var NavigationItemAfter = styled.div.withConfig({
  displayName: "NavigationItemAfter",
  componentId: "sc-1fp8eq4-0"
})(["\n  display: ", ";\n  min-width: ", ";\n"], getDisplay, function (_ref2) {
  var shouldTakeSpace = _ref2.shouldTakeSpace;
  return shouldTakeSpace ? '24px' : 0;
});
NavigationItemAfter.displayName = 'NavigationItemAfter';
export default NavigationItemAfter;