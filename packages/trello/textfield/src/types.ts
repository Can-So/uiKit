export type TextFieldAppearance = 'default' | 'none' | 'transparent' | 'blue';
export type TextFieldStyleState = 'idle' | 'hover' | 'focus';
export type TextFieldStyleAppearance = TextFieldAppearance | 'disabled';

export type TextFieldThemeStyles = {
  container?: TextFieldStyleProps;
  input?: TextFieldStyleProps;
};

export type TextFieldStyleMap =
  | string
  | Object
  | {
      [index: string]: string;
    }
  | {
      [appearance in TextFieldStyleAppearance]: {
        [state in TextFieldStyleState]?: string
      }
    }
  | undefined;

export type TextFieldStyleProps = {
  backgroundColor?: TextFieldStyleMap;
  borderColor?: TextFieldStyleMap;
  color?: TextFieldStyleMap;
  cursor?: TextFieldStyleMap;
  padding?: string | number;
  lineHeight?: string | number;
  placeholder?: { [key: string]: string };
};

export type TextFieldThemeProps = {
  /** Controls the appearance of the field.
   * `transparent` has transparent background.
   * `none` hides all field styling.
   */
  appearance?: TextFieldAppearance;
  /** Applies compact styling, making the field smaller */
  isCompact?: boolean;
  /** Sets the field as uneditable, with a changed hover state. */
  isDisabled?: boolean;
  /** Sets styling to indicate that the input is focused. */
  isFocused?: boolean;
  /** Sets styling to indicate that the input is invalid */
  isInvalid?: boolean;
  /** Sets styling to indicate that the input is hovered */
  isHovered?: boolean;
  /** Sets content text value to monospace */
  isMonospaced?: boolean;
  mode?: 'dark' | 'light';
  /** Sets maximum width of input */
  width?: string | number;
};

export type TextFieldProps = TextFieldThemeProps & {
  /** Sets a default value as input value */
  defaultValue?: string;
  /** If true, prevents the value of the input from being edited. */
  isReadOnly?: boolean;
  /** Set required for form that the field is part of. */
  isRequired?: boolean;
  /** Handler to be called when the input loses focus. */
  onBlur?: (e: React.SyntheticEvent) => void;
  /** Handler to be called when the input receives focus. */
  onFocus?: (e: React.SyntheticEvent) => void;
  /** The value of the input. */
  value?: string | number;
  /** Forwarded ref */
  forwardedRef?: HTMLInputElement;
  /** The theme the component should use. */
  theme?: (props: TextFieldThemeProps) => TextFieldThemeStyles;
};
