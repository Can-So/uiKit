import { Component } from 'react';
import { FileIdentifier } from '@findable/media-core';
import { WithAnalyticsEventProps } from '@findable/analytics-next-types';
export declare type NavigationDirection = 'prev' | 'next';
export declare type NavigationProps = Readonly<{
    items: FileIdentifier[];
    selectedItem: FileIdentifier;
    onChange: (item: FileIdentifier) => void;
}> & WithAnalyticsEventProps;
export declare type NavigationSource = 'keyboard' | 'mouse';
export declare class NavigationBase extends Component<NavigationProps, {}> {
    private navigate;
    private fireAnalytics;
    readonly selectedIndex: number;
    render(): JSX.Element | null;
}
export declare const Navigation: any;
