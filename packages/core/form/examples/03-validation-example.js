// @flow
import React, { PureComponent } from 'react';
import Select from '@atlaskit/select';
import FieldText from '@atlaskit/field-text';
import Button from '@atlaskit/button';
import isEmail from 'validator/lib/isEmail';
import Form, {
  Field,
  FormHeader,
  FormSection,
  FormFooter,
  ErrorMessage,
  HelperMessage,
} from '../src';

const getUser = name =>
  new Promise(resolve =>
    setTimeout(() => {
      const users = ['joe', 'jill', 'jack', 'jen'];
      resolve(users.find(n => n === name));
    }, 500),
  );

const validate = async name => {
  if (String(name).length < 3) {
    return 'TOO_SHORT';
  }
  if (Boolean(await getUser(name))) {
    return 'NAME_TAKEN';
  }
  return undefined;
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
            defaultValue=""
            label="Enter a user name"
            isRequired
            validate={validate}
          >
            {({ fieldProps, error, meta }) => (
              <>
                <FieldText isLabelHidden shouldFitContainer {...fieldProps} />
                {!error && (
                  <HelperMessage>
                    Choose a memorable name that others will see.
                  </HelperMessage>
                )}
                {error === 'TOO_SHORT' && (
                  <ErrorMessage>
                    That name is too short, use more than 3 characters.
                  </ErrorMessage>
                )}
                {error === 'NAME_TAKEN' && (
                  <ErrorMessage>
                    Oof that name is already in use, try another one.
                  </ErrorMessage>
                )}
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
  </div>
);
