import memoizeOne from 'memoize-one';
import { ReactChild, ReactElement } from 'react';
import { Promisable, User, UserOption, UserValue } from '../types';

export const userToOption = (user: User) => ({
  label: user.name,
  value: user.id,
  user,
});

export const extractUserValue = (value?: UserOption | UserOption[]) => {
  if (!value) {
    return undefined;
  }
  if (Array.isArray(value)) {
    return value.map(({ user }) => user);
  }
  return value.user;
};

export const isIterable = (
  a: Promisable<User | User[]> | Iterable<Promisable<User | User[]>>,
): a is Iterable<Promisable<User | User[]>> =>
  typeof a[Symbol.iterator] === 'function';

export const getOptions = memoizeOne((users: User[]) =>
  users.map(userToOption),
);

export const usersToOptions = memoizeOne((defaultValue: UserValue) => {
  if (!defaultValue) {
    return null;
  }
  if (Array.isArray(defaultValue)) {
    return defaultValue.map(userToOption);
  }
  return userToOption(defaultValue);
});

export const getAvatarSize = (
  appearance: string,
): 'small' | 'xsmall' | 'medium' =>
  appearance === 'normal'
    ? 'small'
    : appearance === 'big'
    ? 'medium'
    : 'xsmall';

export const isChildInput = (child: ReactChild): child is ReactElement<any> =>
  child &&
  typeof child === 'object' &&
  child.props &&
  child.props.type === 'text';

export const isSingleValue = (
  value?: UserOption | UserOption[],
): value is UserOption => !!value && !Array.isArray(value);

export const hasValue = (value?: string): value is string =>
  !!value && value.trim().length > 0;

export const callCallback = <U extends any[], R>(
  callback: ((...U) => R) | undefined,
  ...args: U
): R | undefined => callback && callback(...args);
