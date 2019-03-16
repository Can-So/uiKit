import * as React from 'react';
import { CreateUIAnalyticsEventSignature } from '@findable/analytics-next-types';
export declare type Props = {
    render: (createAnalyticsEvent?: CreateUIAnalyticsEventSignature) => React.ReactNode;
};
export declare const WithCreateAnalyticsEvent: React.ComponentClass<Props>;
