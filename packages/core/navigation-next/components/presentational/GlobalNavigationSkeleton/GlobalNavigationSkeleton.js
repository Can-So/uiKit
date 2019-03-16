import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import React from 'react';
import GlobalNavigationSkeletonItem from './GlobalNavigationSkeletonItem';
import { Container, PrimaryItemsList, SecondaryItemsList, FirstPrimaryItemWrapper } from './primitives';

var GlobalNavigationSkeleton = function GlobalNavigationSkeleton(props) {
  var dataset = props.dataset,
      theme = props.theme,
      rest = _objectWithoutProperties(props, ["dataset", "theme"]);

  var wrapperStyles = theme.mode.globalNav();
  return React.createElement(Container, _extends({
    styles: wrapperStyles
  }, dataset, rest), React.createElement(PrimaryItemsList, null, React.createElement(FirstPrimaryItemWrapper, null, React.createElement(GlobalNavigationSkeletonItem, null)), React.createElement(GlobalNavigationSkeletonItem, null), React.createElement(GlobalNavigationSkeletonItem, null), React.createElement(GlobalNavigationSkeletonItem, null)), React.createElement(SecondaryItemsList, null, React.createElement(GlobalNavigationSkeletonItem, null), React.createElement(GlobalNavigationSkeletonItem, null), React.createElement(GlobalNavigationSkeletonItem, null), React.createElement(GlobalNavigationSkeletonItem, null)));
};

GlobalNavigationSkeleton.defaultProps = {
  dataset: {
    'data-test-id': 'GlobalNavigationSkeleton'
  }
};
export default GlobalNavigationSkeleton;