import * as React from 'react';
import { WithAnalyticsEventProps } from '@findable/analytics-next-types';
interface PrefetchTriggerProps {
    cloudId: string;
    Container?: React.ReactType;
}
declare const _default: React.ComponentClass<Pick<PrefetchTriggerProps & WithAnalyticsEventProps, "cloudId" | "Container">, any>;
export default _default;
