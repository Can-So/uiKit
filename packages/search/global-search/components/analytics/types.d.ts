import { GasPayload } from '@findable/analytics-gas-types';
export declare type AnalyticsNextEvent = {
    payload: GasPayload;
    context: Array<any>;
    update: (GasPayload: any) => AnalyticsNextEvent;
    fire: (string: any) => AnalyticsNextEvent;
};
export declare type CreateAnalyticsEventFn = () => AnalyticsNextEvent;
