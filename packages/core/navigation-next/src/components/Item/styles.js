// @flow

import { colors, fontSize, gridSize as gridSizeFn } from '@atlaskit/theme';

import type { ItemPresentationProps } from './types';
import type { ModeColors } from '../../theme/types';

const gridSize = gridSizeFn();

/**
 * Component tree structure:
 * - itemBase
 *   - beforeWrapper
 *   - contentWrapper
 *     - textWrapper
 *     - subTextWrapper
 *   - afterWrapper
 */

// These are the styles which are consistent regardless of theme or spacing
const baseStyles = {
  itemBase: {
    alignItems: 'center',
    border: 'none',
    borderRadius: '3px',
    boxSizing: 'border-box',
    color: 'inherit',
    cursor: 'pointer',
    display: 'flex',
    flexShrink: 0,
    fontSize: 'inherit',
    height: `${gridSize * 5}`,
    outline: 'none',
    textAlign: 'left',
    textDecoration: 'none',
    width: '100%',

    '&:focus': {
      boxShadow: `0 0 0 2px ${colors.B100} inset`,
    },
  },
  beforeWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflowX: 'hidden',
  },
  textWrapper: {
    flex: '1 1 auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    lineHeight: 16 / fontSize(),
  },
  subTextWrapper: {
    flex: '1 1 auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  afterWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
  },
};

// These are styles which switch on the spacing prop
const layoutStyles = {
  compact: {
    itemBase: {
      paddingRight: `${gridSize}px`,
      paddingLeft: `${gridSize}px`,
    },
    beforeWrapper: {
      marginRight: `${gridSize}`,
    },
    subTextWrapper: {
      fontSize: `${10}px`,
      lineHeight: 1.2,
    },
    afterWrapper: {
      marginLeft: `${gridSize}`,
    },
  },
  default: {
    itemBase: {
      paddingRight: `${gridSize * 1.5}px`,
      paddingLeft: `${gridSize * 1.5}px`,
    },
    beforeWrapper: {
      marginRight: `${gridSize * 2}`,
    },
    subTextWrapper: {
      fontSize: `${12}px`,
      lineHeight: 14 / 12,
    },
    afterWrapper: {
      marginLeft: `${gridSize * 2}`,
    },
  },
};

const getItemBackgroundColor = (
  background,
  { isActive, isSelected, isHover },
) => {
  if (isActive) return background.interact;
  if (isSelected) return background.static;
  if (isHover) return background.hint;
  return background.default;
};

// Light theme
export default ({ product }: ModeColors) => ({
  isActive,
  isHover,
  isSelected,
  spacing,
}: ItemPresentationProps) => ({
  container: {
    itemBase: {
      ...baseStyles.itemBase,
      ...layoutStyles[spacing].itemBase,
      backgroundColor: getItemBackgroundColor(
        {
          default: colors.N20,
          hint: colors.N30,
          interact: colors.B50,
          static: colors.N30,
        },
        {
          isActive,
          isHover,
          isSelected,
        },
      ),
    },
    beforeWrapper: {
      ...baseStyles.beforeWrapper,
      ...layoutStyles[spacing].beforeWrapper,
      color: isSelected ? colors.B400 : colors.N500,
    },
    contentWrapper: baseStyles.contentWrapper,
    textWrapper: {
      ...baseStyles.textWrapper,
      color: isSelected ? colors.B400 : colors.N500,
    },
    subTextWrapper: {
      ...baseStyles.subTextWrapper,
      ...layoutStyles[spacing].subTextWrapper,
      color: colors.N200,
    },
    afterWrapper: {
      ...baseStyles.afterWrapper,
      ...layoutStyles[spacing].afterWrapper,
      color: colors.N500,
    },
  },
  product: {
    itemBase: {
      ...baseStyles.itemBase,
      ...layoutStyles[spacing].itemBase,
      backgroundColor: getItemBackgroundColor(product.background, {
        isActive,
        isHover,
        isSelected,
      }),
    },
    beforeWrapper: {
      ...baseStyles.beforeWrapper,
      ...layoutStyles[spacing].beforeWrapper,
      color: product.text.default,
    },
    contentWrapper: baseStyles.contentWrapper,
    textWrapper: {
      ...baseStyles.textWrapper,
      color: product.text.default,
    },
    subTextWrapper: {
      ...baseStyles.subTextWrapper,
      ...layoutStyles[spacing].subTextWrapper,
      color: product.text.subtle,
    },
    afterWrapper: {
      ...baseStyles.afterWrapper,
      ...layoutStyles[spacing].afterWrapper,
      color: product.text.default,
    },
  },
});
