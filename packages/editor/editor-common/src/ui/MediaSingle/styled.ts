import * as React from 'react';
import { HTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import { MediaSingleLayout } from '../../schema';
import {
  akEditorWideLayoutWidth,
  akEditorFullPageMaxWidth,
  akEditorBreakoutPadding,
} from '../../styles';
import { calcWideWidth } from '../../utils';

function float(layout: MediaSingleLayout): string {
  switch (layout) {
    case 'wrap-right':
      return 'right';
    case 'wrap-left':
      return 'left';
    default:
      return 'none';
  }
}

/**
 * Calculates the image width for non-resized images.
 *
 * If an image has not been resized using the pctWidth attribute,
 * then an image in wide or full-width can not be wider than the image's
 * original width.
 */
function calcLegacyWidth(
  layout: MediaSingleLayout,
  width: number,
  containerWidth: number = 0,
): string {
  switch (layout) {
    case 'wrap-right':
    case 'wrap-left':
      return width > akEditorFullPageMaxWidth / 2
        ? 'calc(50% - 12px)'
        : `${width}px`;
    case 'wide':
      return calcWideWidth(containerWidth);
    case 'full-width':
      return `${Math.min(width, containerWidth) - akEditorBreakoutPadding}px`;
    default:
      return width > akEditorFullPageMaxWidth ? '100%' : `${width}px`;
  }
}

/**
 * Calculates the image width for previously resized images.
 *
 * Wide and full-width images are always that size (960px and 100%); there is
 * no distinction between max-width and width.
 */
function calcResizedWidth(layout: MediaSingleLayout, width: number) {
  switch (layout) {
    case 'wide':
      return `${akEditorWideLayoutWidth}px`;
    case 'full-width':
      return '100%';
    default:
      return `${width}px`;
  }
}

function calcMaxWidth(
  layout: MediaSingleLayout,
  width: number,
  containerWidth: number,
) {
  switch (layout) {
    case 'wide':
      return calcWideWidth(containerWidth);
    case 'full-width':
      return containerWidth < akEditorFullPageMaxWidth
        ? '100%'
        : `${containerWidth}px`;
    default:
      return '100%';
  }
}

function calcMargin(layout: MediaSingleLayout): string {
  switch (layout) {
    case 'wrap-right':
      return '12px auto 12px 24px';
    case 'wrap-left':
      return '12px 24px 12px auto';
    default:
      return '24px auto';
  }
}

export interface WrapperProps {
  layout: MediaSingleLayout;
  width: number;
  height: number;
  containerWidth?: number;
  pctWidth?: number;
  innerRef?: (elem: HTMLElement) => void;
}

/**
 * Can't use `.attrs` to handle highly dynamic styles because we are still
 * supporting `styled-components` v1.
 */
export const MediaSingleDimensionHelper = ({
  width,
  height,
  layout,
  containerWidth = 0,
  pctWidth,
}: WrapperProps) => css`
  width: ${pctWidth
    ? calcResizedWidth(layout, width)
    : calcLegacyWidth(layout, width, containerWidth)};
  max-width: ${calcMaxWidth(layout, width, containerWidth)};
  float: ${float(layout)};
  margin: ${calcMargin(layout)};

  tr & {
    max-width: 100%;
  }
`;

const Wrapper: React.ComponentClass<
  HTMLAttributes<{}> & WrapperProps
> = styled.div`
  ${MediaSingleDimensionHelper};
  position: relative;

  &::after {
    content: '';
    display: block;
    padding-bottom: ${p => (p.height / p.width) * 100}%;
  }

  & > div {
    position: absolute;
    height: 100%;
  }
`;
Wrapper.displayName = 'WrapperMediaSingle';

export default Wrapper;
