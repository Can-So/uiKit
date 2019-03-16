// @flow

import type { WithAnalyticsEventsProps } from '@findable/analytics-next';

import type { ViewControllerState } from '../../../view-controller/types';

export type LayerInitialisedProps = {
  ...$Exact<WithAnalyticsEventsProps>,
  activeView: $PropertyType<ViewControllerState, 'activeView'>,
  initialised: boolean,
  onInitialised?: () => void,
};
