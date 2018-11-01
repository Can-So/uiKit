// @flow
import React, { Component } from 'react';
import { Wrapper, TextAreaWrapper } from '../styled';

type Props = {
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
  minimumRows?: number,
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
};
type State = {
  value: string | number,
  isFocused: boolean,
};

export default class TextArea extends Component<Props, State> {
  static defaultProps = {
    appearance: 'standard',
    isCompact: false,
    isRequired: false,
    isReadOnly: false,
    isDisabled: false,
    isMonospaced: false,
    minimumRows: 1,
  };
  state = {
    isFocused: false,
    value: this.props.defaultValue || '',
  };
  getValue = () => {
    return this.props.value || this.state.value;
  };
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
  handleOnChange = (event: SyntheticInputEvent<HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    this.setState({
      value: event.currentTarget.value,
    });
    if (onChange) {
      onChange(event);
    }
  };
  render() {
    const {
      appearance,
      size,
      isCompact,
      isDisabled,
      isReadOnly,
      isMonospaced,
      isRequired,
      minimumRows,
      ...props
    } = this.props;

    const { isFocused } = this.state;

    return (
      <Wrapper isCompact={isCompact} size={size}>
        <TextAreaWrapper
          appearance={appearance}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          isMonospaced={isMonospaced}
          isFocused={isFocused}
          minimumRows={minimumRows}
        >
          <textarea
            {...props}
            disabled={isDisabled}
            readOnly={isReadOnly}
            required={isRequired}
            value={this.getValue()}
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            onChange={this.handleOnChange}
          />
        </TextAreaWrapper>
      </Wrapper>
    );
  }
}
