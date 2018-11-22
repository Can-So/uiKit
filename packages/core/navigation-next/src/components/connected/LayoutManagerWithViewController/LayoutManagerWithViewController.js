// @flow

import React from 'react';

import type { LayoutManagerWithViewControllerProps } from './types';
import ItemsRenderer from '../../../renderer';
import SkeletonContainerView from '../../presentational/SkeletonContainerView';
import AsyncLayoutManagerWithViewController from '../AsyncLayoutManagerWithViewController';
/* NOTE: experimental props use an underscore */
/* eslint-disable camelcase */

const LayoutManagerWithViewController = ({
  children,
  firstSkeletonToRender,
  customComponents,
  experimental_flyoutOnHover,
  globalNavigation,
  onExpandStart,
  onExpandEnd,
  onCollapseStart,
  onCollapseEnd,
  getRefs,
}: LayoutManagerWithViewControllerProps) => {
  return (
    <AsyncLayoutManagerWithViewController
      onExpandStart={onExpandStart}
      onExpandEnd={onExpandEnd}
      onCollapseStart={onCollapseStart}
      onCollapseEnd={onCollapseEnd}
      getRefs={getRefs}
      customComponents={customComponents}
      experimental_flyoutOnHover={!!experimental_flyoutOnHover}
      globalNavigation={globalNavigation}
      containerSkeleton={() =>
        firstSkeletonToRender ? (
          <SkeletonContainerView type={firstSkeletonToRender} />
        ) : null
      }
      itemsRenderer={ItemsRenderer}
      firstSkeletonToRender={firstSkeletonToRender}
    >
      {children}
    </AsyncLayoutManagerWithViewController>
  );
};

export default LayoutManagerWithViewController;
