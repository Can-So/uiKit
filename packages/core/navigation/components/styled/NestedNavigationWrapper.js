import _taggedTemplateLiteral from "@babel/runtime/helpers/taggedTemplateLiteral";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    margin-right: -", "px;\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React from 'react';
import styled from 'styled-components';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { scrollHintSpacing, gridSize } from '../../shared-variables';
import { whenCollapsed } from '../../theme/util';

var NestedNavigation = function NestedNavigation(_ref) {
  var traversalDirection = _ref.traversalDirection,
      children = _ref.children,
      props = _objectWithoutProperties(_ref, ["traversalDirection", "children"]);

  return (// Don't pass the traversalDirection prop to the TransitionGroup
    // eslint-disable-next-line no-unused-vars
    React.createElement(TransitionGroup, props, children)
  );
};

var NestedNavigationWrapper = styled(NestedNavigation).withConfig({
  displayName: "NestedNavigationWrapper",
  componentId: "sc-1vkt6vd-0"
})(["\n  display: flex;\n  flex-direction: ", ";\n  /* take up the full height - desirable when using drag-and-drop in nested nav */\n  flex-grow: 1;\n  flex-wrap: nowrap;\n  /* Set height so NestedNavigationPages height 100% matches this height */\n  height: 100%;\n  /* pull scrollbar to the edge of the container nav */\n  margin-right: -", "px;\n  max-height: 100%;\n  /* make sure the wrapper doesn't scroll - each page should be an independent scroll container */\n  overflow: hidden;\n\n  ", ";\n"], function (_ref2) {
  var traversalDirection = _ref2.traversalDirection;
  return traversalDirection === 'up' ? 'row' : 'row-reverse';
}, scrollHintSpacing, whenCollapsed(_templateObject(), gridSize));
NestedNavigationWrapper.displayName = 'NestedNavigationWrapper';
export default NestedNavigationWrapper;