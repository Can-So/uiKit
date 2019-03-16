import { UIAnalyticsEventInterface, WithAnalyticsEventProps, CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';
export declare const fireAnalyticsMentionTypeaheadEvent: (props: WithAnalyticsEventProps) => (action: string, duration: number, userIds?: string[], query?: string | undefined) => void;
export declare const fireAnalyticsMentionEvent: (createEvent: CreateUIAnalyticsEventSignature) => (actionSubject: string, action: string, text: string, id: string, accessLevel?: string | undefined) => UIAnalyticsEventInterface;
export declare const fireAnalytics: (firePrivateAnalyticsEvent?: Function | undefined) => (eventName: string, text: string, accessLevel?: string | undefined) => void;
