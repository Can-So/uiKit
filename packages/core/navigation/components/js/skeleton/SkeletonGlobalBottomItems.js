import React from 'react';
import { Skeleton as SkeletonIcon } from '@atlaskit/icon';
import SkeletonNavigationItems from './styled/SkeletonNavigationItems';
import SkeletonGlobalIconOuter from './styled/SkeletonGlobalIconOuter';

var SkeletonGlobalBottomItems = function SkeletonGlobalBottomItems() {
  return React.createElement(SkeletonNavigationItems, null, React.createElement(SkeletonGlobalIconOuter, null, React.createElement(SkeletonIcon, {
    size: "medium"
  })), React.createElement(SkeletonGlobalIconOuter, null, React.createElement(SkeletonIcon, {
    size: "large",
    weight: "strong"
  })));
};

SkeletonGlobalBottomItems.displayName = 'SkeletonGlobalBottomItems';
export default SkeletonGlobalBottomItems;