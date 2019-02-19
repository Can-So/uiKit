// @flow
import React from 'react';
import { md, code, Example } from '@atlaskit/docs';

export default md`

This page covers validation for fields and form submission. Below is an example
of a field with both front-end and back-end validation.

${(
  <Example
    packageName="@atlaskit/form"
    Component={require('../examples/05-validation').default}
    title="Field validation"
    source={require('!!raw-loader!../examples/05-validation')}
  />
)}


<a name="field-validation"></a>

## Field-level validation [#](#field-validation)

A field's value can be validated by using the \`validate\` prop. This prop accepts
a function that is called whenever a field value changes. The validation function
gets passed the current field value and form state. If the validation fails,
return the error. Otherwise, return undefined.

${code`
import Form, { ErrorMessage, HelperMessage, ValidMessage } from '@atlaskit/form';
import Button from '@atlaskit/button';
import getUser from './api/getUser';

const validate = value => {
  if (value.length < 7) {
    return 'TOO_SHORT';
  }
  return getUser(value).then(user => (user ? 'IN_USE' : undefined));
};

const UsernameField = () => {
  <Field
    name="username"
    label="Password"
    defaultValue=""
    isRequired
    validate={validate}
  >
    {({ fieldProps, error }) => (
      <>
        <TextField {...fieldProps} />
        {!error && (
          <HelperMessage>Should be more than 6 characters</HelperMessage>
        )}
        {error === 'TOO_SHORT' && (
          <ErrorMessage>
            Invalid password, needs to be more than 6 characters
          </ErrorMessage>
        )}
        {error === 'IN_USE' && (
          <ErrorMessage>Username already, try another one</ErrorMessage>
        )}
      </>
    )}
  </Field>;
};
`}

If the validation requires an async check the validation function can a Promise. Note
that the promise should **resolve** the error rather than reject with the error.


<a name="submission-validation"></a>

## Submission validation [#](#submission-validation)

When the form gets submitted, the current state gets passed to the onSubmit handler.
You communicate submission errors in a similar way to field-level validation.
If there was a submission error, the onSubmit handler should return an object.
Say there was a problem with the "password" field, the object should contain that
key and the error as the value.

If the submit succeeded, the onSubmit handler should return undefined.

${code`
import Form, { Field } from '@atlaskit/form';
import TextField from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import createUser from './api/createUser';

const MyForm = () => (
  <Form
    onSubmit={data =>
      createUser(data)
        .then(ok => undefined)
        .catch(err => ({ [err.field]: err.value }))
    }
  >
    {({ formProps }) => (
      <form {...formProps}>
        <Field name="username" label="Username" defaultValue="">
          {({ fieldProps, error }) => (
            <>
              <TextField {...fieldProps} />
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </>
          )}
        </Field>
        <Field name="password" label="Password" defaultValue="">
          {({ fieldProps, error }) => (
            <>
              <TextField type="password" {...fieldProps} />
              {error && <ErrorMessage>{error}</ErrorMessage>}
            </>
          )}
        </Field>
        <Button type="submit">Submit</Button>
      </form>
    )}
  </Form>
);
`}

OnSubmit can return synchronously or a Promise that resolves to the result. Note that
the promise should **resolve** the error rather than reject with the error.

`;
