// @flow

import type { ElementConfig } from 'react';
import type { WithNavigationViewControllerProps } from '../../../view-controller/types';
import ConnectedItem from '../ConnectedItem';

export type ExternalGoToItemProps = {
  ...$Exact<ElementConfig<typeof ConnectedItem>>,
  /** The view ID that should be transitioned to onClick. */
  goTo: string,
  /** The time in milliseconds to delay the spinner that appears when transitioning to a view that is still being loaded. */
  spinnerDelay: number,
};

export type GoToItemProps = {
  ...$Exact<WithNavigationViewControllerProps>,
  ...$Exact<ExternalGoToItemProps>,
};
