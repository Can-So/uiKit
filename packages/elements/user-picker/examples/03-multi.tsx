import * as React from 'react';
import { exampleUsers } from '../example-helpers';
import { ExampleWrapper } from '../example-helpers/ExampleWrapper';
import { UserPicker } from '../src/components/UserPicker';

export default class Example extends React.Component<{}> {
  render() {
    return (
      <ExampleWrapper>
        <UserPicker users={exampleUsers} isMulti onChange={console.log} />
      </ExampleWrapper>
    );
  }
}
