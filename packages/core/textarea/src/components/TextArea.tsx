// @flow
import * as React from 'react';
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
import { theme as defaultTheme, ThemeProps } from '../theme';
import { TextAreaWrapper } from '../styled';
import TextareaElement from './TextAreaElement';
import { withDefaultProps, PropsOf } from '@atlaskit/type-helpers';

export type Props = {
  /**
   * controls the appearance of the field.
   * subtle shows styling on hover.
   * none prevents all field styling.
   */
  appearance: 'standard' | 'subtle' | 'none';
  /** Set whether the fields should expand to fill available horizontal space. */
  isCompact?: boolean;
  /** Sets the field as uneditable, with a changed hover state. */
  isDisabled?: boolean;
  /** If true, prevents the value of the input from being edited. */
  isReadOnly?: boolean;
  /** Set required for form that the field is part of. */
  isRequired?: boolean;
  /** Sets styling to indicate that the input is invalid. */
  isInvalid?: boolean;
  /** The minimum number of rows of text to display */
  minimumRows: number;
  /** The maxheight of the textarea */
  maxHeight: string;
  /** The value of the text-area. */
  value?: string | number;
  /** The default value of the text-area */
  defaultValue?: string | number;
  /** Handler to be called when the input is blurred */
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  /** Handler to be called when the input changes. */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  /** Handler to be called when the input is focused */
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
  /** Sets content text value to monospace */
  isMonospaced?: boolean;
  /**
   * Enables the resizing of the textarea:
   * auto: both directions.
   * horizontal: only along the x axis.
   * vertical: only along the y axis.
   * smart (default): vertically grows and shrinks the textarea automatically to wrap your input text.
   * none: explicitly disallow resizing on the textarea.
   */
  resize: 'auto' | 'vertical' | 'horizontal' | 'smart' | 'none';
  /** The theme function TextArea consumes to derive theming constants for use in styling its components */
  theme: <T extends ThemeProps>(theme: ThemeProps) => T;
  /**
   * Ref used to access the textarea dom element. NOTE we expose this via forwardRef,
   * so you can also use the ref prop of this component to the same effect.
   */
  forwardedRef: (elem: HTMLTextAreaElement | null) => void;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type State = {
  isFocused: boolean;
};

const defaultProps: Pick<
  Props,
  | 'resize'
  | 'appearance'
  | 'isCompact'
  | 'isReadOnly'
  | 'isRequired'
  | 'isDisabled'
  | 'isInvalid'
  | 'isMonospaced'
  | 'minimumRows'
  | 'maxHeight'
  | 'theme'
  | 'forwardedRef'
> = {
  resize: 'smart',
  appearance: 'standard',
  isCompact: false,
  isRequired: false,
  isReadOnly: false,
  isDisabled: false,
  isInvalid: false,
  isMonospaced: false,
  minimumRows: 1,
  maxHeight: '50vh',
  theme: defaultTheme,
  forwardedRef: () => {},
};

class TextAreaWithoutForwardRef extends React.Component<Props, State> {
  state = {
    isFocused: false,
  };

  handleOnBlur: React.FocusEventHandler<HTMLTextAreaElement> = event => {
    const { onBlur } = this.props;
    this.setState({ isFocused: false });
    if (onBlur) {
      onBlur(event);
    }
  };

  handleOnFocus: React.FocusEventHandler<HTMLTextAreaElement> = event => {
    const { onFocus } = this.props;
    this.setState({ isFocused: true });
    if (onFocus) {
      onFocus(event);
    }
  };

  render() {
    const {
      // @ts-ignore
      createAnalyticsEvent,
      appearance,
      resize,
      isCompact,
      isDisabled,
      isInvalid,
      isReadOnly,
      isMonospaced,
      isRequired,
      minimumRows,
      maxHeight,
      theme,
      forwardedRef,
      defaultValue,
      ...props
    } = this.props;

    const { isFocused } = this.state;

    return (
      <Theme values={theme}>
        {themeInContext => (
          <TextAreaWrapper
            resize={resize}
            maxHeight={maxHeight}
            appearance={appearance}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            isMonospaced={isMonospaced}
            isFocused={isFocused}
            isInvalid={isInvalid}
            minimumRows={minimumRows}
            {...themeInContext.textArea({ appearance, isCompact })}
          >
            <TextareaElement
              {...props}
              defaultValue={defaultValue ? `${defaultValue}` : undefined}
              forwardedRef={forwardedRef}
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

const DefaultedTextAreaWithoutForwardRef = withDefaultProps(
  defaultProps,
  TextAreaWithoutForwardRef,
);

// $ExpectError flow-bin v0.74.0 doesn't know about forwardRef.
const TextArea = React.forwardRef((props, ref) => (
  // Once Extract React Types is fixed to read from default exports we can
  // move textareaRef instantiation to after the spread.
  // as of now we do this to reduce the chance of users being misled into a breaking configuration
  // by our documentat.
  <DefaultedTextAreaWithoutForwardRef
    forwardedRef={ref as Props['forwardedRef']}
    {...props}
  />
)) as typeof DefaultedTextAreaWithoutForwardRef;

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
  })(TextArea as React.ComponentClass<PropsOf<typeof TextArea>>),
);
