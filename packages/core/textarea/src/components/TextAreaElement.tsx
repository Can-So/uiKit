import * as React from 'react';

type Props = {
  forwardedRef?: (elem: HTMLTextAreaElement | null) => void;
  /**
   * Enables the resizing of the textarea:
   * auto: both directions.
   * horizontal: only along the x axis.
   * vertical: only along the y axis.
   * smart (default): vertically grows and shrinks the textarea automatically to wrap your input text.
   * none: explicitly disallow resizing on the textarea.
   */
  resize?: 'auto' | 'vertical' | 'horizontal' | 'smart' | 'none';
  /** Handler to be called when the input changes. */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type State = {
  height: string;
};

export default class TextAreaElement extends React.Component<Props, State> {
  textareaElement: HTMLTextAreaElement | null = null;

  state = {
    height: '100%',
  };

  componentDidMount() {
    if (this.props.resize === 'smart' && this.textareaElement) {
      // eslint-disable-next-line
      this.setState({
        height: `${this.textareaElement.scrollHeight}px`,
      });
    }
  }

  getTextAreaRef = (ref: HTMLTextAreaElement | null) => {
    this.textareaElement = ref;
    if (this.props.forwardedRef) {
      this.props.forwardedRef(ref);
    }
  };

  handleOnChange: React.ChangeEventHandler<HTMLTextAreaElement> = event => {
    const { onChange } = this.props;
    if (this.props.resize === 'smart') {
      this.setState(
        {
          height: 'auto',
        },
        () => {
          if (this.props.resize === 'smart' && this.textareaElement) {
            this.setState({
              height: `${this.textareaElement.scrollHeight}px`,
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
    const { resize, forwardedRef, ...props } = this.props;
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
