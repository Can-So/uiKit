import * as React from 'react';
import {
  assignToMe,
  exampleUsers,
  filterUsers,
  unassigned,
} from '../example-helpers';
import { User } from '../src';
import { UserPicker } from '../src/components/UserPicker';

function* getUsers(search?: string): Iterable<PromiseLike<User[]> | User> {
  if (!search || search.length === 0) {
    yield unassigned;
    yield assignToMe;
    yield new Promise(resolve => {
      setTimeout(() => resolve(exampleUsers), 1000);
    });
  } else {
    yield new Promise(resolve => {
      setTimeout(() => resolve(filterUsers(search)), 1000);
    });
  }
}

export default class Example extends React.Component<{}> {
  render() {
    return <UserPicker loadUsers={getUsers} clearValueLabel="Unassign" />;
  }
}
