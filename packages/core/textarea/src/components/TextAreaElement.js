// @flow
import React, { Component, type ElementRef } from 'react';

type Props = {
  innerRef?: (ElementRef<*>) => void,
  resize?: 'auto' | 'vertical' | 'horizontal' | 'smart' | 'none',
  // /** The value of the text-area. */
  // value?: string | number,
  // /** The default value of the text-area */
  // defaultValue?: string | number,
  /** Handler to be called when the input changes. */
  onChange?: (event: SyntheticInputEvent<HTMLTextAreaElement>) => void,
};

type State = {
  height: string,
};

export default class FTextArea extends Component<Props, State> {
  textareaRef = React.createRef();

  state = {
    height: '100%',
  };

  componentDidMount() {
    if (this.props.resize === 'smart' && this.textareaRef.current) {
      this.setState({
        // eslint-disable-line
        height: `${this.textareaRef.current.scrollHeight}px`,
      });
    }
  }

  handleOnChange = (event: SyntheticInputEvent<HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    if (this.props.resize === 'smart') {
      this.setState(
        {
          height: 'auto',
        },
        () => {
          if (this.props.resize === 'smart' && this.textareaRef.current) {
            this.setState({
              height: `${this.textareaRef.current.scrollHeight}px`,
            });
          }
        },
      );
    }

    if (onChange) {
      onChange(event);
    }
  };

  render() {
    const { resize, innerRef, ...props } = this.props;

    const { height } = this.state;
    if (resize === 'smart') {
      return (
        <textarea
          {...props}
          onChange={this.handleOnChange}
          ref={this.textareaRef}
          style={{ height }}
        />
      );
    }
    return <textarea style={{ height: '100%' }} {...props} />;
  }
}
