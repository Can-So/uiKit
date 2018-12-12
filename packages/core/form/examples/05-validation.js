// @flow
import React from 'react';
import Button from '@atlaskit/button';
import TextField from '@atlaskit/textfield';
import Form, {
  Field,
  FormFooter,
  ErrorMessage,
  HelperMessage,
  ValidMessage,
} from '../src';

const getUser = value =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(['jill', 'joe', 'jillian', 'jack'].find(v => v === value));
    }, 1000);
  });

const validate = value => {
  if (value.length < 3) {
    return 'TOO_SHORT';
  }
  return getUser(value).then(user => (user ? 'IN_USE' : undefined));
};

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
          <Field
            name="username"
            label="Username"
            defaultValue=""
            isRequired
            validate={validate}
          >
            {({ fieldProps, error, meta: { valid } }) => (
              <>
                <TextField {...fieldProps} />
                {!error && !valid && (
                  <HelperMessage>
                    Pick a memorable name that others will see
                  </HelperMessage>
                )}
                {valid && (
                  <ValidMessage>
                    Nice one, this username is available
                  </ValidMessage>
                )}
                {error === 'TOO_SHORT' && (
                  <ErrorMessage>
                    Too short, username needs to be more than 2 characters
                  </ErrorMessage>
                )}
                {error === 'IN_USE' && (
                  <ErrorMessage>
                    This username is taken by somebody, try something else
                  </ErrorMessage>
                )}
              </>
            )}
          </Field>
          <FormFooter>
            <Button type="submit">Next</Button>
          </FormFooter>
        </form>
      )}
    </Form>
  </div>
);
