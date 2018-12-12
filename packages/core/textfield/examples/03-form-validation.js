// @flow

import React, { Component, type ElementRef, Fragment } from 'react';
import Button from '@atlaskit/button';
import Form, {
  Field,
  FormFooter,
  FormHeader,
  ErrorMessage,
  ValidMessage,
} from '@atlaskit/form';
import Textfield from '../src';

type Props = {};
type FormRef = {
  form: {
    getState: () => any,
  },
  props: Object,
  submit: () => any,
};

function validate(value) {
  if (value !== 'open sesame') {
    return 'INCORRECT_PHRASE';
  }
  return undefined;
}

export default class extends Component<Props, State> {
  formRef: FormRef;

  handleRef = (ref: ElementRef<*>) => {
    this.formRef = ref;
  };

  handleSubmit = () => {
    const formState = this.formRef.form.getState();
    // you can now do stuff with the form.
    console.log('form state', formState);
  };

  handleReset = () => {
    console.log('Reset form...');
  };

  render() {
    return (
      <div>
        <Form
          ref={this.handleRef}
          name="validation-example"
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
        >
          {({ formProps }) => (
            <form {...formProps}>
              <FormHeader title="Validation" />
              <Field
                label="Only validates on input = open sesame"
                isRequired
                name="command"
                validate={validate}
                defaultValue=""
              >
                {({ fieldProps, error, meta: { valid, touched } }) => (
                  <Fragment>
                    <Textfield {...fieldProps} />
                    {valid && touched && (
                      <ValidMessage>Your wish granted</ValidMessage>
                    )}
                    {touched && error === 'INCORRECT_PHRASE' && (
                      <ErrorMessage>
                        Incorrect, try &lsquo;open sesame&rsquo;
                      </ErrorMessage>
                    )}
                  </Fragment>
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
  }
}
