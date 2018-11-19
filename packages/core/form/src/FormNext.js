// @flow
import React, { createContext, type Node, createRef } from 'react';
import { createForm, type FormApi } from 'final-form';
import createDecorator from 'final-form-focus';

export const FormContext = createContext();

type Props = {
  /* Children rendered inside the Form component */
  children: Object => Node,
  /* Called when the form is submitted without errors */
  onSubmit: Object => any,
};

export type FieldInfo = {
  name: string,
  initialValue: any,
  register: FormApi => any,
};

class Form extends React.Component<Props> {
  fields = [];
  form = undefined;
  formRef = React.createRef();

  componentDidMount() {
    const initialValues = this.fields.reduce(
      (initials, field) => ({
        ...initials,
        [field.name]: field.initialValue,
      }),
      {},
    );
    this.form = createForm({
      initialValues,
      onSubmit: this.props.onSubmit,
    });

    const withFocusDecorator = createDecorator(() =>
      this.formRef.current
        ? Array.from(this.formRef.current.querySelectorAll('input'))
        : [],
    );
    withFocusDecorator(this.form);

    this.fields.forEach(field => {
      field.register(this.form);
    });
    this.fields = [];
  }

  registerField = (field: FieldInfo) => {
    this.fields = [...this.fields, field];
  };

  handleSubmit = e => {
    e.preventDefault();
    this.form.submit();
  };

  render() {
    return (
      <FormContext.Provider value={this.registerField}>
        {this.props.children({
          onSubmit: this.handleSubmit,
          ref: this.formRef,
        })}
      </FormContext.Provider>
    );
  }
}

export default Form;
