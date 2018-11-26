// @flow
import React, { Component } from 'react';
import Select from '@atlaskit/select';
import TextField from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { RadioGroup } from '@atlaskit/radio';
import { Checkbox } from '@atlaskit/checkbox';

import Form, { Field, FormHeader, FormSection, FormFooter } from '../src';

type State = {
  projectName: string,
  projectKey: string,
};

const wait = ms => new Promise(res => setTimeout(res, 1000));

export default class AsyncExample extends Component<void, State> {
  state = {
    projectName: '',
    projectKey: '',
  };

  componentDidMount() {
    wait(2000).then(() =>
      this.setState({ projectName: 'Important business', projectKey: 'IB' }),
    );
  }

  render() {
    const { projectKey, projectName } = this.state;
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
          {({ formProps }) => (
            <form {...formProps}>
              <FormHeader title="Project details" />

              <Field
                label="Project name"
                name="projectName"
                defaultValue={projectName}
              >
                {({ fieldProps }) => <TextField {...fieldProps} />}
              </Field>

              <Field
                label="Project key"
                name="projectKey"
                defaultValue={projectKey}
              >
                {({ fieldProps }) => <TextField {...fieldProps} />}
              </Field>

              <FormFooter>
                <Button appearance="primary" type="submit">
                  Submit
                </Button>
              </FormFooter>
            </form>
          )}
        </Form>
      </div>
    );
  }
}
