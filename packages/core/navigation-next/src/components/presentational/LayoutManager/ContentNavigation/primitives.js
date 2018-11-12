// @flow

import React, { Fragment, type Node } from 'react';
import { keyframes } from 'emotion';
import { colors } from '@atlaskit/theme';

import {
  transitionDuration,
  transitionTimingFunction,
} from '../../../../common/constants';
import {
  light,
  withContentTheme,
  ThemeProvider,
  type ProductTheme,
} from '../../../../theme';

/**
 * Component tree structure
 *  - ProductNavigation
 *  - ContainerNavigation
 *    - ContainerOverlay
 */

const ScrollProvider = (props: any) => (
  <div
    css={{
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflowX: 'hidden',
      overflowY: 'auto',
      width: '100%',
    }}
    {...props}
  />
);

/**
 * ProductNavigation
 */
type ProductNavigationPrimitiveBaseProps = {
  children: Node,
  theme: ProductTheme,
};

const ProductNavigationPrimitiveBase = ({
  children,
  theme = { mode: light, context: 'product' },
}: ProductNavigationPrimitiveBaseProps) => (
  <div css={theme.mode.contentNav().product}>
    <ScrollProvider>{children}</ScrollProvider>
  </div>
);

const ProductNavigationPrimitive = withContentTheme(
  ProductNavigationPrimitiveBase,
);

type ProductNavigationProps = { children: Node };

type BaseNavigationTheme = {
  children: Node,
};

export const ProductNavigationTheme = ({ children }: BaseNavigationTheme) => (
  <ThemeProvider
    theme={oldTheme => ({ mode: light, ...oldTheme, context: 'product' })}
  >
    <Fragment>{children}</Fragment>
  </ThemeProvider>
);

export const ProductNavigation = (props: ProductNavigationProps) => (
  <ProductNavigationTheme>
    <ProductNavigationPrimitive {...props} />
  </ProductNavigationTheme>
);

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

/**
 * ContainerNavigation
 */
type ContainerNavigationPrimitiveBaseProps = {
  children: Node,
  isEntering: boolean,
  isExiting: boolean,
  theme: ProductTheme,
};
const ContainerNavigationPrimitiveBase = ({
  children,
  isEntering,
  isExiting,
  theme,
}: ContainerNavigationPrimitiveBaseProps) => {
  let animationName;
  if (isEntering) animationName = slideIn;

  const transform = isExiting ? 'translateX(100%)' : null;

  return (
    <div
      css={{
        ...theme.mode.contentNav().container,
        animationName,
        animationDuration: transitionDuration,
        animationFillMode: 'forwards',
        animationTimingFunction: transitionTimingFunction,
        transitionProperty: 'boxShadow, transform',
        transitionDuration,
        transitionTimingFunction,
        transform,
      }}
    >
      <ScrollProvider>{children}</ScrollProvider>
    </div>
  );
};

const ContainerNavigationPrimitive = withContentTheme(
  ContainerNavigationPrimitiveBase,
);

type ContainerNavigationProps = {
  children: Node,
};

export const ContainerNavigationTheme = ({ children }: BaseNavigationTheme) => (
  <ThemeProvider theme={{ mode: light, context: 'container' }}>
    <Fragment>{children}</Fragment>
  </ThemeProvider>
);

export const ContainerNavigation = (props: ContainerNavigationProps) => (
  <ContainerNavigationTheme>
    <ContainerNavigationPrimitive {...props} />
  </ContainerNavigationTheme>
);

/**
 * ContainerOverlay
 */
type ContainerOverlayProps = { isVisible: boolean, onClick?: Event => void };

export const ContainerOverlay = ({
  isVisible,
  onClick,
  ...props
}: ContainerOverlayProps) => (
  <div
    css={{
      backgroundColor: colors.N70A,
      cursor: isVisible ? 'pointer' : 'default',
      height: '100%',
      left: 0,
      opacity: isVisible ? 1 : 0,
      pointerEvents: isVisible ? 'all' : 'none',
      position: 'absolute',
      top: 0,
      transitionDuration,
      transitionProperty: 'opacity',
      transitionTimingFunction,
      width: '100%',
      zIndex: 5,
    }}
    onClick={onClick}
    role="presentation"
    {...props}
  />
);
