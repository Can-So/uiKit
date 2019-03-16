import * as React from 'react';
import { WithAnalyticsEventProps } from '@findable/analytics-next-types';
export declare type Color = 'neutral' | 'purple' | 'blue' | 'red' | 'yellow' | 'green';
export declare type StatusStyle = 'bold' | 'subtle';
export interface OwnProps {
    text: string;
    color: Color;
    style?: StatusStyle;
    localId?: string;
    onClick?: (event: React.SyntheticEvent<any>) => void;
    onHover?: () => void;
}
export declare type Props = OwnProps & WithAnalyticsEventProps;
export declare const Status: React.ComponentClass<OwnProps>;
