// @flow
import React, { Component, type ElementRef } from 'react';
import { Theme } from '@atlaskit/theme';
import textAreaTheme, { type ThemeProps } from '../theme';
import { TextAreaWrapper } from '../styled';
import Textarea from './TextArea';

type Props = {
  resize: 'auto' | 'vertical' | 'horizontal' | 'smart',
  appearance: string,
  /** Set whether the fields should expand to fill available horizontal space. */
  isCompact?: boolean,
  /** Sets the field as uneditable, with a changed hover state. */
  isDisabled?: boolean,
  /** If true, prevents the value of the input from being edited. */
  isReadOnly?: boolean,
  /** Add asterisk to label. Set required for form that the field is part of. */
  isRequired?: boolean,
  /** Sets styling to indicate that the input is invalid. */
  isInvalid?: boolean,
  /** The minimum number of rows of text to display */
  minimumRows: number,
  /** The value of the text-area. */
  value?: string | number,
  /** The default value of the text-area */
  defaultValue?: string | number,
  /** Handler to be called when the input is blurred */
  onBlur?: (event: SyntheticInputEvent<HTMLTextAreaElement>) => void,
  /** Handler to be called when the input changes. */
  onChange?: (event: SyntheticInputEvent<HTMLTextAreaElement>) => void,
  /** Handler to be called when the input is focused */
  onFocus?: (event: SyntheticInputEvent<HTMLTextAreaElement>) => void,
  /** Sets content text value to monospace */
  isMonospaced?: boolean,
  size?: string | number,
  theme: ThemeProps => ThemeProps,
};
type State = {
  value: string | number,
  isFocused: boolean,
  height?: number,
};

export default class ThemedTextArea extends Component<Props, State> {
  static defaultProps = {
    resize: 'smart',
    appearance: 'standard',
    isCompact: false,
    isRequired: false,
    isReadOnly: false,
    isDisabled: false,
    isMonospaced: false,
    minimumRows: 4,
    theme: textAreaTheme,
  };
  state = {
    height: undefined,
    isFocused: false,
    value: this.props.defaultValue || '',
  };
  textArea: ElementRef<*>;
  hiddenTextArea: ElementRef<*>;
  elementRef: ElementRef<*> = {};

  handleOnBlur = (event: SyntheticInputEvent<HTMLTextAreaElement>) => {
    const { onBlur } = this.props;
    this.setState({ isFocused: false });
    if (onBlur) {
      onBlur(event);
    }
  };

  handleOnFocus = (event: SyntheticInputEvent<HTMLTextAreaElement>) => {
    const { onFocus } = this.props;
    this.setState({ isFocused: true });
    if (onFocus) {
      onFocus(event);
    }
  };

  render() {
    const {
      appearance,
      resize,
      size,
      isCompact,
      isDisabled,
      isReadOnly,
      isMonospaced,
      isRequired,
      minimumRows,
      theme,
      ...props
    } = this.props;

    const { isFocused } = this.state;

    return (
      <Theme values={theme}>
        {themeInContext => (
          <TextAreaWrapper
            {...themeInContext.textArea({ appearance, isCompact })}
            resize={resize}
            appearance={appearance}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            isMonospaced={isMonospaced}
            isFocused={isFocused}
            minimumRows={minimumRows}
          >
            <Textarea
              {...props}
              resize={resize}
              disabled={isDisabled}
              readOnly={isReadOnly}
              required={isRequired}
              onFocus={this.handleOnFocus}
              onBlur={this.handleOnBlur}
            />
          </TextAreaWrapper>
        )}
      </Theme>
    );
  }
}
