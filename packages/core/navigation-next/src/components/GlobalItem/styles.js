// @flow

import { colors, gridSize } from '@atlaskit/theme';
import type { GlobalItemPresentationProps } from './types';
import type { ModeColors } from '../../theme/types';

const baseStyles = {
  itemBase: {
    alignItems: 'center',
    border: 0,
    borderRadius: '50%',
    color: 'inherit',
    cursor: 'pointer',
    display: 'flex',
    fontSize: 'inherit',
    justifyContent: 'center',
    lineHeight: 1,
    outline: 'none',
    padding: 0,
    position: 'relative', // allow badge positioning

    '&:focus': {
      boxShadow: `0 0 0 2px ${colors.B100}`,
    },
  },
  badgeWrapper: {
    pointerEvents: 'none',
    position: 'absolute',
    userSelect: 'none',
  },
};

const sizeStyles = {
  large: {
    itemBase: {
      height: `${gridSize() * 5}px`,
      width: `${gridSize() * 5}px`,
    },
    badgeWrapper: {
      left: `${gridSize() * 2}px`,
      top: 0,
    },
  },
  small: {
    itemBase: {
      height: `${gridSize() * 4}px`,
      marginTop: `${gridSize()}px`,
      width: `${gridSize() * 4}px`,
    },
    badgeWrapper: {
      left: `${gridSize() * 2.5}px`,
      top: `-${gridSize() / 2}px`,
    },
  },
};

export default ({ product }: ModeColors) => ({
  isActive,
  isHover,
  size = 'large',
}: GlobalItemPresentationProps) => ({
  itemBase: {
    ...baseStyles.itemBase,
    ...sizeStyles[size].itemBase,
    backgroundColor: (() => {
      if (isHover) return product.background.hint;
      if (isActive) return product.background.interact;
      return product.background.default;
    })(),
    color: product.text.default,
  },
  badgeWrapper: {
    ...baseStyles.badgeWrapper,
    ...sizeStyles[size].badgeWrapper,
  },
});
