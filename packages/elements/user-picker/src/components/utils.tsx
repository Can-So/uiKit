import memoizeOne from 'memoize-one';
import * as React from 'react';
import { Promisable, User, UserOption } from '../types';
import UserPickerItem from './UserPickerItem';

export const userToOption = (user: User) => ({
  label: user.name || user.nickname || '',
  value: user.id,
  user,
});

export const extractUserValue = (value: UserOption | UserOption[]) => {
  if (Array.isArray(value)) {
    return value.map(({ user }) => user);
  }
  return value.user;
};

export const formatUserLabel = ({ user }, { context, ...other }) => {
  return <UserPickerItem user={user} context={context} />;
};

export const isIterable = (
  a: Promisable<User | User[]> | Iterable<Promisable<User | User[]>>,
): a is Iterable<Promisable<User | User[]>> =>
  typeof a[Symbol.iterator] === 'function';

export const getUsers = (usersFromState: User[], usersFromProps?: User[]) => {
  if (usersFromState.length > 0) {
    return usersFromState;
  }
  return usersFromProps;
};

export const getOptions = memoizeOne(
  (usersFromState: User[], usersFromProps?: User[]) => {
    const users = getUsers(usersFromState, usersFromProps);
    if (users) {
      return users.map(userToOption);
    }
    return undefined;
  },
);
