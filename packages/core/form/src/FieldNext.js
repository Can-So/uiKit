// @flow
import React, { type Node } from 'react';
import { type FormApi } from 'final-form';
import { FormContext } from './FormNext';
import FieldWrapper, { Label, RequiredIndicator } from './styled/Field';
import translateEvent from './utils/translateEvent';

type Props = {
  /* Children to render in the field. Called with form information. */
  children: Object => Node,
  /* The default value of the field */
  defaultValue: any,
  /* Whether the field is required for submission */
  isRequired?: boolean,
  /* Label displayed above the field */
  label?: Node,
  /* The name of the field */
  name: string,
  /* the type of the field */
  type?: 'checkbox',
  /* validates the current value of field */
  validate: any => string | Promise<string> | void,
};

type State = Object;

class Field extends React.Component<
  {
    ...$Exact<Props>,
    form: FormApi,
  },
  State,
> {
  state = {
    registered: false,
  };
  componentDidMount() {
    const { name, form, defaultValue } = this.props;
    form.change(name, defaultValue);
    form.registerField(
      name,
      ({ change, blur, focus, value, error, touched }) => {
        this.setState({
          onChange: translateEvent(change),
          onBlur: blur,
          onFocus: focus,
          error,
          value,
          touched,
          registered: true,
        });
      },
      {
        active: true,
        dirty: true,
        touched: true,
        valid: true,
        value: true,
        error: true,
      },
      {
        getValidator: () => this.props.validate,
      },
    );
  }
  render() {
    const { children, isRequired, label, name, type } = this.props;
    const {
      registered,
      onChange,
      onBlur,
      onFocus,
      value,
      error,
      touched,
    } = this.state;
    const fieldProps = {
      onChange,
      onBlur,
      onFocus,
      value,
      name,
      isInvalid: touched && error,
    };
    return (
      <FieldWrapper>
        <Label htmlFor={name}>
          {label}
          {isRequired && (
            <RequiredIndicator role="presentation">*</RequiredIndicator>
          )}
        </Label>
        {registered &&
          children({ fieldProps, status: 'default', error: touched && error })}
      </FieldWrapper>
    );
  }
}

export default React.forwardRef((props: Props, ref) => (
  <FormContext.Consumer>
    {form => <Field {...props} form={form} ref={ref} />}
  </FormContext.Consumer>
));
