import { TextFieldThemeProps, TextFieldStyleProps } from './types';
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
      invalid: colors['red-500'],
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
    color: colors.N200,
  },
};

export function applyPropertyStyle(
  property: keyof TextFieldStyleProps,
  { appearance = 'default', ...props }: TextFieldThemeProps,
  baseThemeStyles: TextFieldStyleProps,
) {
  const propertyStyles: any = textFieldNachosTheme[property];
  if (!propertyStyles) {
    return 'initial';
  }

  // Check for relevant fallbacks.
  // This will fall back to the ADG theme if there is an appearance
  // that is not in the styles map, or if there are no styles for
  // for a default appearance
  if (!propertyStyles[appearance] || !propertyStyles['default']) {
    return baseThemeStyles[property] ? baseThemeStyles[property] : 'initial';
  }

  const { isDisabled, isInvalid, isFocused, isHovered } = props;

  let appearanceStyle = propertyStyles[appearance]['idle'];
  // least to most important precedence
  if (isHovered) {
    appearanceStyle = propertyStyles[appearance].hover;
  }
  if (isFocused) {
    appearanceStyle = propertyStyles[appearance].focus;
  }
  if (isInvalid) {
    appearanceStyle = propertyStyles[appearance].invalid;
  }
  if (isDisabled) {
    appearanceStyle = propertyStyles[appearance].disabled;
  }

  return appearanceStyle;
}

const getTextFieldStyles = (
  adgContainerStyles: TextFieldStyleProps,
  props: TextFieldThemeProps,
) => {
  return {
    borderColor: applyPropertyStyle('borderColor', props, adgContainerStyles),
    backgroundColor: applyPropertyStyle(
      'backgroundColor',
      props,
      adgContainerStyles,
    ),
    color: applyPropertyStyle('color', props, adgContainerStyles),
    cursor: applyPropertyStyle('cursor', props, adgContainerStyles),
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
        color: textFieldNachosTheme.placeholder!.color,
      },
    },
  };
};

export default theme;
