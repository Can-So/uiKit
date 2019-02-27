// @flow

import React from 'react';

import GlobalNavigationSkeletonItem from './GlobalNavigationSkeletonItem';

import {
  Container,
  PrimaryItemsList,
  SecondaryItemsList,
  FirstPrimaryItemWrapper,
} from './primitives';
import type { GlobalNavigationSkeletonBaseProps } from './types';

const GlobalNavigationSkeleton = (props: GlobalNavigationSkeletonBaseProps) => {
  const { dataset, theme, ...rest } = props;

  const wrapperStyles = theme.mode.globalNav();

  return (
    <Container styles={wrapperStyles} {...dataset} {...rest}>
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
    </Container>
  );
};

GlobalNavigationSkeleton.defaultProps = {
  dataset: {
    'data-test-id': 'GlobalNavigationSkeleton',
  },
};

export default GlobalNavigationSkeleton;
