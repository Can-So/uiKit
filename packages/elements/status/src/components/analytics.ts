import {
  CreateUIAnalyticsEventSignature,
  UIAnalyticsEventInterface,
} from '@atlaskit/analytics-next-types';
import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

export const ELEMENTS_CHANNEL = 'fabric-elements';

type EventPayload = {
  action: string;
  actionSubject: string;
  attributes?: {
    [key: string]: any;
  };
};

export const createStatusAnalyticsAndFire = (
  createAnalyticsEvent: CreateUIAnalyticsEventSignature,
) => (payload: EventPayload): UIAnalyticsEventInterface => {
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
