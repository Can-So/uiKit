import * as React from 'react';
import { exampleUsers } from '../example-helpers';
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
            defaultValue={[exampleUsers[0], exampleUsers[1]]}
          />
        )}
      </ExampleWrapper>
    );
  }
}
