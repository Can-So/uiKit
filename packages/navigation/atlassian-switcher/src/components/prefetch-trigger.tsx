import React, { Component } from 'react';
import throttle from 'lodash.throttle';
import now from '../utils/performance-now';
import { prefetchAll } from '../providers/instance-data-providers';
import { withAnalyticsEvents } from '../utils/analytics';
import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';

const TRIGGER_SUBJECT = 'atlassianSwitcherPrefetchTrigger';
const PREFETCH_EXPIRES = 60 * 1000; // 60 seconds
const THROTTLE_OPTIONS = [
  PREFETCH_EXPIRES,
  {
    leading: true,
    trailing: false,
  },
];

interface PrefetchTriggerProps {
  cloudId: string;
}

class PrefetchTrigger extends Component<
  PrefetchTriggerProps & WithAnalyticsEventProps
> {
  private lastEnteredAt?: number;

  private triggerPrefetch: typeof prefetchAll = throttle(params => {
    prefetchAll(params);

    this.props.createAnalyticsEvent!({
      eventType: 'operational',
      action: 'triggeredPrefetch',
      actionSubject: TRIGGER_SUBJECT,
    }).fire('navigation');
  }, ...THROTTLE_OPTIONS);

  private handleMouseEnter = () => {
    this.triggerPrefetch({ cloudId: this.props.cloudId });
    this.lastEnteredAt = now();
  };

  private handleMouseClick = () => {
    if (this.lastEnteredAt) {
      const hoverToClick = now() - this.lastEnteredAt;

      this.props.createAnalyticsEvent!({
        eventType: 'operational',
        action: 'clicked',
        actionSubject: TRIGGER_SUBJECT,
        attributes: { hoverToClick },
      }).fire('navigation');
    }
  };

  render() {
    const { children } = this.props;
    return (
      <div onMouseEnter={this.handleMouseEnter} onClick={this.handleMouseClick}>
        {children}
      </div>
    );
  }
}

export default withAnalyticsEvents()(PrefetchTrigger);
