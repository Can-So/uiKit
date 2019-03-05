import {
  akEditorBreakoutPadding,
  akEditorDefaultLayoutWidth,
  breakoutWideScaleRatio,
  akEditorFullWidthLayoutWidth,
  akEditorWideLayoutWidth,
} from '../styles';
import { getBreakpoint, mapBreakpointToLayoutMaxWidth } from '../ui';

export const calcBreakoutWidth = (
  layout: 'full-width' | 'wide' | string,
  containerWidth: number,
) => {
  const effectiveFullWidth = containerWidth - akEditorBreakoutPadding;

  switch (layout) {
    case 'full-width':
      return `${Math.min(effectiveFullWidth, akEditorFullWidthLayoutWidth)}px`;
    case 'wide':
      return calcWideWidth(containerWidth);
    default:
      return '100%';
  }
};

export const calcWideWidth = (
  containerWidth: number = akEditorDefaultLayoutWidth,
  maxWidth: number = Infinity,
  fallback: string = '100%',
) => {
  const effectiveFullWidth = containerWidth - akEditorBreakoutPadding;
  const layoutMaxWidth = mapBreakpointToLayoutMaxWidth(
    getBreakpoint(containerWidth),
  );
  const wideWidth = Math.min(
    Math.ceil(layoutMaxWidth * breakoutWideScaleRatio),
    effectiveFullWidth,
  );
  return layoutMaxWidth > wideWidth
    ? fallback
    : `${Math.min(maxWidth, wideWidth)}px`;
};

export const absoluteBreakoutWidth = (
  layout: 'full-width' | 'wide' | string,
  containerWidth: number,
) => {
  const breakoutWidth = calcBreakoutWidth(layout, containerWidth);

  // If it's percent, map to max layout size
  if (breakoutWidth.endsWith('%')) {
    switch (layout) {
      case 'full-width':
        return akEditorFullWidthLayoutWidth;
      case 'wide':
        return akEditorWideLayoutWidth;
      default:
        return akEditorDefaultLayoutWidth;
    }
  }

  return parseInt(breakoutWidth, 10);
};
