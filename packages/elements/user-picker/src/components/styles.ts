import { colors } from '@atlaskit/theme';
import memoizeOne from 'memoize-one';
import { AVATAR_SIZES, BORDER_WIDTH } from '@atlaskit/avatar';
import { getAvatarSize } from './utils';

export const PLACEHOLDER_PADDING = 8;

export const getStyles = memoizeOne((width, hasValue) => ({
  menu: css => ({ ...css, width }),
  control: (css, state) => ({
    ...css,
    width,
    borderColor: state.isFocused
      ? css.borderColor
      : state.selectProps.subtle
      ? 'transparent'
      : colors.N40,
    backgroundColor: state.selectProps.subtle ? 'transparent' : colors.N10,
    '&:hover .fabric-user-picker__clear-indicator': {
      opacity: 1,
    },
    ':hover': {
      ...css[':hover'],
      borderColor: state.isFocused
        ? css[':hover'].borderColor
        : state.selectProps.subtle
        ? state.selectProps.hoveringClearIndicator
          ? colors.R50
          : colors.N30
        : colors.N40,
      backgroundColor:
        state.selectProps.subtle && state.selectProps.hoveringClearIndicator
          ? colors.R50
          : colors.N30,
    },
    padding: 0,
    minHeight: state.selectProps.appearance === 'compact' ? 32 : 44,
    alignItems: 'stretch',
  }),
  clearIndicator: ({
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    ...css
  }) => ({
    ...css,
    opacity: 0,
    transition: css.transition + ', opacity 150ms',
    paddingTop: 0,
    padding: 0,
    ':hover': {
      color: colors.R400,
    },
  }),
  valueContainer: ({ paddingTop, paddingBottom, ...css }, state) => ({
    ...css,
    flexGrow: 1,
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    maxHeight: 100,
    overflow: 'auto',
    flexWrap: state.selectProps.isMulti ? 'wrap' : 'nowrap',
  }),
  multiValue: css => ({
    ...css,
    borderRadius: 24,
  }),
  multiValueRemove: css => ({
    ...css,
    backgroundColor: 'transparent',
    '&:hover': { backgroundColor: 'transparent' },
  }),
  placeholder: (css, state) => {
    const avatarSize = getAvatarSize(state.selectProps.appearance);
    return {
      ...css,
      marginLeft: !state.selectProps.isMulti
        ? 2 * PLACEHOLDER_PADDING +
          2 * BORDER_WIDTH[avatarSize] +
          AVATAR_SIZES[avatarSize]
        : PLACEHOLDER_PADDING,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 2,
    };
  },
  option: css => ({
    ...css,
    overflow: 'hidden',
  }),
  input: ({ margin, ...css }) => ({
    ...css,
    paddingLeft: !hasValue ? PLACEHOLDER_PADDING : 0,
  }),
}));
