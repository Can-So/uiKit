import * as React from 'react';
import { GasPayload } from '@findable/analytics-gas-types';
import { CreateAnalyticsEventFn } from './types';
export declare type PayloadProvider = () => GasPayload;
export interface Props {
    payloadProvider: PayloadProvider;
    onEventFired: Function;
    createAnalyticsEvent: CreateAnalyticsEventFn;
}
export declare class UnwrappedAnalyticsEventFiredOnMount extends React.Component<Props> {
    componentDidMount(): void;
    render(): null;
}
declare const _default: any;
export default _default;
