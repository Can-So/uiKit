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
        noOptionsMessage="A very, very, very, very, very, very, very long custom no options message"
        placeholder="A very, very, very, very, very, very, very long custom placeholder"
      />
    );
  }
}
