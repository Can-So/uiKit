import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    &:before,\n    &:after {\n      background: ", ";\n      display: block;\n      flex: 0;\n      height: ", "px;\n      left: ", "px;\n      position: absolute;\n      z-index: 1;\n\n      // Because we are using a custom scrollbar for WebKit in ScrollHintScrollContainer, the\n      // right margin needs to be calculated based on whether that feature is in use.\n      right: ", "px;\n    }\n\n    &:before {\n      top: 0;\n      content: ", ";\n    }\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import styled from 'styled-components';
import { getProvided, whenNotCollapsed } from '../../theme/util';
import { scrollBarSize, scrollHintSpacing, scrollHintHeight } from '../../shared-variables';

var doubleIfNotWebkit = function doubleIfNotWebkit(width) {
  return width * (typeof window !== 'undefined' && window.navigator && window.navigator.userAgent.indexOf('AppleWebKit') >= 0 ? 1 : 2);
};

var ContainerNavigationChildrenWrapper = styled.div.withConfig({
  displayName: "ScrollHintWrapper__ContainerNavigationChildrenWrapper",
  componentId: "sc-1iamvtm-0"
})(["\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 100%;\n  overflow: hidden;\n  /* Position relative is required so products can position fixed items at top or bottom\n   * of the container scrollable area. */\n  position: relative;\n\n  ", ";\n"], whenNotCollapsed(_templateObject(), function (_ref) {
  var theme = _ref.theme;
  return getProvided(theme).keyline;
}, scrollHintHeight, scrollHintSpacing, scrollHintSpacing + doubleIfNotWebkit(scrollBarSize), function (_ref2) {
  var hasScrollHintTop = _ref2.hasScrollHintTop;
  return hasScrollHintTop ? "''" : 'none';
}));
ContainerNavigationChildrenWrapper.displayName = 'ContainerNavigationChildrenWrapper';
export default ContainerNavigationChildrenWrapper;