// @flow

import React from 'react';
import type { Interpolation } from 'emotion';
import { gridSize as gridSizeFn } from '@atlaskit/theme';

const gridSize = gridSizeFn();

const listBaseStyles = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
};

export type ContainerProps = {
  styles: Interpolation,
};

export const Container = (props: ContainerProps) => {
  const { styles, ...rest } = props;
  return <div css={styles} {...rest} />;
};

export const PrimaryItemsList = (props: *) => (
  <div css={{ ...listBaseStyles, paddingBottom: gridSize * 2 }} {...props} />
);

export const FirstPrimaryItemWrapper = (props: *) => (
  <div css={{ paddingBottom: gridSize * 1.75 }} {...props} />
);

export const SecondaryItemsList = (props: *) => (
  <div
    css={{
      ...listBaseStyles,
      paddingTop: gridSize,
    }}
    {...props}
  />
);
