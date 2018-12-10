// @flow
import React from 'react';
import Button from '@atlaskit/button';
import TextField from '@atlaskit/textfield';
import TextArea from '@atlaskit/textarea';
import { FieldTextStateless } from '@atlaskit/field-text';
import { FieldTextAreaStateless } from '@atlaskit/field-text-area';
import Form, { Field, FormFooter } from '../src';

export default () => (
  <div
    style={{
      display: 'flex',
      width: '400px',
      margin: '0 auto',
      flexDirection: 'column',
    }}
  >
    <Form onSubmit={data => console.log(data)}>
      {({ formProps }) => (
        <form {...formProps}>
          <Field name="firstname" defaultValue="" label="First name" isRequired>
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>

          <Field name="lastname" defaultValue="" label="Last name" isRequired>
            {({ fieldProps: { isRequired, ...others } }) => (
              <FieldTextStateless
                isLabelHidden
                shouldFitContainer
                required={isRequired}
                {...others}
              />
            )}
          </Field>

          <Field name="description" defaultValue="" label="Description">
            {({ fieldProps }) => <TextArea {...fieldProps} />}
          </Field>

          <Field name="comments" defaultValue="" label="Additional comments">
            {({ fieldProps }) => (
              <FieldTextAreaStateless
                isLabelHidden
                shouldFitContainer
                {...fieldProps}
              />
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
