// @flow

import {
  createTheme,
  codeFontFamily,
  gridSize,
  fontSize,
} from '@atlaskit/theme';
import * as componentTokens from './component-tokens';

const disabledRules = {
  light: {
    backgroundColor: componentTokens.defaultBackgroundColor.light,
    backgroundColorFocus: componentTokens.disabledBackgroundColor.light,
    backgroundColorHover: componentTokens.disabledBackgroundColor.light,
    borderColor: componentTokens.defaultBorderColor.light,
    borderColorFocus: componentTokens.defaultBorderColorFocus.light,
    textColor: componentTokens.disabledTextColor.light,
  },
  dark: {
    backgroundColor: componentTokens.defaultBackgroundColor.dark,
    backgroundColorFocus: componentTokens.disabledBackgroundColor.dark,
    backgroundColorHover: componentTokens.disabledBackgroundColor.dark,
    borderColor: componentTokens.defaultBorderColor.dark,
    borderColorFocus: componentTokens.defaultBorderColorFocus.dark,
    textColor: componentTokens.disabledTextColor.dark,
  },
};
const invalidRules = {
  light: {
    backgroundColor: componentTokens.defaultBackgroundColor.light,
    backgroundColorFocus: componentTokens.defaultBackgroundColorFocus.light,
    backgroundColorHover: componentTokens.defaultBackgroundColorHover.light,
    borderColor: componentTokens.invalidBorderColor.light,
    borderColorFocus: componentTokens.defaultBorderColorFocus.light,
  },
  dark: {
    backgroundColor: componentTokens.defaultBackgroundColor.dark,
    backgroundColorFocus: componentTokens.defaultBackgroundColorFocus.dark,
    backgroundColorHover: componentTokens.defaultBackgroundColorHover.dark,
    borderColor: componentTokens.invalidBorderColor.dark,
    borderColorFocus: componentTokens.defaultBorderColorFocus.dark,
  },
};
const backgroundColor = {
  standard: componentTokens.defaultBackgroundColor,
  subtle: componentTokens.transparent,
  none: componentTokens.transparent,
};
const backgroundColorFocus = {
  standard: componentTokens.defaultBackgroundColorFocus,
  subtle: componentTokens.defaultBackgroundColorFocus,
  none: componentTokens.transparent,
};
const backgroundColorHover = {
  standard: componentTokens.defaultBackgroundColorHover,
  subtle: componentTokens.defaultBackgroundColorHover,
  none: componentTokens.transparent,
};
const borderColor = {
  standard: componentTokens.defaultBorderColor,
  subtle: componentTokens.transparent,
  none: componentTokens.transparent,
};
const borderColorFocus = {
  standard: componentTokens.defaultBorderColorFocus,
  subtle: componentTokens.defaultBorderColorFocus,
  none: componentTokens.transparent,
};

const getContainerBackgroundColor = ({
  appearance,
  isFocused,
  isHovered,
  isDisabled,
  isInvalid,
  mode,
}: ThemeProps) => {
  if (isDisabled) {
    // switch on focus then switch on hover
    if (isFocused) {
      return {
        backgroundColor: disabledRules[mode].backgroundColorFocus,
      };
    }

    if (isHovered) {
      return {
        backgroundColor: disabledRules[mode].backgroundColorHover,
      };
    }
    return {
      backgroundColor: disabledRules[mode].backgroundColor,
    };
  } else if (isInvalid) {
    // switch on focus then switch on hover
    if (isFocused) {
      return {
        backgroundColor: invalidRules[mode].backgroundColorFocus,
      };
    }

    if (isHovered) {
      return {
        backgroundColor: invalidRules[mode].backgroundColorHover,
      };
    }
    return {
      backgroundColor: invalidRules[mode].backgroundColor,
    };
  }
  // switch on appearance then focus then switch on hover
  if (isFocused) {
    return {
      backgroundColor: backgroundColorFocus[appearance][mode],
    };
  }

  if (isHovered) {
    return {
      backgroundColor: backgroundColorHover[appearance][mode],
    };
  }
  return {
    backgroundColor: backgroundColor[appearance][mode],
  };
};

const getContainerBorderColor = ({
  appearance,
  isFocused,
  isDisabled,
  isInvalid,
  mode,
}: ThemeProps) => {
  if (isDisabled) {
    // switch on focus then switch on hover
    if (isFocused) {
      return {
        borderColor: disabledRules[mode].borderColorFocus,
      };
    }
    return {
      borderColor: disabledRules[mode].borderColor,
    };
  } else if (isInvalid) {
    // switch on focus then switch on hover
    if (isFocused) {
      return {
        borderColor: invalidRules[mode].borderColorFocus,
      };
    }
    return {
      borderColor: invalidRules[mode].borderColor,
    };
  }
  // switch on appearance then focus then switch on hover
  if (isFocused) {
    return {
      borderColor: borderColorFocus[appearance][mode],
    };
  }
  return {
    borderColor: borderColor[appearance][mode],
  };
};

const getPlaceholderColor = ({ isDisabled, mode }) => {
  return isDisabled
    ? disabledRules[mode].textColor
    : componentTokens.placeholderTextColor[mode];
};

// can't group these placeholder styles into one block because browsers drop
// entire style blocks when any single selector fails to parse
const getPlaceholderStyle = (props: ThemeProps) => ({
  '&::-webkit-input-placeholder': {
    /* WebKit, Blink, Edge */
    color: getPlaceholderColor(props),
  },
  '&::-moz-placeholder': {
    /* Mozilla Firefox 19+ */
    color: getPlaceholderColor(props),
    opacity: 1,
  },
  '&::-ms-input-placeholder': {
    /* Microsoft Edge */
    color: getPlaceholderColor(props),
  },
  '&:-ms-input-placeholder': {
    /* Internet Explorer 10-11 */
    color: getPlaceholderColor(props),
  },
});

const getMaxWidth = ({ width }) => {
  if (!width) return `100%`;
  switch (width) {
    case 'xsmall':
      return '80px';
    case 'small':
      return '160px';
    case 'medium':
      return '240px';
    case 'large':
      return '320px';
    case 'xlarge':
      return '480px';
    default:
      return `${width}px`;
  }
};

export type ThemeAppearance = 'subtle' | 'standard' | 'none';
export type ThemeProps = {
  appearance: ThemeAppearance,
  isDisabled: boolean,
  isInvalid: boolean,
  isFocused: boolean,
  isHovered: boolean,
  isMonospaced: boolean,
  isCompact: boolean,
  mode: 'dark' | 'light',
  width?: string | number,
};
export type ThemeTokens = {
  container: Object,
  input: Object,
};

export const Theme = createTheme<ThemeTokens, ThemeProps>(props => ({
  container: {
    alignItems: 'center',
    ...getContainerBackgroundColor(props),
    ...getContainerBorderColor(props),
    borderRadius: '3px',
    borderWidth: '2px',
    borderStyle: props.appearance === 'none' ? 'none' : 'solid',
    boxSizing: 'border-box',
    color: props.isDisabled
      ? disabledRules[props.mode].textColor
      : componentTokens.textColor[props.mode],
    display: 'flex',
    flex: '1 1 100%',
    fontSize: `${fontSize()}px`,
    justifyContent: 'space-between',
    maxWidth: getMaxWidth(props),
    overflow: 'hidden',
    transition: `background-color 0.2s ease-in-out, border-color 0.2s ease-in-out`,
    wordWrap: 'break-word',
    verticalAlign: 'top',
    pointerEvents: props.isDisabled ? 'none' : 'auto',
    padding: `${props.isCompact ? gridSize() / 2 : gridSize()}px ${gridSize() -
      2}px`,
  },
  input: {
    backgroundColor: 'transparent',
    border: 0,
    padding: 0,
    boxSizing: 'border-box',
    color: 'inherit',
    cursor: 'inherit',
    fontFamily: props.isMonospaced ? codeFontFamily() : 'inherit',
    fontSize: `${fontSize()}px`,
    minWidth: '0',
    outline: 'none',
    width: '100%',
    lineHeight: (gridSize() * 2.5) / fontSize(),
    '&[disabled]': {
      // Safari puts on some difficult to remove styles, mainly for disabled inputs
      // but we want full control so need to override them in all cases
      '-webkit-text-fill-color': 'unset',
      '-webkit-opacity': 1,
    },
    '&::-ms-clear': {
      display: 'none',
    },
    '&:invalid': {
      boxShadow: 'none',
    },
    ...getPlaceholderStyle(props),
  },
}));

export const themeTokens = {
  backgroundColor,
  backgroundColorFocus,
  backgroundColorHover,
  borderColor,
  borderColorFocus,
  placeholderTextColor: componentTokens.placeholderTextColor,
  textColor: componentTokens.textColor,
  invalidRules,
  disabledRules,
};
