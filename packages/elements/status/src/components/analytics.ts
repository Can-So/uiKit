import {
  name as packageName,
  version as packageVersion,
} from '../../package.json';
import {
  CreateUIAnalyticsEventSignature,
  UIAnalyticsEventInterface,
} from '@atlaskit/analytics-next-types';

export const ELEMENTS_CHANNEL = 'fabric-elements';

export const createStatusAnalyticsAndFire = (
  createAnalyticsEvent: CreateUIAnalyticsEventSignature,
) => (payload): UIAnalyticsEventInterface => {
  const statusPayload = { ...payload, eventType: 'ui' };
  if (!statusPayload.attributes) {
    statusPayload.attributes = {};
  }
  statusPayload.attributes.packageName = packageName;
  statusPayload.attributes.packageVersion = packageVersion;
  statusPayload.attributes.componentName = 'status';

  const event = createAnalyticsEvent(statusPayload);
  event.fire(ELEMENTS_CHANNEL);
  return event;
};
