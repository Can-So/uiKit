import {
  name as packageName,
  version as packageVersion,
} from '../../../package.json';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next-types';

export const FABRIC_CHANNEL = 'fabric-elements';

export const createStatusAnalyticsAndFire = (
  createAnalyticsEvent?: CreateUIAnalyticsEventSignature,
) => payload => {
  if (createAnalyticsEvent && payload) {
    const statusPayload = { ...payload, eventType: 'ui' };
    if (!statusPayload.attributes) {
      statusPayload.attributes = {};
    }
    statusPayload.attributes.packageName = packageName;
    statusPayload.attributes.packageVersion = packageVersion;
    statusPayload.attributes.componentName = 'status';

    createAnalyticsEvent(statusPayload).fire(FABRIC_CHANNEL);
  }
};
