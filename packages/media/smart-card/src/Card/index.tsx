import * as React from 'react';
import { withAnalyticsEvents } from '@atlaskit/analytics-next';
import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';
import { CardAppearance } from './types';
import { CardProps } from './types';
import {
  isCardWithData,
  CardWithDataRenderer,
  CardWithURLRenderer,
} from './render';
export { CardAppearance, CardProps };

type CardWithAnalyticsProps = CardProps & WithAnalyticsEventProps;

const CardWithAnalytics = (props: CardWithAnalyticsProps) =>
  isCardWithData(props) ? (
    <CardWithDataRenderer {...props} />
  ) : (
    <CardWithURLRenderer {...props} />
  );

export const Card = withAnalyticsEvents()(CardWithAnalytics);
