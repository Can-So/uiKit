import styled, { css } from 'styled-components';
import { gridSize, typography } from '@atlaskit/theme';
var truncationStyles = css(["\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"]);

var getTruncationStyles = function getTruncationStyles(_ref) {
  var truncate = _ref.truncate;
  return truncate ? truncationStyles : null;
};

export var Outer = styled.div.withConfig({
  displayName: "styled__Outer",
  componentId: "sc-1a16ki5-0"
})(["\n  margin: ", "px 0 ", "px 0;\n"], gridSize() * 3, gridSize() * 2);
export var StyledTitle = styled.h1.withConfig({
  displayName: "styled__StyledTitle",
  componentId: "sc-1a16ki5-1"
})(["\n  ", ";\n  ", " line-height: ", "px;\n  margin-top: 0;\n"], typography.h700(), getTruncationStyles, gridSize() * 4);
export var TitleWrapper = styled.div.withConfig({
  displayName: "styled__TitleWrapper",
  componentId: "sc-1a16ki5-2"
})(["\n  align-items: flex-start;\n  display: flex;\n  ", "\n  justify-content: space-between;\n"], function (_ref2) {
  var truncate = _ref2.truncate;
  return truncate ? 'flex-wrap: no-wrap;' : 'flex-wrap: wrap;';
});
export var TitleContainer = styled.div.withConfig({
  displayName: "styled__TitleContainer",
  componentId: "sc-1a16ki5-3"
})(["\n  flex: 1 0 auto;\n  ", "\n  margin-bottom: ", "px;\n  max-width: 100%;\n  min-width: 0;\n"], function (_ref3) {
  var truncate = _ref3.truncate;
  return truncate ? 'flex-shrink: 1;' : null;
}, gridSize());
export var ActionsWrapper = styled.div.withConfig({
  displayName: "styled__ActionsWrapper",
  componentId: "sc-1a16ki5-4"
})(["\n  flex: 1 0 auto;\n  margin-bottom: ", "px;\n  max-width: 100%;\n  padding-left: ", "px;\n  text-align: right;\n  white-space: nowrap;\n"], gridSize(), gridSize() * 4);
export var BottomBarWrapper = styled.div.withConfig({
  displayName: "styled__BottomBarWrapper",
  componentId: "sc-1a16ki5-5"
})(["\n  margin-top: ", "px;\n"], gridSize() * 2);