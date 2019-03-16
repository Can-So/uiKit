import React from 'react';
import { Skeleton as SkeletonIcon } from '@atlaskit/icon';
import SkeletonNavigationItems from './styled/SkeletonNavigationItems';
import SkeletonGlobalPrimaryIconOuter from './styled/SkeletonGlobalPrimaryIconOuter';
import SkeletonGlobalIconOuter from './styled/SkeletonGlobalIconOuter';
import SkeletonGlobalTopItemsInner from './styled/SkeletonGlobalTopItemsInner';

var SkeletonGlobalTopItems = function SkeletonGlobalTopItems() {
  return React.createElement(SkeletonGlobalTopItemsInner, null, React.createElement(SkeletonNavigationItems, null, React.createElement(SkeletonGlobalPrimaryIconOuter, null, React.createElement(SkeletonIcon, {
    size: "xlarge",
    weight: "strong"
  })), React.createElement(SkeletonGlobalIconOuter, null, React.createElement(SkeletonIcon, {
    size: "large"
  })), React.createElement(SkeletonGlobalIconOuter, null, React.createElement(SkeletonIcon, {
    size: "large"
  }))));
};

SkeletonGlobalTopItems.displayName = 'SkeletonGlobalTopItems';
export default SkeletonGlobalTopItems;