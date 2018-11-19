// @flow
import React from 'react';
import FieldText from '@atlaskit/field-text';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';

import { FormHeader, FormFooter } from '../src';
// TODO: import from src
import { HelperMessage, ErrorMessage, ValidMessage } from '../src/Messages';
import Field from '../src/FieldNext';
import CheckboxField from '../src/CheckboxField';
import Form from '../src/FormNext';

export default () => (
  <div
    style={{
      display: 'flex',
      width: '400px',
      margin: '0 auto',
      flexDirection: 'column',
    }}
  >
    <Form
      onSubmit={data => {
        console.log('data', data);
        return Math.random() > 0.5
          ? Promise.resolve({ username: 'IN_USE' })
          : undefined;
      }}
    >
      {props => (
        <form {...props}>
          <FormHeader title="Sign up" />
          <Field name="username" defaultValue="" label="User name" isRequired>
            {({ fieldProps, error }) => (
              <>
                <FieldText shouldFitContainer isLabelHidden {...fieldProps} />
                {!error && (
                  <HelperMessage>
                    You can use letters, numbers & periods.
                  </HelperMessage>
                )}
                {error === 'IN_USE' && (
                  <ErrorMessage>
                    This user name is already in use, try another one.
                  </ErrorMessage>
                )}
              </>
            )}
          </Field>
          <Field
            name="password"
            defaultValue=""
            label="Password"
            isRequired
            validate={value => (value.length < 8 ? 'TOO_SHORT' : undefined)}
          >
            {({ fieldProps, error }) => (
              <>
                <FieldText
                  shouldFitContainer
                  isLabelHidden
                  type="password"
                  {...fieldProps}
                />
                {!error && (
                  <HelperMessage>
                    Use 8 or more characters with a mix of letters, numbers &
                    symbols.
                  </HelperMessage>
                )}
                {error === 'TOO_SHORT' && (
                  <ErrorMessage>
                    Password needs to be more than 8 characters.
                  </ErrorMessage>
                )}
              </>
            )}
          </Field>
          <CheckboxField name="remember" defaultIsChecked label="Remember me">
            {({ fieldProps }) => (
              <Checkbox {...fieldProps} label="Always sign in on this device" />
            )}
          </CheckboxField>
          <FormFooter>
            <ButtonGroup>
              <Button appearance="subtle">Cancel</Button>
              <Button type="submit" appearance="primary">
                Sign up
              </Button>
            </ButtonGroup>
          </FormFooter>
        </form>
      )}
    </Form>
  </div>
);
