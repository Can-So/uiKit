import { ThemeProps } from '@atlaskit/button';
import { colors } from './colors';

const textField = {
  backgroundColor: {
    standard: {
      default: colors.N10,
      hover: colors.N30,
      focus: colors.N0,
    },
    disabled: colors.N30,
  },
  borderColor: {
    standard: {
      default: colors.N40,
      hover: colors.N40,
      focus: colors['blue-500'],
    },
    disabled: colors.N30,
  },
  color: {
    default: {
      default: colors.N800,
    },
    disabled: colors.N70,
  },
  padding: '6px 10px',
  lineHeight: '20px',
  cursor: {
    default: 'initial',
    disabled: 'not-allowed',
  },
  placeholderTextColor: colors.N200,
};

const getBackgroundColor = (
  backgroundColor,
  { appearance, isDisabled, isFocused, isInvalid },
) => {
  if (isDisabled) return backgroundColor.disabled;
  if (isFocused) return backgroundColor[appearance].focus;
  if (isInvalid) return;
  if (!backgroundColor[appearance]) {
    return backgroundColor.standard['default'];
  }
  return backgroundColor[appearance]['default'];
};

const getBorderColor = (
  borderColor,
  { appearance, isDisabled, isFocused, isInvalid },
) => {
  if (isDisabled) return borderColor.disabled;
  if (isFocused) return borderColor[appearance].focus;
  if (isInvalid) return;
  if (!borderColor[appearance]) {
    return borderColor.standard['default'];
  }
  return borderColor[appearance]['default'];
};

const getColor = (color, { appearance, state, isDisabled }) => {
  if (isDisabled) return color.disabled;
  if (appearance === 'default') {
    if (!color[appearance][state]) {
      return color.default.default;
    }
    return color[appearance][state];
  }
  if (!color[appearance]) {
    return color.default.default;
  }
  return color[appearance];
};

const getCursor = (cursor, { isDisabled }) => {
  if (isDisabled) return cursor.disabled;
  return cursor.default;
};

const getTextFieldStyles = (adgContainerStyles, props: typeof ThemeProps) => {
  return {
    // the "OR" statement kicks in if the `get` function doesn't return a truthy value
    // this is for the situation where you don't want to change the value
    // of the default theme provided

    borderColor:
      getBorderColor(textField.borderColor, props) ||
      adgContainerStyles.borderColor,
    backgroundColor:
      getBackgroundColor(textField.backgroundColor, props) ||
      adgContainerStyles.backgroundColor,
    color: getColor(textField.color, props) || adgContainerStyles.color,
    cursor: getCursor(textField.cursor, props),
    lineHeight: textField.lineHeight,
    padding: textField.padding,
    placeholderTextColor: textField.placeholderTextColor,
  };
};

const theme = (
  adgTheme: Function,
  { appearance = 'default', state = 'default', ...rest }: typeof ThemeProps,
) => {
  const { container: adgContainerStyles, input: adgInputStyles } = adgTheme({
    appearance,
    state,
    ...rest,
  });

  return {
    container: {
      ...adgContainerStyles,
      ...getTextFieldStyles(adgContainerStyles, { appearance, state, ...rest }),
    },
    input: {
      ...adgInputStyles,
    },
  };
};

export default theme;
