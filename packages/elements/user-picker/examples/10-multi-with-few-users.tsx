import * as React from 'react';
import { ExampleWrapper } from '../example-helpers/ExampleWrapper';
import { UserPicker } from '../src/components/UserPicker';

export default class Example extends React.Component<{}> {
  render() {
    return (
      <ExampleWrapper>
        {({ users, onInputChange }) => (
          <UserPicker
            users={users}
            onChange={console.log}
            onInputChange={onInputChange}
            isMulti
            noOptionsMessage="A very, very, very, very, very, very, very long custom no options message"
            placeholder="A very, very, very, very, very, very, very long custom placeholder"
          />
        )}
      </ExampleWrapper>
    );
  }
}
