// @flow
import React from 'react';
import { withGlobalTheme, light, ThemeProvider } from '../../../theme';
import BaseGlobalNavigationSkeleton from './GlobalNavigationSkeleton';
import type { GlobalNavigationSkeletonProps } from './types';

const GlobalNavigationSkeletonWithGlobalTheme = withGlobalTheme(
  BaseGlobalNavigationSkeleton,
);

const GlobalNavigationSkeleton = (props: GlobalNavigationSkeletonProps) => (
  <ThemeProvider
    theme={ancestorTheme => ({
      mode: light,
      ...ancestorTheme,
      context: 'product',
    })}
  >
    <GlobalNavigationSkeletonWithGlobalTheme {...props} />
  </ThemeProvider>
);

export default GlobalNavigationSkeleton;
