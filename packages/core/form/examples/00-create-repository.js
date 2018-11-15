// @flow
import React, { PureComponent } from 'react';
import Select from '@atlaskit/select';
import FieldText from '@atlaskit/field-text';
import Button from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';

import { FormHeader, FormSection, FormFooter } from '../src';
import Field from '../src/FieldNext';
import Form from '../src/FormNext';
import { HelperMessage, ErrorMessage, ValidMessage } from '../src/Messages';

type State = {
  eventResult: string,
};

export default class LayoutExample extends PureComponent<void, State> {
  state = {
    eventResult:
      'Click into and out of the input above to trigger onBlur & onFocus in the Fieldbase',
  };

  formRef: any;

  // Form Event Handlers
  onSubmitHandler = () => {
    console.log('onSubmitHandler');
  };

  onValidateHandler = () => {
    console.log('onValidateHandler');
  };

  onResetHandler = () => {
    console.log('onResetHandler');
  };

  onChangeHandler = () => {
    console.log('onChangeHandler');
  };
  onBlurHandler = () => {
    console.log('onBlurHandler');
  };
  onFocusHandler = () => {
    console.log('onFocusHandler');
  };

  // Footer Button Handlers
  submitClickHandler = () => {
    this.formRef.submit();
  };

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
        <Form onSubmit={console.log}>
          {props => (
            <form
              {...props}
              action="//httpbin.org/get"
              method="GET"
              target="submitFrame"
            >
              <FormHeader title="Create a new repository" />

              <FormSection>
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

                <Field name="project" label="Project" isRequired>
                  {({ fieldProps }) => (
                    <Select
                      options={[
                        { label: 'Atlaskit', value: 'brisbane' },
                        { label: 'Bitbucket', value: 'bb' },
                        { label: 'Confluence', value: 'conf' },
                        { label: 'Jira', value: 'jra' },
                        { label: 'Stride', value: 'stride' },
                      ]}
                      placeholder="Choose a project&hellip;"
                      {...fieldProps}
                    />
                  )}
                </Field>

                <Field
                  name="repo_name"
                  label="Repository name"
                  defaultValue="Yahh"
                >
                  {({ fieldProps }) => (
                    <FieldText
                      shouldFitContainer
                      isLabelHidden
                      {...fieldProps}
                    />
                  )}
                </Field>

                <Field name="access-level" label="Access level" defaultValue>
                  {({ fieldProps: { value, ...others } }) => (
                    <Checkbox
                      label="This is a private repository"
                      value="private"
                      isChecked={value}
                      {...others}
                    />
                  )}
                </Field>
                <Field
                  name="include_readme"
                  label="Include a README?"
                  defaultValue={{ label: 'No', value: 'no' }}
                >
                  {({ fieldProps }) => (
                    <Select
                      isSearchable={false}
                      options={[
                        { label: 'No', value: 'no' },
                        {
                          label: 'Yes, with a template',
                          value: 'yes-with-template',
                        },
                        {
                          label: 'Yes, with a tutorial (for beginners)',
                          value: 'yes-with-tutorial',
                        },
                      ]}
                      {...fieldProps}
                    />
                  )}
                </Field>
              </FormSection>

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
