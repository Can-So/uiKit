import styled, { css } from 'styled-components';
import { colors } from '@atlaskit/theme'; // Future-proofing: Styled Component 2.x no longer tolerate unitless values for CSS length.
// See:
// https://github.com/styled-components/css-to-react-native/issues/20
// https://github.com/styled-components/polished/issues/234

function defaultToPx(length) {
  var number = +length;

  if (number === 0) {
    return 0;
  }

  if (Number.isNaN(number)) {
    return length;
  }

  return "".concat(number, "px");
}

export var iconColor = colors.N800;
export var TreeRowContainer = styled.div.withConfig({
  displayName: "styled__TreeRowContainer",
  componentId: "sc-56yt3z-0"
})(["\n  border-bottom: 1px solid ", ";\n  display: flex;\n"], colors.N30);
export var HeadersContainer = styled.div.withConfig({
  displayName: "styled__HeadersContainer",
  componentId: "sc-56yt3z-1"
})(["\n  border-bottom: solid 2px #dfe1e6;\n  display: flex;\n"]);
var indentWidth = 25;
var commonChevronContainer = css(["\n  display: flex;\n  align-items: center;\n  position: absolute;\n  top: 7px;\n  margin-left: ", ";\n"], defaultToPx(-indentWidth));
export var ChevronContainer = styled.span.withConfig({
  displayName: "styled__ChevronContainer",
  componentId: "sc-56yt3z-2"
})(["\n  ", ";\n"], commonChevronContainer);
export var ChevronIconContainer = styled.span.withConfig({
  displayName: "styled__ChevronIconContainer",
  componentId: "sc-56yt3z-3"
})(["\n  position: relative;\n  top: 1px;\n"]);
export var LoaderItemContainer = styled.span.withConfig({
  displayName: "styled__LoaderItemContainer",
  componentId: "sc-56yt3z-4"
})(["\n  ", " padding-top: 5px;\n  width: 100%;\n\n  ", ";\n"], commonChevronContainer, function (props) {
  return props.isRoot && css(["\n      padding-left: 50%;\n    "]);
});
var commonCell = css(["\n  display: flex;\n  align-items: center;\n  position: relative;\n  box-sizing: border-box;\n  min-height: 40px;\n  padding: 8px ", ";\n  color: ", ";\n  line-height: 20px;\n  ", ";\n"], defaultToPx(indentWidth), colors.N800, function (props) {
  return props.width && css(["\n      width: ", ";\n    "], defaultToPx(props.width));
});
export var OverflowContainer = styled.span.withConfig({
  displayName: "styled__OverflowContainer",
  componentId: "sc-56yt3z-5"
})(["\n  ", ";\n"], function (props) {
  return props.singleLine && css(["\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis;\n    "]);
});
export var Cell = styled.div.withConfig({
  displayName: "styled__Cell",
  componentId: "sc-56yt3z-6"
})(["\n  ", " ", ";\n"], commonCell, function (props) {
  return props.indentLevel && css(["\n      padding-left: ", ";\n    "], defaultToPx(indentWidth * props.indentLevel));
});
export var Header = styled.div.withConfig({
  displayName: "styled__Header",
  componentId: "sc-56yt3z-7"
})(["\n  ", " font-weight: bold;\n  font-size: 12px;\n  line-height: 1.67;\n  letter-spacing: -0.1px;\n  color: ", ";\n"], commonCell, colors.N300);
export var TableTreeContainer = styled.div.withConfig({
  displayName: "styled__TableTreeContainer",
  componentId: "sc-56yt3z-8"
})([""]);