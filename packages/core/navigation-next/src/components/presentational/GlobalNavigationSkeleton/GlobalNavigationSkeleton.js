// @flow

import React from 'react';

import GlobalNavigationSkeletonItem from './GlobalNavigationSkeletonItem';

import {
  PrimaryItemsList,
  SecondaryItemsList,
  FirstPrimaryItemWrapper,
} from './primitives';
import type { GlobalNavigationSkeletonProps } from './types';

const GlobalNavigationSkeleton = ({ theme }: GlobalNavigationSkeletonProps) => {
  const wrapperStyles = theme.mode.globalNav();

  return (
    <div css={wrapperStyles}>
      <PrimaryItemsList>
        <FirstPrimaryItemWrapper>
          <GlobalNavigationSkeletonItem />
        </FirstPrimaryItemWrapper>
        <GlobalNavigationSkeletonItem />
        <GlobalNavigationSkeletonItem />
        <GlobalNavigationSkeletonItem />
      </PrimaryItemsList>
      <SecondaryItemsList>
        <GlobalNavigationSkeletonItem />
        <GlobalNavigationSkeletonItem />
        <GlobalNavigationSkeletonItem />
        <GlobalNavigationSkeletonItem />
      </SecondaryItemsList>
    </div>
  );
};

export default GlobalNavigationSkeleton;
