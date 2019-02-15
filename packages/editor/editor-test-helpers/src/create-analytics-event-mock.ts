import {
  UIAnalyticsEventInterface,
  AnalyticsEventUpdater,
  CreateUIAnalyticsEventSignature,
  AnalyticsEventPayload,
} from '@atlaskit/analytics-next-types';

const mock: CreateUIAnalyticsEventSignature = (
  payload: AnalyticsEventPayload,
): UIAnalyticsEventInterface => ({
  context: [],
  hasFired: false,
  payload,
  clone() {
    return null;
  },
  fire() {},
  update(updater: AnalyticsEventUpdater): UIAnalyticsEventInterface {
    return mock(payload);
  },
});

export default function createAnalyticsEventMock(): jest.MockInstance<
  UIAnalyticsEventInterface
> {
  return jest.fn(mock);
}
