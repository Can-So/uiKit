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

class CardWithAnalytics extends React.PureComponent<
  CardWithAnalyticsProps,
  any
> {
  render() {
    return isCardWithData(this.props) ? (
      <CardWithDataRenderer {...this.props} />
    ) : (
      <CardWithURLRenderer {...this.props} />
    );
  }
}

export const Card = withAnalyticsEvents()(CardWithAnalytics);
