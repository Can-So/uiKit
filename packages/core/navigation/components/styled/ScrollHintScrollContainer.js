import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    overflow-y: auto;\n\n    &:before,\n    &:after {\n      background: ", ";\n      content: '';\n      display: block;\n      flex: 0;\n      min-height: ", "px;\n      position: relative;\n      z-index: 5;\n    }\n\n    &:after {\n      top: ", "px;\n    }\n\n    /* The following styles are to style scrollbars when there is long/wide content */\n    -ms-overflow-style: -ms-autohiding-scrollbar;\n    &::-webkit-scrollbar {\n      height: ", "px;\n      width: ", "px;\n    }\n    &::-webkit-scrollbar-corner {\n      display: none;\n    }\n    &::-webkit-scrollbar-thumb {\n      background-color: rgba(0, 0, 0, 0);\n    }\n    &:hover::-webkit-scrollbar-thumb {\n      background-color: ", ";\n      border-radius: ", "px;\n    }\n    &::-webkit-scrollbar-thumb:hover {\n      background-color: ", ";\n    }\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    overflow-x: hidden;\n    padding: 0 ", "px;\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import styled from 'styled-components';
import { gridSize, drawerContainerHeaderAnimationSpeed, scrollBarSize, scrollHintSpacing, scrollHintHeight } from '../../shared-variables';
import { whenCollapsed, whenNotCollapsed, getProvided, getProvidedScrollbar } from '../../theme/util';
var bottomPadding = gridSize;
var ScrollHintScrollContainer = styled.div.withConfig({
  displayName: "ScrollHintScrollContainer",
  componentId: "sc-1q3nox-0"
})(["\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  /* Flex-basis must be set to auto and width set to 100% instead to prevent box-sizing issues\n   * in IE11.\n   * See https://github.com/philipwalton/flexbugs#7-flex-basis-doesnt-account-for-box-sizingborder-box\n   */\n  flex: 1 1 auto;\n  width: 100%;\n  height: 100%;\n  justify-content: flex-start;\n  transition: padding ", ";\n  padding: 0 ", "px ", "px ", "px;\n\n  ", " ", ";\n"], drawerContainerHeaderAnimationSpeed, scrollHintSpacing, bottomPadding, scrollHintSpacing, whenCollapsed(_templateObject(), gridSize), whenNotCollapsed(_templateObject2(), function (_ref) {
  var theme = _ref.theme;
  return getProvided(theme).background.secondary || getProvided(theme).background.primary;
}, scrollHintHeight, bottomPadding, scrollBarSize, scrollBarSize, function (_ref2) {
  var theme = _ref2.theme;
  return getProvidedScrollbar(theme).default.background;
}, scrollBarSize, function (_ref3) {
  var theme = _ref3.theme;
  return getProvidedScrollbar(theme).hover.background;
}));
ScrollHintScrollContainer.displayName = 'ScrollHintScrollContainer';
export default ScrollHintScrollContainer;