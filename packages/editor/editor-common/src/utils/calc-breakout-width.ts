import {
  akEditorBreakoutPadding,
  akEditorDefaultLayoutWidth,
  breakoutWideScaleRatio,
  akEditorFullWidthLayoutWidth,
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
