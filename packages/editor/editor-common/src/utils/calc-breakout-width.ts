import {
  akEditorFullPageMaxWidth,
  akEditorBreakoutPadding,
  akEditorDefaultLayoutWidth,
  breakoutWideScaleRatio,
} from '../styles';
import { getBreakpoint, mapBreakpointToLayoutMaxWidth } from '../ui';

export const calcBreakoutWidth = (
  layout: 'full-width' | 'wide' | string,
  containerWidth: number,
) => {
  const effectiveFullWidth = containerWidth - akEditorBreakoutPadding;

  switch (layout) {
    case 'full-width':
      return effectiveFullWidth <= akEditorFullPageMaxWidth
        ? '100%'
        : `${effectiveFullWidth}px`;
    case 'wide':
      return calcWideWidth(containerWidth);
    default:
      return 'inherit';
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
