// @flow
import React from 'react';
import Button from '@findable/button';
import Form, { CheckboxField, FormFooter } from '@findable/form';
import { Checkbox } from '../src';

export default () => (
  <Form name="example-form" onSubmit={() => {}}>
    {({ formProps }) => (
      <form {...formProps}>
        <CheckboxField name="remember" isRequired>
          {({ fieldProps }) => <Checkbox {...fieldProps} label="Remember me" />}
        </CheckboxField>
        <FormFooter>
          <Button type="submit">Next</Button>
        </FormFooter>
      </form>
    )}
  </Form>
);
