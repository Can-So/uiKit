// @flow
import React, { type Node } from 'react';
import arrayShallowEqual from 'shallow-equal/arrays';
import objectShallowEqual from 'shallow-equal/objects';
import { type FieldState, type FieldSubscription } from 'final-form';
import { FormContext, IsDisabledContext } from './Form';
import FieldWrapper, { Label, RequiredIndicator } from './styled/Field';
import translateEvent from './utils/translateEvent';

type FieldProps = {
  isRequired: boolean,
  isInvalid: boolean,
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
  /* Children to render in the field. Called with props for the field component and other information about the field. */
  children: ({ fieldProps: FieldProps, error: any, meta: Meta }) => Node,
  /* The default value of the field. If a function is provided it is called with the current default value of the field. */
  defaultValue: any,
  /* Whether the field is required for submission */
  isRequired?: boolean,
  /* Whether the field is disabled. Internal prop - gets set through context. */
  isDisabled: boolean,
  /* Label displayed above the field */
  label?: Node,
  /* The name of the field */
  name: string,
  /* Given what onChange was called with and the current field value return the next field value */
  transform: (event: any, current: any) => any,
  /* Register the Field with the Form. Internal prop - gets set through context. */
  registerField: (
    string,
    any,
    (FieldState) => any,
    FieldSubscription,
    Object,
  ) => any,
  /* validates the current value of field */
  validate?: any => string | void | Promise<string | void>,
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

const shallowEqual = (a, b) =>
  a === b ||
  typeof b === 'function' ||
  (Array.isArray(b) && arrayShallowEqual(a, b)) ||
  (typeof b === 'object' && objectShallowEqual(a, b));

class FieldInner extends React.Component<Props, State> {
  static defaultProps = {
    transform: translateEvent,
  };
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

  register = () => {
    const { defaultValue, name, registerField, validate } = this.props;
    return registerField(
      name,
      defaultValue,
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
          onChange: change,
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
        getValidator: () => validate,
      },
    );
  };

  componentDidUpdate(prevProps: Props) {
    const { defaultValue, name } = this.props;
    if (
      !shallowEqual(prevProps.defaultValue, defaultValue) ||
      prevProps.name !== name
    ) {
      this.unregisterField();
      this.unregisterField = this.register();
    }
  }

  componentDidMount() {
    this.unregisterField = this.register();
  }

  componentWillUnmount() {
    this.unregisterField();
  }

  render() {
    const {
      children,
      isRequired,
      isDisabled,
      label,
      name,
      transform,
    } = this.props;
    const {
      registered,
      onChange,
      onBlur,
      onFocus,
      value,
      ...rest
    } = this.state;
    const error =
      rest.submitError || ((rest.touched || rest.dirty) && rest.error);
    const fieldProps = {
      onChange: e => {
        onChange(transform(e, value));
      },
      onBlur,
      onFocus,
      value,
      name,
      isDisabled,
      isInvalid: Boolean(error),
      isRequired: Boolean(isRequired),
    };
    return (
      <FieldWrapper>
        {label && (
          <Label htmlFor={name}>
            {label}
            {isRequired && (
              <RequiredIndicator role="presentation">*</RequiredIndicator>
            )}
          </Label>
        )}
        {registered && children({ fieldProps, error, meta: rest })}
      </FieldWrapper>
    );
  }
}

// Make it easier to reference context values in lifecycle methods
const Field = (props: Props) => (
  <FormContext.Consumer>
    {registerField => (
      <IsDisabledContext.Consumer>
        {isDisabled => (
          <FieldInner
            {...props}
            registerField={registerField}
            isDisabled={isDisabled}
          />
        )}
      </IsDisabledContext.Consumer>
    )}
  </FormContext.Consumer>
);

Field.defaultProps = {
  defaultValue: undefined,
  isDisabled: false,
  registerField: () => {},
  transform: translateEvent,
};

export default Field;
