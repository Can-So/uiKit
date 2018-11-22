// @flow

import React from 'react';
import type { Node } from 'react';
import styled from 'styled-components';
import { withTheme } from '@atlaskit/theme';
import { Theme } from '../theme';
import { getInnerStyles } from './utils';

export default (props: { children: Node, stackIndex: ?number }) => (
  <Theme props={{ ...props, includeBorderWidth: true }}>
    {({ dimensions }) => {
      return (
        <div
          style={{
            display: 'inline-block',
            position: 'relative',
            outline: 0,
            zIndex: props.stackIndex,
            ...dimensions,
          }}
        >
          {props.children}
        </div>
      );
    }}
  </Theme>
);

// TODO this doesn't appear to be used anywhere so we should look at removing.
export const Inner = withTheme(styled.div`
  ${getInnerStyles};
`);

export const PresenceWrapper = (props: { children: Node }) => (
  <Theme props={{ ...props, includeBorderWidth: true }}>
    {({ presence }) => {
      return (
        <span
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            ...presence,
          }}
        >
          {props.children}
        </span>
      );
    }}
  </Theme>
);

export const StatusWrapper = (props: { children: Node }) => (
  <Theme props={{ ...props, includeBorderWidth: true }}>
    {({ status }) => {
      return (
        <span
          style={{
            position: 'absolute',
            ...status,
          }}
        >
          {props.children}
        </span>
      );
    }}
  </Theme>
);
