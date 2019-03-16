import * as React from 'react';
import { Palette, Color } from '../types';
export interface Props {
    /** color picker button label */
    label?: string;
    /** list of available colors */
    palette: Palette;
    /** selected color */
    selectedColor?: string;
    /** maximum column length */
    cols?: number;
    /** color of checkmark on selected color */
    checkMarkColor?: string;
    /** props for react-popper */
    popperProps?: Object;
    /** onChange handler */
    onChange: (value: string, analyticsEvent?: object) => void;
    /** You should not be accessing this prop under any circumstances. It is provided by @atlaskit/analytics-next. */
    createAnalyticsEvent?: any;
}
export declare class ColorPickerWithoutAnalytics extends React.Component<Props> {
    createAndFireEventOnAtlaskit: any;
    changeAnalyticsCaller: () => any;
    onChange: (option: Color) => void;
    render(): JSX.Element;
}
declare const _default: any;
export default _default;
