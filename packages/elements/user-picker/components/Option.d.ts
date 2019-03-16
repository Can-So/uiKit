import * as React from 'react';
import { Option as OptionType, UserPickerProps } from '../types';
export declare type OptionProps = {
    data: OptionType;
    isSelected: boolean;
    status?: string;
    selectProps: UserPickerProps;
};
export declare const Option: React.StatelessComponent<OptionProps>;
