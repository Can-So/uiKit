import * as React from 'react';
import { ExampleWrapper } from '../example-helpers/ExampleWrapper';
import { UserPicker } from '../src/components/UserPicker';

export default class Example extends React.Component<{}> {
  render() {
    return (
      <ExampleWrapper>
        {({ options, onInputChange }) => (
          <UserPicker
            options={options}
            onChange={console.log}
            onInputChange={onInputChange}
            allowEmail
            isMulti
          />
        )}
      </ExampleWrapper>
    );
  }
}
