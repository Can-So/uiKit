// @flow
export type Props = {
  /** The size of the icon, uses the same sizing scheme as in @atlaskit/icon */
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge',
  /** CSS color to be applied to the wordmark portion of the logo SVG */
  textColor?: string,
  /** CSS color to be applied to the non-gradient icon portion of the logo SVG */
  iconColor?: string,
  /** CSS color to start the gradient/shadow on the icon */
  iconGradientStart?: string,
  /** CSS color to end the gradient/shadow on the icon. Should usually match iconColor to avoid
   * rendering issues in some browsers such as Safari. */
  iconGradientStop?: string,
  /** Accessible text to be used for screen readers */
  label?: string,
};

export const DefaultProps = {
  iconColor: 'inherit',
  textColor: 'currentColor',
  iconGradientStart: 'inherit',
  iconGradientStop: 'inherit',
  size: 'medium',
};

export const sizes = {
  xsmall: 16,
  small: 24,
  medium: 32,
  large: 40,
  xlarge: 48,
};
