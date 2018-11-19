// @flow
import React, { Component } from 'react';
import Select from '@atlaskit/select';
import FieldText from '@atlaskit/field-text';
import FieldTextArea from '@atlaskit/field-text-area';
import Button from '@atlaskit/button';
import { RadioGroup } from '@atlaskit/radio';
import { Checkbox } from '@atlaskit/checkbox';
import Toggle from '@atlaskit/toggle';

import { FormHeader, FormFooter } from '../src';
import Field from '../src/FieldNext';
import CheckboxField from '../src/CheckboxField';
import Form from '../src/FormNext';
import { HelperMessage, ErrorMessage, ValidMessage } from '../src/Messages';

export default class FielsExample extends Component<{}> {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          width: '400px',
          margin: '0 auto',
          minHeight: '60vh',
          flexDirection: 'column',
        }}
      >
        <Form onSubmit={() => Promise.resolve({ owner: 'bad name' })}>
          {props => (
            <form {...props}>
              <FormHeader title="Different fields" />

              <Field
                name="name"
                label="Full name"
                defaultValue=""
                validate={val => (val.length < 3 ? 'TOO_SHORT' : undefined)}
              >
                {({ fieldProps, submitError }) => (
                  <>
                    <FieldText
                      shouldFitContainer
                      isLabelHidden
                      {...fieldProps}
                    />
                    {!submitError && (
                      <HelperMessage>
                        Must be longer than three characters
                      </HelperMessage>
                    )}
                    {submitError && (
                      <ErrorMessage>
                        Must be longer than three characters
                      </ErrorMessage>
                    )}
                  </>
                )}
              </Field>

              <Field
                label="Owner"
                name="owner"
                defaultValue={{
                  label: 'Atlassian',
                  value: 'atlassian',
                }}
              >
                {({ fieldProps }) => (
                  <Select
                    isSearchable={false}
                    options={[
                      { label: 'Atlassian', value: 'atlassian' },
                      { label: 'Sean Curtis', value: 'scurtis' },
                      { label: 'Mike Gardiner', value: 'mg' },
                      { label: 'Charles Lee', value: 'clee' },
                    ]}
                    {...fieldProps}
                  />
                )}
              </Field>

              <CheckboxField
                name="private-repo"
                label="Access level"
                value="private"
                defaultIsChecked
              >
                {({ fieldProps }) => (
                  <Checkbox
                    label="This is a private repository"
                    {...fieldProps}
                  />
                )}
              </CheckboxField>

              <Field name="color" label="Pick a color" defaultValue="yellow">
                {({ fieldProps: { value, ...others } }) => (
                  <RadioGroup
                    options={[
                      { name: 'color', value: 'red', label: 'Red' },
                      {
                        name: 'color',
                        value: 'blue',
                        label: 'Blue',
                      },
                      { name: 'color', value: 'yellow', label: 'Yellow' },
                      { name: 'color', value: 'green', label: 'Green' },
                    ]}
                    checkedValue={value}
                    {...others}
                  />
                )}
              </Field>

              <CheckboxField name="beta" label="Use beta features?">
                {({ fieldProps }) => <Toggle {...fieldProps} />}
              </CheckboxField>

              <Field name="information" label="Add additional information">
                {({ fieldProps }) => (
                  <FieldTextArea
                    shouldFitContainer
                    isLabelHidden
                    {...fieldProps}
                  />
                )}
              </Field>

              <FormFooter>
                <Button appearance="primary" type="submit">
                  Create repository
                </Button>
                <Button appearance="subtle">Cancel</Button>
              </FormFooter>
            </form>
          )}
        </Form>
      </div>
    );
  }
}
