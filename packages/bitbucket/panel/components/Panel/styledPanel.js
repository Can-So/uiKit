import { borderRadius, gridSize, colors } from '@atlaskit/theme';
import { withFocusWithin } from 'react-focus-within';
import styled, { css } from 'styled-components';
var transition = css(["\n  transition: all 200ms ease-in-out;\n"]);
export var PanelWrapper = styled.div.withConfig({
  displayName: "styledPanel__PanelWrapper",
  componentId: "prtjcr-0"
})(["\n  margin: 0 auto ", "px;\n"], gridSize() * 2);
export var ButtonWrapper = styled.div.withConfig({
  displayName: "styledPanel__ButtonWrapper",
  componentId: "prtjcr-1"
})(["\n  left: 0;\n  line-height: 0;\n  opacity: ", ";\n  position: absolute;\n  ", ";\n\n  /* IE 11 needs these vertical positioning rules - the flexbox\n  behavior for absolute-positioned children is not up to spec.\n  https://googlechrome.github.io/samples/css-flexbox-abspos/ */\n  top: 50%;\n  transform: translateY(-50%);\n\n  button {\n    pointer-events: none;\n  }\n"], function (_ref) {
  var isHidden = _ref.isHidden;
  return isHidden ? 0 : 1;
}, transition);
export var PanelHeader = withFocusWithin(styled.div.withConfig({
  displayName: "styledPanel__PanelHeader",
  componentId: "prtjcr-2"
})(["\n  align-items: center;\n  background-color: ", ";\n  border-radius: ", "px;\n  display: flex;\n  left: -", "px;\n  margin-bottom: ", "px;\n  margin-top: ", "px;\n  padding: 2px 0 2px ", "px;\n  position: relative;\n  ", ";\n  width: 100%;\n\n  ", " {\n    opacity: ", ";\n  }\n\n  &:hover {\n    background-color: ", ";\n    cursor: pointer;\n\n    ", " {\n      opacity: 1;\n    }\n  }\n"], function (props) {
  return props.isFocused && colors.N20;
}, borderRadius, gridSize() * 3, gridSize(), gridSize() * 2, gridSize() * 3, transition, ButtonWrapper, function (props) {
  return props.isFocused && 1;
}, colors.N20, ButtonWrapper));