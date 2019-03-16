import { WithAnalyticsEventProps } from '@findable/analytics-next-types';
import * as React from 'react';
import { UserPickerProps } from '../types';
declare type Props = UserPickerProps & WithAnalyticsEventProps & {
    SelectComponent: React.ComponentClass<any>;
    pickerProps?: any;
    styles: any;
    components: any;
    width: string | number;
};
export declare const BaseUserPicker: React.ComponentClass<Props>;
export {};
