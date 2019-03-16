import { CreateUIAnalyticsEventSignature, UIAnalyticsEventInterface } from '@findable/analytics-next-types';
export declare const ELEMENTS_CHANNEL = "fabric-elements";
declare type EventPayload = {
    action: string;
    actionSubject: string;
    attributes?: {
        [key: string]: any;
    };
};
export declare const createStatusAnalyticsAndFire: (createAnalyticsEvent: CreateUIAnalyticsEventSignature) => (payload: EventPayload) => UIAnalyticsEventInterface;
export {};
