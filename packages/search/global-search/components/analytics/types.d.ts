import { GasPayload } from '@atlaskit/analytics-gas-types';
export declare type AnalyticsNextEvent = {
    payload: GasPayload;
    context: Array<any>;
    update: (GasPayload: any) => AnalyticsNextEvent;
    fire: (string: any) => AnalyticsNextEvent;
};
export declare type CreateAnalyticsEventFn = () => AnalyticsNextEvent;
