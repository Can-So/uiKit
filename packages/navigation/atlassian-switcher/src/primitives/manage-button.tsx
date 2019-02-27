import * as React from 'react';
import Button from '@atlaskit/button';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next-types';
import { NAVIGATION_CHANNEL, UI_EVENT_TYPE } from '../utils/analytics';

type ManageButtonProps = {
  href: string;
};

export default class ManageButton extends React.Component<ManageButtonProps> {
  onClick = (_: any, analyticsEvent: UIAnalyticsEvent) => {
    analyticsEvent
      .update({
        eventType: UI_EVENT_TYPE,
        actionSubjectId: 'manageListButton',
      })
      .fire(NAVIGATION_CHANNEL);
  };

  render() {
    const { href } = this.props;
    return (
      <Button href={href} onClick={this.onClick}>
        Manage list
      </Button>
    );
  }
}
