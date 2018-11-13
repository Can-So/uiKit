// @flow
import React, { Component, type ElementRef } from 'react';
import AutoResize from './AutoResize';

type Props = {
  resize?: 'auto' | 'vertical' | 'horizontal' | 'smart',
  /** The value of the text-area. */
  value?: string | number,
  /** The default value of the text-area */
  defaultValue?: string | number,
  /** Handler to be called when the input changes. */
  onChange?: (event: SyntheticInputEvent<HTMLTextAreaElement>) => void,
};

type State = {
  value: string | number,
  isFocused: boolean,
  height?: number,
};

export default class FTextArea extends Component<Props, State> {
  static defaultProps = {
    appearance: 'standard',
    isCompact: false,
    isRequired: false,
    isReadOnly: false,
    isDisabled: false,
    isMonospaced: false,
  };
  state = {
    height: undefined,
    isFocused: false,
    value: this.props.defaultValue || '',
  };
  textArea: ElementRef<*>;
  hiddenTextArea: ElementRef<*>;
  elementRef: ElementRef<*> = {};

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

  render() {
    const { resize, ...props } = this.props;
    const value = this.getValue();
    if (resize === 'smart')
      return (
        <AutoResize value={value}>
          {(height, ref) => (
            <textarea
              {...props}
              innerRef={ref}
              style={{ height }}
              value={value}
              onChange={this.handleOnChange}
            />
          )}
        </AutoResize>
      );
    return <textarea {...props} value={value} onChange={this.handleOnChange} />;
  }
}
