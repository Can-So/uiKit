import { CreateUIAnalyticsEventSignature, AnalyticsEventPayload } from '@atlaskit/analytics-next-types';
export declare const FABRIC_CHANNEL = "fabric-elements";
export declare const createStatusAnalyticsAndFire: (createAnalyticsEvent?: CreateUIAnalyticsEventSignature | undefined) => (payload: AnalyticsEventPayload) => void;
export declare const analyticsState: (isNew: boolean | undefined) => "update" | "new";
