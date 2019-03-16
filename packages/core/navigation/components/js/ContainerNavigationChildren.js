import React from 'react';
import ScrollHintWrapper from '../styled/ScrollHintWrapper';
import ScrollHintScrollContainer from '../styled/ScrollHintScrollContainer';

var ContainerNavigationChildren = function ContainerNavigationChildren(_ref) {
  var children = _ref.children,
      hasScrollHintTop = _ref.hasScrollHintTop,
      scrollRef = _ref.scrollRef;
  return React.createElement(ScrollHintWrapper, {
    hasScrollHintTop: hasScrollHintTop
  }, React.createElement(ScrollHintScrollContainer, {
    innerRef: scrollRef
  }, children));
};

ContainerNavigationChildren.displayName = 'ContainerNavigationChildren';
export default ContainerNavigationChildren;