// @flow

import React from 'react';

import type { LayoutManagerWithViewControllerProps } from './types';
import ViewRenderer from '../../../renderer';
import SkeletonContainerView from '../../presentational/SkeletonContainerView';
import AsyncLayoutManagerWithViewController from '../AsyncLayoutManagerWithViewController/AsyncLayoutManagerWithViewController';
/* NOTE: experimental props use an underscore */
/* eslint-disable camelcase */

const LayoutManagerWithViewController = ({
  children,
  firstSkeletonToRender,
  customComponents,
  experimental_flyoutOnHover,
  globalNavigation,
  ...otherProps
}: LayoutManagerWithViewControllerProps) => {
  return (
    <AsyncLayoutManagerWithViewController
      {...otherProps}
      customComponents={customComponents}
      experimental_flyoutOnHover={!!experimental_flyoutOnHover}
      globalNavigation={globalNavigation}
      containerSkeleton={() =>
        firstSkeletonToRender ? (
          <SkeletonContainerView type={firstSkeletonToRender} />
        ) : null
      }
      viewRenderer={ViewRenderer}
      firstSkeletonToRender={firstSkeletonToRender}
    >
      {children}
    </AsyncLayoutManagerWithViewController>
  );
};

export default LayoutManagerWithViewController;
