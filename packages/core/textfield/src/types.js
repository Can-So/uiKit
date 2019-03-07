// @flow

import type { ThemeProp } from '@atlaskit/theme';
import type { ElementRef } from 'react';
import type { ThemeProps, ThemeTokens } from './theme';

export type InputProps = {
  /** Controls the appearance of the field.
   * `subtle` shows styling on hover.
   * `none` hides all field styling.
   */
  appearance?: 'standard' | 'none' | 'subtle',
  /** Set whether the fields should expand to fill available horizontal space. */
  isCompact?: boolean,
  /** Sets the field as uneditable, with a changed hover state. */
  isDisabled?: boolean,
  /** Sets styling to indicate that the input is focused. */
  isFocused?: boolean,
  /** Sets styling to indicate that the input is invalid */
  isInvalid?: boolean,
  /** Sets content text value to monospace */
  isMonospaced?: boolean,
  /** If true, prevents the value of the input from being edited. */
  isReadOnly?: boolean,
  /** Add asterisk to label. Set required for form that the field is part of. */
  isRequired?: boolean,
  /** Forwarded ref */
  forwardedRef: ElementRef<*>,
  theme: ThemeTokens,
};

export type TextFieldProps = {
  /** Controls the appearance of the field.
   * `subtle` shows styling on hover.
   * `none` hides all field styling.
   */
  appearance: 'standard' | 'none' | 'subtle',
  /** This prop is injected by analytics-next and has no use within textfield */
  createAnalyticsEvent: (SyntheticEvent<>) => void,
  /** Sets a default value as input value */
  defaultValue?: string,
  /** Applies compact styling, making the field smaller */
  isCompact: boolean,
  /** Sets the field as uneditable, with a changed hover state. */
  isDisabled: boolean,
  /** Sets styling to indicate that the input is focused. */
  isFocused: boolean,
  /** Sets styling to indicate that the input is invalid */
  isInvalid: boolean,
  /** Sets content text value to monospace */
  isMonospaced: boolean,
  /** If true, prevents the value of the input from being edited. */
  isReadOnly?: boolean,
  /** Set required for form that the field is part of. */
  isRequired?: boolean,
  /** Handler to be called when the input loses focus. */
  onBlur?: (e: SyntheticEvent<>) => mixed,
  /** Handler to be called when the input receives focus. */
  onFocus?: (e: SyntheticEvent<>) => mixed,
  /** Sets maximum width of input */
  width?: string | number,
  /** The value of the input. */
  value?: string | number,
  /** This is an internal prop. Use "ref" prop to get a reference to input element. */
  forwardedRef: ElementRef<*>,
  /** The theme the component should use. */
  theme?: ThemeProp<ThemeTokens, ThemeProps>,
};
