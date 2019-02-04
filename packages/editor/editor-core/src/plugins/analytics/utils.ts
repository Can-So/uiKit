import { analyticsChannel } from './index';
import { AnalyticsEventPayload } from './types';

export const fireAnalyticsEvent = createAnalyticsEvent => ({
  payload,
  channel = analyticsChannel,
}: {
  payload: AnalyticsEventPayload;
  channel?: string;
}) => {
  return createAnalyticsEvent(payload).fire(channel);
};
