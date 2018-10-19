// @flow

import React, { PureComponent } from 'react';
import { gridSize as gridSizeFn } from '@atlaskit/theme';

import SkeletonItem from '../SkeletonItem';
import { styleReducerNoOp } from '../../../theme';
import type { SkeletonContainerHeaderProps } from './types';

const gridSize = gridSizeFn();

const modifyStyles = defaultStyles => ({
  ...defaultStyles,
  wrapper: {
    ...defaultStyles.wrapper,
    height: `${gridSize * 6}px`,
    paddingLeft: gridSize / 2,
    paddingRight: gridSize / 2,
  },
  before: {
    ...defaultStyles.before,
    borderRadius: 3,
    height: gridSize * 5,
    marginRight: gridSize,
    width: gridSize * 5,
  },
});

export default class SkeletonContainerHeader extends PureComponent<
  SkeletonContainerHeaderProps,
> {
  static defaultProps = {
    hasBefore: false,
    styles: styleReducerNoOp,
  };

  render() {
    const { styles: styleReducer, ...props } = this.props;

    // We modify the SkeletonItem styles ourselves, then allow the consumer to
    // modify these if they want to.
    const patchedStyles = defaultStyles =>
      styleReducer(modifyStyles(defaultStyles));

    return <SkeletonItem {...props} styles={patchedStyles} spacing="default" />;
  }
}
