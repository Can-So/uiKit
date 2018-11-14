import * as React from 'react';
import { exampleUsers } from '../example-helpers';
import { UserPicker } from '../src/components/UserPicker';

export default class Example extends React.Component<{}> {
  render() {
    return (
      <UserPicker
        users={exampleUsers.slice(0, 2)}
        isMulti
        onChange={console.log}
      />
    );
  }
}
