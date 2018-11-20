// @flow
import React, { type Node } from 'react';
import { FormContext, type FieldInfo } from './FormNext';
import FieldWrapper, { Label, RequiredIndicator } from './styled/Field';
import translateEvent from './utils/translateEvent';

type FieldProps = {
  onChange: any => any,
  onBlur: () => any,
  onFocus: () => any,
  value: any,
};

type Meta = {
  dirty: boolean,
  touched: boolean,
  valid: boolean,
  error: any,
  submitError: any,
};

type Props = {
  /* Children to render in the field. Called with form information. */
  children: ({ fieldProps: FieldProps, error: any, meta: Meta }) => Node,
  /* The default value of the field */
  defaultValue: any,
  /* Whether the field is required for submission */
  isRequired?: boolean,
  /* Label displayed above the field */
  label?: Node,
  /* The name of the field */
  name: string,
  /* Ignore this prop. It gets set internally from context. */
  register: FieldInfo => any,
  /* validates the current value of field */
  validate?: any => string | Promise<string> | void,
};

type State = {
  onChange: any => any,
  onBlur: () => any,
  onFocus: () => any,
  dirty: boolean,
  touched: boolean,
  valid: boolean,
  value: any,
  error: any,
  submitError: any,
  registered: boolean,
};

const required = value => (String(value).length === 0 ? 'REQUIRED' : undefined);

const withRequired = validator => value =>
  required(value) || (validator ? validator(value) : undefined);

class FieldInner extends React.Component<Props, State> {
  unregisterField = () => {};
  state = {
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
    dirty: false,
    touched: false,
    valid: true,
    value: undefined,
    error: undefined,
    submitError: undefined,
    registered: false,
  };

  componentDidMount() {
    const { name, register, defaultValue, isRequired, validate } = this.props;
    register({
      name,
      initialValue: defaultValue,
      register: form => {
        this.unregisterField = form.registerField(
          name,
          ({
            change,
            blur,
            focus,
            dirty,
            touched,
            valid,
            value,
            error,
            submitError,
          }) => {
            this.setState({
              registered: true,
              onChange: translateEvent(change),
              onBlur: blur,
              onFocus: focus,
              dirty,
              touched,
              valid,
              value,
              error,
              submitError,
            });
          },
          {
            dirty: true,
            touched: true,
            valid: true,
            value: true,
            error: true,
            submitError: true,
          },
          {
            getValidator: () =>
              isRequired ? withRequired(validate) : validate,
          },
        );
      },
    });
  }

  componentWillUnmount() {
    this.unregisterField();
  }

  render() {
    const { children, isRequired, label, name } = this.props;
    const {
      registered,
      onChange,
      onBlur,
      onFocus,
      value,
      ...rest
    } = this.state;
    const error = rest.submitError || (rest.touched && rest.error);
    const fieldProps = {
      onChange,
      onBlur,
      onFocus,
      value,
      name,
      isInvalid: Boolean(error),
    };
    return (
      <FieldWrapper>
        <Label htmlFor={name}>
          {label}
          {isRequired && (
            <RequiredIndicator role="presentation">*</RequiredIndicator>
          )}
        </Label>
        {registered && children({ fieldProps, error, meta: rest })}
      </FieldWrapper>
    );
  }
}

// Make it easier to reference context value in lifecycle methods
const Field = (props: Props) => (
  <FormContext.Consumer>
    {registerField => <FieldInner {...props} register={registerField} />}
  </FormContext.Consumer>
);

Field.defaultProps = {
  defaultValue: undefined,
  register: () => {},
};

export default Field;
