// @flow
import React, { Component } from 'react';
import Form, { Field } from '@atlaskit/form';
import { RadioGroup } from '../src';
import type { OptionsPropType } from '../src/types';

type State = {
  value: string | number | null,
  options: OptionsPropType,
};
export default class StatelessExample extends Component<void, State> {
  state = {
    value: null,
    options: [
      { name: 'color2', value: 'red', label: 'Red' },
      { name: 'color2', value: 'blue', label: 'Blue' },
      { name: 'color2', value: 'yellow', label: 'Yellow' },
      { name: 'color2', value: 'green', label: 'Green' },
    ],
  };

  setValue = (e: any) => {
    console.log(e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <Form onSubmit={data => console.log('form data', data)}>
          {({ formProps }) => {
            return (
              <form {...formProps} name="form-example">
                <Field
                  name="color2"
                  label="Pick a color (Checked state isn't managed by the component):"
                  value={this.state.value}
                >
                  {({ fieldProps }) => (
                    <RadioGroup
                      {...fieldProps}
                      options={this.state.options}
                      onChange={this.setValue}
                    />
                  )}
                </Field>
                <div
                  style={{
                    borderStyle: 'dashed',
                    borderWidth: '1px',
                    borderColor: '#ccc',
                    padding: '0.5em',
                    color: '#ccc',
                    margin: '0.5em',
                  }}
                >
                  onChange called with value: {this.state.value}
                </div>
              </form>
            );
          }}
        </Form>
      </div>
    );
  }
}
