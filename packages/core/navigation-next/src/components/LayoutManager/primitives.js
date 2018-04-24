// @flow

import React, { type ElementRef } from 'react';

export const LayoutContainer = (props: {}) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'row',
      height: '100vh',
    }}
    {...props}
  />
);

export const NavContainer = (props: {}) => (
  <div
    css={{
      bottom: 0,
      display: 'flex',
      flexDirection: 'row',
      left: 0,
      position: 'fixed',
      top: 0,
    }}
    {...props}
  />
);

// Resizable Elements can be disabled

export type Resizable = {
  innerRef?: ElementRef<*>,
  disableInteraction: boolean,
};
export function applyDisabledProperties(disableInteraction: boolean) {
  return disableInteraction
    ? {
        pointerEvents: 'none',
        userSelect: 'none',
      }
    : null;
}

// Product Nav

export const ProductNavWrapper = ({
  innerRef,
  disableInteraction,
  ...props
}: Resizable) => (
  <div
    ref={innerRef}
    css={{
      height: '100%',
      position: 'relative',
      ...applyDisabledProperties(disableInteraction),
    }}
    {...props}
  />
);
export const ContainerNavMask = (props: any) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      height: '100%',
    }}
    {...props}
  />
);

// Page

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
      flex: 1,
      marginLeft: offset,
      ...applyDisabledProperties(disableInteraction),
    }}
    {...props}
  />
);
