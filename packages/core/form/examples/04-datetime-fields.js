// @flow
import React, { Fragment } from 'react';
import { DateTimePicker, DatePicker } from '@atlaskit/datetime-picker';
import Button from '@atlaskit/button';
import Form, { Field, FormFooter, ErrorMessage } from '../src';

const validateOnSubmit = data => {
  let errors;
  errors = requiredValidator(data, 'DOB', errors);
  errors = requiredValidator(data, 'preference', errors);
  return errors;
};

const requiredValidator = (data, key, errors) => {
  if (!data[key])
    return {
      ...errors,
      [key]: `no ${key} value selected, please select a value.`,
    };

  return errors;
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
    <Form
      onSubmit={data => {
        console.log('form data', data);
        return Promise.resolve(validateOnSubmit(data));
      }}
    >
      {({ formProps }) => (
        <form {...formProps}>
          <Field name="DOB" label="Date of Birth" isRequired>
            {({ fieldProps, error }) => (
              <Fragment>
                <DatePicker
                  validationState={error ? 'error' : 'none'}
                  {...fieldProps}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </Fragment>
            )}
          </Field>
          <Field name="preference" label="Appointment preference" isRequired>
            {({ fieldProps, error }) => {
              const validationState = error ? 'error' : 'none';
              return (
                <Fragment>
                  <DateTimePicker
                    datePickerSelectProps={{ validationState }}
                    timePickerSelectProps={{ validationState }}
                    {...fieldProps}
                  />
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                </Fragment>
              );
            }}
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
