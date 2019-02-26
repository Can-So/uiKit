import { ThemeProps } from '@atlaskit/textfield';
import {
  TextFieldThemeProps,
  TextFieldThemeStyles,
  TextFieldStyleProps,
} from './types';
import { colors } from './colors';

const textField: TextFieldStyleProps = {
  backgroundColor: {
    default: {
      idle: colors.N10,
      hover: colors.N30,
      focus: colors.N0,
    },
    disabled: colors.N30,
  },
  borderColor: {
    default: {
      idle: colors.N40,
      hover: colors.N40,
      focus: colors['blue-500'],
    },
    disabled: colors.N30,
  },
  color: {
    default: {
      idle: colors.N800,
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
    return backgroundColor.default['idle'];
  }
  return backgroundColor[appearance]['idle'];
};

const getBorderColor = (
  borderColor,
  { appearance, isDisabled, isFocused, isInvalid }: TextFieldThemeProps,
) => {
  if (!borderColor[appearance]) {
    return borderColor.default['idle'];
  }

  if (isDisabled) return borderColor.disabled;
  if (isFocused) return borderColor[appearance].focus;
  if (isInvalid) return;

  return borderColor[appearance]['idle'];
};

const getColor = (color, { appearance, state, isDisabled }) => {
  if (isDisabled) return color.disabled;
  if (appearance === 'default') {
    if (!color[appearance][state]) {
      return color.default.idle;
    }
    return color[appearance][state];
  }
  if (!color[appearance]) {
    return color.default.idle;
  }
  return color[appearance];
};

const getCursor = (cursor, { isDisabled }) => {
  if (isDisabled) return cursor.disabled;
  return cursor.default;
};

const getTextFieldStyles = (
  adgContainerStyles: TextFieldStyleProps,
  props: TextFieldThemeProps,
) => {
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

const theme = (adgTheme: Function, themeProps: TextFieldThemeProps) => {
  const { container: adgContainerStyles, input: adgInputStyles } = adgTheme(
    themeProps,
  );

  console.log('in theme', themeProps.appearance);

  return {
    container: {
      ...adgContainerStyles,
      ...getTextFieldStyles(adgContainerStyles, themeProps),
    },
    input: {
      ...adgInputStyles,
    },
  };
};

export default theme;
