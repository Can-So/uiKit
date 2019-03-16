import { GasPayload } from '@findable/analytics-gas-types';

export type AnalyticsNextEvent = {
  payload: GasPayload;
  context: Array<any>;
  update: (GasPayload) => AnalyticsNextEvent;
  fire: (string) => AnalyticsNextEvent;
};

export type CreateAnalyticsEventFn = () => AnalyticsNextEvent;
