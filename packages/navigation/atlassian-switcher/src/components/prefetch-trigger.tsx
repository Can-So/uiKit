import React, { Component } from 'react';
import throttle from 'lodash.throttle';
import now from '../utils/performance-now';
import { prefetchAll } from '../providers/instance-data-providers';
import {
  NAVIGATION_CHANNEL,
  OPERATIONAL_EVENT_TYPE,
  withAnalyticsEvents,
} from '../utils/analytics';
import { WithAnalyticsEventProps } from '@atlaskit/analytics-next-types';

const TRIGGER_SUBJECT = 'atlassianSwitcherPrefetchTrigger';
const THROTTLE_EXPIRES = 60 * 1000; // 60 seconds
const THROTTLE_OPTIONS = {
  leading: true,
  trailing: false,
};

interface PrefetchTriggerProps {
  cloudId: string;
  Container?: React.ReactType;
}

class PrefetchTrigger extends Component<
  PrefetchTriggerProps & WithAnalyticsEventProps
> {
  private lastEnteredAt?: number;

  private fireOperationalEvent = payload => {
    if (this.props.createAnalyticsEvent) {
      this.props
        .createAnalyticsEvent({
          eventType: OPERATIONAL_EVENT_TYPE,
          actionSubject: TRIGGER_SUBJECT,
          ...payload,
        })
        .fire(NAVIGATION_CHANNEL);
    }
  };

  private triggerPrefetch: typeof prefetchAll = throttle(
    params => {
      prefetchAll(params);
      this.fireOperationalEvent({
        action: 'triggeredPrefetch',
      });
    },
    THROTTLE_EXPIRES,
    THROTTLE_OPTIONS,
  );

  private handleMouseEnter = () => {
    this.triggerPrefetch({ cloudId: this.props.cloudId });
    this.lastEnteredAt = now();
  };

  private handleMouseClick = () => {
    if (this.lastEnteredAt) {
      const hoverToClick = now() - this.lastEnteredAt;

      this.fireOperationalEvent({
        action: 'clicked',
        attributes: { hoverToClick },
      });
    }
  };

  render() {
    const { children, Container = 'div' } = this.props;
    return (
      <Container
        onFocus={this.handleMouseEnter}
        onMouseEnter={this.handleMouseEnter}
        onClick={this.handleMouseClick}
      >
        {children}
      </Container>
    );
  }
}

export default withAnalyticsEvents()(PrefetchTrigger);
