// @flow
/* eslint-disable react/no-multi-comp */
import styled from 'styled-components';
import React, { type ElementRef } from 'react';
import Button from '@atlaskit/button';
import Form, { Field, FormFooter } from '../src';

type BaseInputProps = {
  /** Controls appearance of field. subtle shows styling on hover. none prevents all field styling. */
  appearance?: 'standard' | 'subtle' | 'none',
  /** The default value of the input */
  defaultValue?: string | number,
  /** Forwarded ref */
  forwardedRef: ElementRef<*>,

  /** Set whether the fields should expand to fill available horizontal space. */
  isCompact?: boolean,
  /** Sets the field as uneditable, with a changed hover state. */
  isDisabled?: boolean,
  /** Sets styling to indicate that the input is invalid */
  isInvalid?: boolean,
  /** Sets content text value to monospace */
  isMonospaced?: boolean,
  /** If true, prevents the value of the input from being edited. */
  isReadOnly?: boolean,
  /** Add asterisk to label. Set required for form that the field is part of. */
  isRequired?: boolean,

  /** Handler to be called when the input is blurred */
  onBlur?: (event: SyntheticInputEvent<HTMLTextAreaElement>) => void,
  /** Handler to be called when the input changes. */
  onChange?: (event: SyntheticInputEvent<HTMLTextAreaElement>) => void,
  /** Handler to be called when the input is focused */
  onFocus?: (event: SyntheticInputEvent<HTMLTextAreaElement>) => void,

  /** The value of the input. */
  value?: string | number,
};

type InputProps = BaseInputProps & {
  /** Sets styling to indicate that the input is focused. */
  isFocused?: boolean,
  /** If true, prevents the value of the input from being edited. */
  isReadOnly?: boolean,
};

type TextAreaProps = BaseInputProps & {
  /** The minimum number of rows of text to display */
  minimumRows: number,
  /** The maxheight of the textarea */
  maxHeight: string,
  /**
   * Enables the resizing of the textarea:
   * auto: both directions.
   * horizontal: only along the x axis.
   * vertical: only along the y axis.
   * smart (default): vertically grows and shrinks the textarea automatically to wrap your input text.
   * none: explicitly disallow resizing on the textarea.
   */
  resize: 'auto' | 'vertical' | 'horizontal' | 'smart' | 'none',
  /** Ref used to access the textarea dom element. NOTE we expose this via forwardRef,
   so you can also use the ref prop of this component to the same effect. */
  forwardedRef: (HTMLTextAreaElement | null) => void,
};

const lineHeight = 20;
const TextAreaWrapper = styled.div`
  flex: 1 1 100%;
  position: relative;
  box-sizing: border-box;
  overflow: auto;
  word-wrap: break-word;
  max-height: ${props => props.maxHeight};
  max-width: 100%;
  line-height: ${lineHeight}px;
  resize: ${props => props.resize};
  & > textarea {
    display: block;
    resize: none;
    background: transparent;
    box-sizing: border-box;
    cursor: inherit;
    min-width: 0;
    min-height: ${props => props.minimumRows * lineHeight}px;
    outline: none;
    overflow: auto;
    max-width: 100%;
    width: 100%;
  }
`;

class MyInputField extends React.Component<InputProps> {
  static defaultProps = {
    forwardedRef: () => {},
  };

  render() {
    const {
      forwardedRef,
      isDisabled,
      isReadOnly,
      isRequired,

      // these are not used in this component but don't pass them directly to the DOM element
      isCompact,
      isInvalid,
      isMonospaced,
      isFocused,

      ...props
    } = this.props;
    return (
      <input
        ref={forwardedRef}
        disabled={isDisabled}
        readOnly={isReadOnly}
        required={isRequired}
        {...props}
      />
    );
  }
}

class MyTextArea extends React.Component<TextAreaProps> {
  static defaultProps = {
    forwardedRef: () => {},
  };

  render() {
    const {
      forwardedRef,
      isDisabled,
      isReadOnly,
      isRequired,
      resize,
      maxHeight,
      minimumRows,

      // these are not used in this component but don't pass them directly to the DOM element
      isCompact,
      isInvalid,
      isMonospaced,

      ...props
    } = this.props;
    return (
      // N.B. here we're only using resize and maxHeight for styling
      // so only pass those to the styled component
      <TextAreaWrapper
        {...props}
        resize={resize}
        maxHeight={maxHeight}
        minimumRows={minimumRows}
      >
        <textarea
          ref={forwardedRef}
          disabled={isDisabled}
          readOnly={isReadOnly}
          required={isRequired}
          {...props}
        />
      </TextAreaWrapper>
    );
  }
}

const ColorButton = ({
  color,
  changeHandler,
}: {
  color: string,
  changeHandler: Function,
}) => {
  return (
    <button
      style={{
        backgroundColor: color,
        color: 'transparent',
        display: 'inline-block',
        height: '40px',
        width: '40px',
        margin: '0 5px',
        overflow: 'hidden',
      }}
      onClick={e => {
        e.preventDefault();
        /*
         * For custom non-form-field fields, the relevant detail of this event handler
         * is that it ends up calling the onChange method that is passed in to the render prop's
         * fieldProps (i.e. fieldProps.onChange). It is called with the new value of the field
         * and that will propagate the value up to the Form and back to the Field.
         */
        changeHandler(color);
      }}
    >
      {color}
    </button>
  );
};

const ColorButtons = ({
  colors,
  changeHandler,
}: {
  colors: Array<string>,
  changeHandler: Function,
}) => (
  <React.Fragment>
    {colors.map(color => (
      <ColorButton color={color} changeHandler={changeHandler} key={color} />
    ))}
  </React.Fragment>
);

export default () => (
  <div
    style={{
      display: 'flex',
      width: '400px',
      margin: '0 auto',
      flexDirection: 'column',
    }}
  >
    <Form onSubmit={data => console.log(data)}>
      {({ formProps }) => (
        <form {...formProps}>
          <Field name="firstname" defaultValue="" label="First name">
            {({ fieldProps }) => <MyInputField {...fieldProps} />}
          </Field>
          <Field name="comments" defaultValue="" label="Additional comments">
            {({ fieldProps }) => (
              <MyTextArea
                minimumRows={4}
                maxHeight="300px"
                resize="auto"
                placeholder="Add your comments..."
                {...fieldProps}
              />
            )}
          </Field>
          <Field name="favourite-color" defaultValue="" label="Favourite color">
            {({ fieldProps }) => (
              <div data-name={fieldProps.id} data-value={fieldProps.value}>
                <p style={{ margin: '10px 0' }}>
                  Selected color:{' '}
                  {fieldProps.value ? (
                    <span style={{ color: fieldProps.value }}>
                      {fieldProps.value}
                    </span>
                  ) : (
                    'none'
                  )}
                </p>
                <ColorButtons
                  colors={['red', 'green', 'orange', 'blue']}
                  changeHandler={fieldProps.onChange}
                />
              </div>
            )}
          </Field>
          <FormFooter>
            <Button type="submit" appearance="primary">
              Submit
            </Button>
          </FormFooter>
        </form>
      )}
    </Form>
  </div>
);
