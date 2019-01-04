// @flow

import React from 'react';
import Button from '@atlaskit/button';
import Form, { Field, FormFooter, HelperMessage } from '@atlaskit/form';
import Textfield from '../src';

export default function() {
  return (
    <Form onSubmit={formState => console.log('form submitted', formState)}>
      {({ formProps }) => (
        <form {...formProps}>
          <Field name="example-text" defaultValue="a default value">
            {({ fieldProps }) => (
              <>
                <Textfield {...fieldProps} />
                <HelperMessage>
                  Check the console to see the submitted data
                </HelperMessage>
              </>
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
