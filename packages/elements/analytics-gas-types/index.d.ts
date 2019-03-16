import { AnalyticsEventPayload } from '@findable/analytics-next-types';
export declare const UI_EVENT_TYPE = "ui";
export declare const TRACK_EVENT_TYPE = "track";
export declare const SCREEN_EVENT_TYPE = "screen";
export declare const OPERATIONAL_EVENT_TYPE = "operational";
export declare const DEFAULT_SOURCE = "unknown";
export declare type EventType = 'ui' | 'track' | 'screen' | 'operational';
export declare type GasPureScreenEventPayload = {
    name: string;
    attributes?: {
        [key: string]: any;
    };
    tags?: Array<string>;
};
export declare type GasPurePayload = {
    actionSubject: string;
    actionSubjectId?: string;
    attributes?: {
        packageName?: string;
        packageVersion?: string;
        componentName?: string;
        [key: string]: any;
    };
    nonPrivacySafeAttributes?: {
        [key: string]: any;
    };
    tags?: Array<string>;
    source?: string;
};
export declare type WithEventType = {
    eventType: EventType;
};
export declare type GasCorePayload = GasPurePayload & WithEventType;
export declare type GasScreenEventPayload = GasPureScreenEventPayload & WithEventType;
export declare type GasPayload = AnalyticsEventPayload & GasCorePayload;
