// @flow
import React, { createContext, type Node } from 'react';
import { createForm } from 'final-form';

export const FormContext = createContext();

type Props = {
  /* Children rendered inside the Form component */
  children: Object => Node,
  /* Called when the form is submitted without errors */
  onSubmit: Object => any,
};

class Form extends React.Component<Props> {
  form = createForm({ onSubmit: this.props.onSubmit });
  handleSubmit = e => {
    e.preventDefault();
    this.form.submit();
  };
  render() {
    return (
      <FormContext.Provider value={this.form}>
        {this.props.children({ onSubmit: this.handleSubmit })}
      </FormContext.Provider>
    );
  }
}

export default Form;
