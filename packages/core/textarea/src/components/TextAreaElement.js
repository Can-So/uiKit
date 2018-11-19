// @flow
import React, { Component } from 'react';

type Props = {
  innerRef?: (HTMLTextAreaElement | null) => void,
  /**
   * Enables the resizing of the textarea:
   * auto: both directions.
   * horizontal: only along the x axis.
   * vertical: only along the y axis.
   * smart (default): vertically grows and shrinks the textarea automatically to wrap your input text.
   * none: explicitly disallow resizing on the textarea.
   */
  resize?: 'auto' | 'vertical' | 'horizontal' | 'smart' | 'none',
  /** Handler to be called when the input changes. */
  onChange?: (event: SyntheticInputEvent<HTMLTextAreaElement>) => void,
};

type State = {
  height: string,
};

export default class TextAreaElement extends Component<Props, State> {
  textareaRef: HTMLTextAreaElement | null;

  state = {
    height: '100%',
  };

  componentDidMount() {
    if (this.props.resize === 'smart' && this.textareaRef) {
      // eslint-disable-next-line
      this.setState({
        height: `${this.textareaRef.scrollHeight}px`,
      });
    }
  }

  getTextAreaRef = (ref: HTMLTextAreaElement | null) => {
    this.textareaRef = ref;
    if (this.props.innerRef) {
      this.props.innerRef(ref);
    }
  };

  handleOnChange = (event: SyntheticInputEvent<HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    if (this.props.resize === 'smart') {
      this.setState(
        {
          height: 'auto',
        },
        () => {
          if (this.props.resize === 'smart' && this.textareaRef) {
            this.setState({
              height: `${this.textareaRef.scrollHeight}px`,
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
          ref={this.getTextAreaRef}
          style={{ height }}
        />
      );
    }
    return <textarea style={{ height: '100%' }} {...props} />;
  }
}
