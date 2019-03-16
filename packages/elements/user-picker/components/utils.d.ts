import { ReactChild, ReactElement } from 'react';
import { AtlaskitSelectValue, Email, Option, OptionData, Promisable, Team, User, Value } from '../types';
export declare const isUser: (option: OptionData) => option is User;
export declare const isTeam: (option: OptionData) => option is Team;
export declare const isEmail: (option: OptionData) => option is Email;
export declare const optionToSelectableOption: (option: OptionData) => Option;
export declare const extractOptionValue: (value: AtlaskitSelectValue) => OptionData | OptionData[] | undefined;
export declare const isIterable: (a: any) => a is Iterable<Promisable<OptionData | OptionData[]>>;
export declare const getOptions: (options: OptionData[]) => Option[];
export interface OptionToSelectableOptions {
    (defaultValue: OptionData): Option;
    (defaultValue: OptionData[]): Option[];
    (defaultValue?: null): null;
    (defaultValue?: Value): Option | Option[] | null | undefined;
}
export declare const optionToSelectableOptions: OptionToSelectableOptions;
export declare const getAvatarSize: (appearance: string) => "xsmall" | "small" | "medium";
export declare const isChildInput: (child: ReactChild) => child is ReactElement<any>;
export declare const isSingleValue: (value?: AtlaskitSelectValue) => value is Option;
export declare const hasValue: (value?: string | undefined) => value is string;
export declare const callCallback: <U extends any[], R>(callback: ((...U: U) => R) | undefined, ...args: U) => R | undefined;
export declare const getAvatarUrl: (optionData: OptionData) => string | undefined;
export declare const isPopupUserPickerByComponent: (SelectComponent: import("react").ComponentClass<any, any>) => boolean;
export declare const isPopupUserPickerByProps: (selectProps: any) => boolean;
