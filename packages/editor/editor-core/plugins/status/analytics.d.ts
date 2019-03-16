import { CreateUIAnalyticsEventSignature, AnalyticsEventPayload } from '@findable/analytics-next-types';
export declare const FABRIC_CHANNEL = "fabric-elements";
export declare const createStatusAnalyticsAndFire: (createAnalyticsEvent?: CreateUIAnalyticsEventSignature | undefined) => (payload: AnalyticsEventPayload) => void;
export declare const analyticsState: (isNew: boolean | undefined) => "update" | "new";
