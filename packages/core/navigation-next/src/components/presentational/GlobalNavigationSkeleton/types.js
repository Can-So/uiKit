// @flow

import type { ConnectedSkeletonItemProps } from '../SkeletonItem/types';
import type { GlobalTheme } from '../../../theme/types';

export type GlobalNavigationSkeletonItemProps = ConnectedSkeletonItemProps;

export type GlobalNavigationSkeletonProps = {
  /** A map of data attributes applied to the skeleton container element. */
  dataset?: { [name: string]: string | typeof undefined },
};

export type GlobalNavigationSkeletonBaseProps = {
  ...GlobalNavigationSkeletonProps,
  theme: GlobalTheme,
};
