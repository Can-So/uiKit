// @flow
/* eslint-disable react/no-unused-prop-types */

import React, { type Node } from 'react';
import { gridSize, math } from '@atlaskit/theme';
import { getLoadingStyle } from './utils';

type Props = {
  spacing: string,
  isOnlyChild: boolean,
  children: Node,
  isLoading?: boolean,
};

const getMargin = (props: Props) => {
  if (props.spacing === 'none') return 0;
  if (props.isOnlyChild) return `0 -${math.divide(gridSize, 4)(props)}px`;
  return `0 ${math.divide(gridSize, 2)(props)}px`;
};

const IconWrapper = (props: Props) => {
  const style = {
    alignSelf: 'center',
    display: 'flex',
    flexShrink: 0,
    lineHeight: 0,
    fontSize: 0,
    margin: getMargin(props),
    userSelect: 'none',
    ...getLoadingStyle(props),
  };
  return <span style={style}>{props.children}</span>;
};

export default IconWrapper;
