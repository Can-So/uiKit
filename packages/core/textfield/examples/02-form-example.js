// @flow

import React, { Fragment } from 'react';
import Button from '@findable/button';
import Form, { Field, FormFooter, HelperMessage } from '@findable/form';
import Textfield from '../src';

export default function() {
  return (
    <Form onSubmit={formState => console.log('form submitted', formState)}>
      {({ formProps }) => (
        <form {...formProps}>
          <Field name="example-text" defaultValue="a default value">
            {({ fieldProps }) => (
              <Fragment>
                <Textfield {...fieldProps} />
                <HelperMessage>
                  Check the console to see the submitted data
                </HelperMessage>
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
  );
}
