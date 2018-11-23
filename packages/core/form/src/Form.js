// @flow
import React, { createContext, type Node, type Ref } from 'react';
import { createForm, type FormApi } from 'final-form';
import createDecorator from 'final-form-focus';

export const FormContext = createContext();

type FormProps = {
  ref: Ref<'form'>,
  onSubmit: (SyntheticEvent<HTMLFormElement> | any) => any,
};

type Props = {
  /* Children rendered inside the Form component. Function will be passed props from the form. */
  children: ({ formProps: FormProps }) => Node,
  /* Called when the form is submitted without errors */
  onSubmit: Object => any,
};

export type FieldInfo = {
  name: string,
  initialValue: any,
  register: FormApi => any,
};

type State = {
  dirty: boolean,
  submitting: boolean,
};

class Form extends React.Component<Props, State> {
  fields = [];
  form = undefined;
  formRef = React.createRef();
  state = {
    dirty: false,
    submitting: false,
  };

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
      if (this.form) {
        field.register(this.form);
      }
    });
    this.fields = [];
  }

  registerField = (field: FieldInfo) => {
    this.fields = [...this.fields, field];
  };

  handleSubmit = (e: SyntheticEvent<HTMLFormElement> | any) => {
    if (typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    if (this.form) {
      this.form.submit();
    }
  };

  render() {
    const { dirty, submitting } = this.state;
    return (
      <FormContext.Provider value={this.registerField}>
        {this.props.children({
          formProps: {
            onSubmit: this.handleSubmit,
            ref: this.formRef,
          },
          dirty,
          submitting,
        })}
      </FormContext.Provider>
    );
  }
}

export default Form;
