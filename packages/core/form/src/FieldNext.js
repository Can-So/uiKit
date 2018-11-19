// @flow
import React, { type Node } from 'react';
import { FormContext, type FieldInfo } from './FormNext';
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
    register: FieldInfo => any,
  },
  State,
> {
  state = {
    registered: false,
  };
  componentDidMount() {
    const { name, register, defaultValue } = this.props;
    register({
      name,
      initialValue: defaultValue,
      register: form => {
        form.registerField(
          name,
          ({ change, blur, focus, value, error, touched, ...rest }) => {
            this.setState({
              onChange: translateEvent(change),
              onBlur: blur,
              onFocus: focus,
              error,
              value,
              touched,
              registered: true,
              ...rest,
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
      },
    });
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
    const fieldProps = {
      onChange,
      onBlur,
      onFocus,
      value,
      name,
      isInvalid: !!rest.error,
    };
    return (
      <FieldWrapper>
        <Label htmlFor={name}>
          {label}
          {isRequired && (
            <RequiredIndicator role="presentation">*</RequiredIndicator>
          )}
        </Label>
        {registered && children({ fieldProps, ...rest })}
      </FieldWrapper>
    );
  }
}

export default React.forwardRef((props: Props, ref) => (
  <FormContext.Consumer>
    {registerField => <Field {...props} register={registerField} ref={ref} />}
  </FormContext.Consumer>
));
