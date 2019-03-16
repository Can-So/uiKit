import NotificationIndicator from './NotificationIndicator';
import { withAnalyticsEvents } from '@findable/analytics-next';

const NotificationIndicatorWithAnalytics = withAnalyticsEvents()(
  NotificationIndicator,
);
export { NotificationIndicatorWithAnalytics as NotificationIndicator };
