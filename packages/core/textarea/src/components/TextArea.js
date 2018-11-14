// @flow
import React, { Component } from 'react';
import { Theme } from '@atlaskit/theme';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import {
  name as packageName,
  version as packageVersion,
} from '../../package.json';
import { theme as defaultTheme, type ThemeProps } from '../theme';
import { TextAreaWrapper } from '../styled';
import TextareaElement from './TextAreaElement';

type Props = {
  /**
   * controls the appearance of the field.
   * subtle shows styling on hover.
   * none hides all field styling.
   */
  appearance: 'standard' | 'subtle' | 'none',
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
  /**
   * Enables the resizing of the textarea:
   * auto: both directions.
   * horizontal: only along the x axis.
   * vertical: only along the y axis.
   * smart (default): vertically grows and shrinks the textarea automatically to wrap your input text.
   * none: explicitly disallow resizing on the textarea.
   */
  resize: 'auto' | 'vertical' | 'horizontal' | 'smart' | 'none',
  theme: ThemeProps => ThemeProps,
};
type State = {
  isFocused: boolean,
};

class TextArea extends Component<Props, State> {
  static defaultProps = {
    resize: 'smart',
    appearance: 'standard',
    isCompact: false,
    isRequired: false,
    isReadOnly: false,
    isDisabled: false,
    isInvalid: false,
    isMonospaced: false,
    minimumRows: 1,
    theme: defaultTheme,
  };

  state = {
    isFocused: false,
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

  render() {
    const {
      appearance,
      resize,
      isCompact,
      isDisabled,
      isInvalid,
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
            isInvalid={isInvalid}
            minimumRows={minimumRows}
          >
            <TextareaElement
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

export { TextArea as TextAreaWithoutAnalytics };
const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

export default withAnalyticsContext({
  componentName: 'textArea',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnAtlaskit({
      action: 'blurred',
      actionSubject: 'textArea',

      attributes: {
        componentName: 'textArea',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnAtlaskit({
      action: 'focused',
      actionSubject: 'textArea',

      attributes: {
        componentName: 'textArea',
        packageName,
        packageVersion,
      },
    }),
  })(TextArea),
);
