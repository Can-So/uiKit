import memoizeOne from 'memoize-one';
import { ReactChild, ReactElement } from 'react';
import {
  AtlaskitSelectValue,
  Email,
  EmailType,
  Option,
  OptionData,
  Promisable,
  Team,
  TeamType,
  User,
  UserType,
  Value,
} from '../types';

export const isUser = (option: OptionData): option is User =>
  option.type === undefined || option.type === UserType;

export const isTeam = (option: OptionData): option is Team =>
  option.type === TeamType;

export const isEmail = (option: OptionData): option is Email =>
  option.type === EmailType;

export const optionToSelectableOption = (option: OptionData): Option => ({
  label: option.name,
  value: option.id,
  data: option,
});

export const extractOptionValue = (value: AtlaskitSelectValue) => {
  if (!value) {
    return undefined;
  }
  if (Array.isArray(value)) {
    return value.map(({ data: option }) => option);
  }
  return value.data;
};

export const isIterable = (
  a: any,
): a is Iterable<Promisable<OptionData | OptionData[]>> =>
  typeof a[Symbol.iterator] === 'function';

export const getOptions = memoizeOne((options: OptionData[]) =>
  options.map(optionToSelectableOption),
);

export interface OptionToSelectableOptions {
  (defaultValue: OptionData): Option;
  (defaultValue: OptionData[]): Option[];
  (defaultValue?: null): null;
  (defaultValue?: Value): Option | Option[] | null | undefined;
}

export const optionToSelectableOptions: OptionToSelectableOptions = memoizeOne<
  OptionToSelectableOptions
>(((defaultValue: Value) => {
  if (!defaultValue) {
    return null;
  }
  if (Array.isArray(defaultValue)) {
    return defaultValue.map(optionToSelectableOption);
  }
  return optionToSelectableOption(defaultValue);
}) as OptionToSelectableOptions);

export const getAvatarSize = (
  appearance: string,
): 'xsmall' | 'small' | 'medium' =>
  appearance === 'big' ? 'medium' : appearance === 'multi' ? 'xsmall' : 'small';

export const isChildInput = (child: ReactChild): child is ReactElement<any> =>
  child &&
  typeof child === 'object' &&
  child.props &&
  child.props.type === 'text';

export const isSingleValue = (value?: AtlaskitSelectValue): value is Option =>
  !!value && !Array.isArray(value);

export const hasValue = (value?: string): value is string =>
  !!value && value.trim().length > 0;

export const callCallback = <U extends any[], R>(
  callback: ((...U: U) => R) | undefined,
  ...args: U
): R | undefined => callback && callback(...args);

export const getAvatarUrl = (optionData: OptionData) => {
  if (isUser(optionData) || isTeam(optionData)) {
    return optionData.avatarUrl;
  }
  return undefined;
};
