import { ThemeProps } from '@atlaskit/textfield';
import {
  TextFieldThemeProps,
  TextFieldThemeStyles,
  TextFieldStyleProps,
} from './types';
import { colors } from './colors';

const textFieldNachosTheme: TextFieldStyleProps = {
  backgroundColor: {
    default: {
      idle: colors.N10,
      hover: colors.N30,
      focus: colors.N0,
      disabled: colors.N30,
    },
    transparent: {
      idle: 'transparent',
    },
  },
  borderColor: {
    default: {
      idle: colors.N40,
      hover: colors.N40,
      focus: colors['blue-500'],
      disabled: colors.N30,
    },
  },
  color: {
    default: {
      idle: colors.N800,
      disabled: colors.N70,
    },
  },
  padding: '6px 10px',
  lineHeight: '20px',
  cursor: {
    default: 'initial',
    disabled: 'not-allowed',
  },
  placeholder: {
    color: 'blue',
  },
};

export function applyPropertyStyle(
  property: keyof TextFieldStyleProps,
  { appearance = 'default', ...props }: TextFieldThemeProps,
  baseThemeStyles,
) {
  const propertyStyles = textFieldNachosTheme[property];
  if (!propertyStyles) return 'initial';

  // Check for relevant fallbacks.
  // This will fall back to the ADG theme if there is an appearance
  // that is not in the styles map, or if there are no styles for
  // for a default appearance
  if (!propertyStyles[appearance] || !propertyStyles['default']) {
    return baseThemeStyles[property] ? baseThemeStyles[property] : 'initial';
  }

  const { isDisabled, isInvalid, isFocused, isHovered } = props;

  let appearanceStyle = propertyStyles[appearance]['idle'];
  if (isDisabled) appearanceStyle = propertyStyles[appearance].disabled;
  if (isInvalid) appearanceStyle = '';
  if (isFocused) appearanceStyle = propertyStyles[appearance].focus;
  if (isHovered) appearanceStyle = propertyStyles[appearance].hover;

  // if (!stateStyles) return 'inherit';
  return appearanceStyle;
}

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
      applyPropertyStyle('borderColor', props, adgContainerStyles) ||
      adgContainerStyles.borderColor,
    backgroundColor:
      applyPropertyStyle('backgroundColor', props, adgContainerStyles) ||
      adgContainerStyles.backgroundColor,
    color:
      getColor(textFieldNachosTheme.color, props) || adgContainerStyles.color,
    cursor: getCursor(textFieldNachosTheme.cursor, props),
    lineHeight: textFieldNachosTheme.lineHeight,
    padding: textFieldNachosTheme.padding,
  };
};

const theme = (adgTheme: Function, themeProps: TextFieldThemeProps) => {
  const { container: adgContainerStyles, input: adgInputStyles } = adgTheme(
    themeProps,
  );

  return {
    container: {
      ...adgContainerStyles,
      ...getTextFieldStyles(adgContainerStyles, themeProps),
    },
    input: {
      ...adgInputStyles,
      // hack to style the placeholder, this overwrites the pseudoselector
      // being used in ADG Textfield Theme
      '&::placeholder': {
        color: textFieldNachosTheme.placeholder.color,
      },
    },
  };
};

export default theme;
