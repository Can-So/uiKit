import * as React from 'react';
import { ExampleWrapper } from '../example-helpers/ExampleWrapper';
import { UserPicker } from '../src/components/UserPicker';

export default class Example extends React.Component<{}> {
  render() {
    return (
      <ExampleWrapper>
        {({ users, onInputChange }) => (
          <UserPicker
            options={users}
            onChange={console.log}
            onInputChange={onInputChange}
            isMulti
          />
        )}
      </ExampleWrapper>
    );
  }
}
