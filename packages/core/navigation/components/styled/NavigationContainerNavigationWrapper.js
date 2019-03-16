import styled from 'styled-components';
import { containerClosedWidth } from '../../shared-variables';
import { isElectronMac } from '../../theme/util';

var getTransform = function getTransform(_ref) {
  var horizontalOffset = _ref.horizontalOffset;

  if (!horizontalOffset || horizontalOffset === 0) {
    return '';
  }

  return "transform: translateX(".concat(horizontalOffset, "px);");
};

var NavigationContainerNavigationWrapper = styled.div.withConfig({
  displayName: "NavigationContainerNavigationWrapper",
  componentId: "sc-17groxj-0"
})(["\n  flex-grow: 1;\n  flex-shrink: 1;\n  /* allowing the container to collapse down to its min width */\n  min-width: ", "px;\n  ", " display: flex;\n"], function (props) {
  return containerClosedWidth(isElectronMac(props.theme));
}, getTransform);
NavigationContainerNavigationWrapper.displayName = 'NavigationContainerNavigationWrapper';
export default NavigationContainerNavigationWrapper;