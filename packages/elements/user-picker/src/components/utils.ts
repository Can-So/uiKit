import memoizeOne from 'memoize-one';
import { ReactChild, ReactElement } from 'react';
import {
  Option,
  OptionValue,
  Promisable,
  SelectableOption,
  Team,
  User,
} from '../types';

export const isUser = (option: Option): option is User =>
  option.type === undefined || option.type === 'User';

export const isTeam = (option: Option): option is Team =>
  option.type === 'Team';

export const optionToSelectableOption = (option: Option): SelectableOption => ({
  label: option.name,
  value: option.id,
  option,
});

export const extractOptionValue = (
  value?: SelectableOption | SelectableOption[],
) => {
  if (!value) {
    return undefined;
  }
  if (Array.isArray(value)) {
    return value.map(({ option }) => option);
  }
  return value.option;
};

export const isIterable = (
  a: Promisable<Option | Option[]> | Iterable<Promisable<Option | Option[]>>,
): a is Iterable<Promisable<Option | Option[]>> =>
  typeof a[Symbol.iterator] === 'function';

export const getOptions = memoizeOne((options: Option[]) =>
  options.map(optionToSelectableOption),
);

export const optionToSelectableOptions = memoizeOne(
  (defaultValue: OptionValue) => {
    if (!defaultValue) {
      return null;
    }
    if (Array.isArray(defaultValue)) {
      return defaultValue.map(optionToSelectableOption);
    }
    return optionToSelectableOption(defaultValue);
  },
);

export const getAvatarSize = (appearance: string): 'small' | 'medium' =>
  appearance === 'big' ? 'medium' : 'small';

export const isChildInput = (child: ReactChild): child is ReactElement<any> =>
  child &&
  typeof child === 'object' &&
  child.props &&
  child.props.type === 'text';

export const isSingleValue = (
  value?: SelectableOption | SelectableOption[],
): value is SelectableOption => !!value && !Array.isArray(value);

export const hasValue = (value?: string): value is string =>
  !!value && value.trim().length > 0;

export const callCallback = <U extends any[], R>(
  callback: ((...U) => R) | undefined,
  ...args: U
): R | undefined => callback && callback(...args);
