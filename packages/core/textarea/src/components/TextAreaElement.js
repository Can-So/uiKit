// @flow
import React, { Component, type ElementRef } from 'react';
import AutoResize from './AutoResize';

type Props = {
  innerRef?: (ElementRef<*>) => void,
  resize?: 'auto' | 'vertical' | 'horizontal' | 'smart' | 'none',
  /** The value of the text-area. */
  value?: string | number,
  /** The default value of the text-area */
  defaultValue: string | number,
  /** Handler to be called when the input changes. */
  onChange?: (event: SyntheticInputEvent<HTMLTextAreaElement>) => void,
};

type State = {
  value: string | number,
  isFocused: boolean,
};

export default class FTextArea extends Component<Props, State> {
  static defaultProps = {
    defaultValue: '',
  };

  state = {
    isFocused: false,
    value:
      this.props.value !== undefined
        ? this.props.value
        : this.props.defaultValue,
  };

  getValue = () => {
    return this.props.value !== undefined ? this.props.value : this.state.value;
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

  handleTextAreaRef = (
    textAreaRef: ElementRef<*>,
    refFn: (ElementRef<*>) => void = () => {},
  ) => {
    refFn(textAreaRef);
    if (typeof this.props.innerRef === 'function') {
      this.props.innerRef(textAreaRef);
    }
  };

  render() {
    const { resize, defaultValue, ...props } = this.props;
    const value = this.getValue();
    if (resize === 'smart')
      return (
        <AutoResize value={value}>
          {(height, ref) => (
            <textarea
              {...props}
              ref={textAreaRef => this.handleTextAreaRef(textAreaRef, ref)}
              style={{ height }}
              value={value}
              onChange={this.handleOnChange}
            />
          )}
        </AutoResize>
      );
    return (
      <textarea
        ref={this.handleTextAreaRef}
        {...props}
        value={value}
        onChange={this.handleOnChange}
      />
    );
  }
}
