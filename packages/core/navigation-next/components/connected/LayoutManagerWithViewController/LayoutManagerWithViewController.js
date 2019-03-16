import React from 'react';
import ItemsRenderer from '../../../renderer';
import SkeletonContainerView from '../../presentational/SkeletonContainerView';
import AsyncLayoutManagerWithViewController from '../AsyncLayoutManagerWithViewController';
/* NOTE: experimental props use an underscore */

/* eslint-disable camelcase */

var LayoutManagerWithViewController = function LayoutManagerWithViewController(_ref) {
  var children = _ref.children,
      firstSkeletonToRender = _ref.firstSkeletonToRender,
      customComponents = _ref.customComponents,
      experimental_flyoutOnHover = _ref.experimental_flyoutOnHover,
      experimental_alternateFlyoutBehaviour = _ref.experimental_alternateFlyoutBehaviour,
      experimental_fullWidthFlyout = _ref.experimental_fullWidthFlyout,
      globalNavigation = _ref.globalNavigation,
      onExpandStart = _ref.onExpandStart,
      onExpandEnd = _ref.onExpandEnd,
      onCollapseStart = _ref.onCollapseStart,
      onCollapseEnd = _ref.onCollapseEnd,
      getRefs = _ref.getRefs,
      topOffset = _ref.topOffset;
  return React.createElement(AsyncLayoutManagerWithViewController, {
    onExpandStart: onExpandStart,
    onExpandEnd: onExpandEnd,
    onCollapseStart: onCollapseStart,
    onCollapseEnd: onCollapseEnd,
    getRefs: getRefs,
    customComponents: customComponents,
    experimental_flyoutOnHover: !!experimental_flyoutOnHover,
    experimental_alternateFlyoutBehaviour: !!experimental_alternateFlyoutBehaviour,
    experimental_fullWidthFlyout: !!experimental_fullWidthFlyout,
    globalNavigation: globalNavigation,
    containerSkeleton: function containerSkeleton() {
      return firstSkeletonToRender ? React.createElement(SkeletonContainerView, {
        type: firstSkeletonToRender
      }) : null;
    },
    itemsRenderer: ItemsRenderer,
    firstSkeletonToRender: firstSkeletonToRender,
    topOffset: topOffset
  }, children);
};

export default LayoutManagerWithViewController;