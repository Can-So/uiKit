import styled from 'styled-components';
import { borderRadius } from '@atlaskit/theme';
import { HTMLAttributes, ComponentClass } from 'react';
import { MediaItemType } from '@atlaskit/media-core';
import { CardDimensions, CardAppearance } from '../';
import { getCSSUnitValue } from '../utils/getCSSUnitValue';
import { getCSSBoundaries } from '../utils/cardDimensions';
import { BreakpointSizeValue, breakpointStyles } from '../utils/breakpoint';
import { getSelectedBorderStyle } from '../styles/getSelectedBorderStyle';

export interface WrapperProps {
  mediaItemType: MediaItemType;
  dimensions?: CardDimensions;
  appearance?: CardAppearance;
  breakpointSize?: BreakpointSizeValue;
}

const getWrapperHeight = (dimensions?: CardDimensions) =>
  dimensions && dimensions.height
    ? `height: ${getCSSUnitValue(dimensions.height)}; max-height: 100%;`
    : '';

const getWrapperWidth = (dimensions?: CardDimensions) =>
  dimensions && dimensions.width
    ? `width: ${getCSSUnitValue(dimensions.width)}; max-width: 100%;`
    : '';

export const Wrapper: ComponentClass<
  HTMLAttributes<{}> & WrapperProps
> = styled.div`
  ${({
    appearance,
    dimensions,
    mediaItemType,
    breakpointSize = 'medium',
  }: WrapperProps) => {
    // Links are responsive and omit passed dimensions, instead they use max and min dimensions
    // they don't apply breakpoints either
    if (mediaItemType === 'link') {
      return `
        ${getCSSBoundaries(appearance)}
        position: relative;
      `;
    }

    return `
      ${breakpointStyles({ breakpointSize })}
      ${getWrapperHeight(dimensions)}
      ${getWrapperWidth(dimensions)}
    `;
  }};
`;

export const InlinePlayerWrapper = styled.div`
  overflow: hidden;
  border-radius: ${borderRadius()};
  position: relative;

  max-width: 100%;
  max-height: 100%;

  ${getSelectedBorderStyle}

  video {
    width: 100%;
    height: 100%;
  }
`;

InlinePlayerWrapper.displayName = 'InlinePlayerWrapper';
