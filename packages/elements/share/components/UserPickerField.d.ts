import { LoadOptions, OptionData } from '@atlaskit/user-picker';
import * as React from 'react';
import { ConfigResponse } from '../types';
export declare const REQUIRED = "REQUIRED";
export declare type Props = {
    loadOptions?: LoadOptions;
    defaultValue?: OptionData[];
    config?: ConfigResponse;
    capabilitiesInfoMessage?: React.ReactNode;
};
export declare const UserPickerField: React.StatelessComponent<Props>;
