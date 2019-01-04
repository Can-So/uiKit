// @flow

import type { WithAnalyticsEventsProps } from '@atlaskit/analytics-next';

import type { ViewControllerState } from '../../../view-controller/types';

export type LayerInitialisedProps = {
  ...$Exact<WithAnalyticsEventsProps>,
  activeView: $PropertyType<ViewControllerState, 'activeView'>,
  initialised: boolean,
  onInitialised?: () => void,
};
