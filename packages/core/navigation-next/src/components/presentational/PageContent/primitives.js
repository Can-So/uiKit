// @flow

import React from 'react';
import { applyDisabledProperties } from '../../../common/helpers';
import type { Resizable } from '../LayoutManager/primitives';

type PageProps = Resizable & { offset: number };
export const PageWrapper = ({
  innerRef,
  disableInteraction,
  offset,
  ...props
}: PageProps) => (
  <div
    ref={innerRef}
    css={{
      flex: '1 1 auto',
      marginLeft: offset,
      width: 0, // fix flexbox growth to available width instead of 100%
      ...applyDisabledProperties(!!disableInteraction),
    }}
    {...props}
  />
);
