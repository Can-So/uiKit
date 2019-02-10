// @flow

import React, { Component } from 'react';
import fetchMock from 'fetch-mock';
import EmojiAtlassianIcon from '@atlaskit/icon/glyph/emoji/atlassian';
import Button from '@atlaskit/button';
import { Label } from '@atlaskit/field-base';
import { ToggleStateless } from '@atlaskit/toggle';
import { LayoutManager, NavigationProvider } from '@atlaskit/navigation-next';
import { AnalyticsListener } from '@atlaskit/analytics-next';

import GlobalNavigation from '../src';

const fabricNotificationLogUrl = '/gateway/api/notification-log/';
const cloudId = 'DUMMY-158c8204-ff3b-47c2-adbb-a0906ccc722b';

const Global = ({
  resetNotificationCount,
  updateIframeUrl,
  ...controlledNotificationProps
}: {
  resetNotificationCount: () => void,
  updateIframeUrl: () => void,
}) => (
  <GlobalNavigation
    productIcon={EmojiAtlassianIcon}
    productHref="#"
    fabricNotificationLogUrl={fabricNotificationLogUrl}
    onNotificationDrawerClose={() => {
      // setTimeout is required to let the drawer close animation end in the example.
      setTimeout(resetNotificationCount, 350);
    }}
    onNotificationDrawerOpen={updateIframeUrl}
    cloudId={cloudId}
    {...controlledNotificationProps}
  />
);

export default class GlobalNavigationWithNotificationIntegration extends Component<
  {},
  {
    count: number,
    isNotificationControlled: boolean,
    isNotificationDrawerOpen: boolean,
  },
> {
  state = {
    count: 5,
    isNotificationControlled: false,
    isNotificationDrawerOpen: false,
  };

  componentDidMount() {
    const { count } = this.state;
    fetchMock.mock(
      new RegExp(fabricNotificationLogUrl),
      Promise.resolve({ count }),
    );
  }

  componentDidUpdate() {
    const { count } = this.state;
    fetchMock.restore();
    fetchMock.mock(
      new RegExp(fabricNotificationLogUrl),
      Promise.resolve({ count }),
    );
  }

  componentWillUnmount() {
    fetchMock.restore();
  }

  updateIframeUrl = () => {
    // Flow doesn't know how to deal with querySelector
    // Therefore casting the return value to HTMLIFrameElement
    const iFrame = ((document.querySelector(
      'iFrame[title="Notifications"',
    ): any): HTMLIFrameElement);

    if (iFrame) {
      // Notification URL is unreachable from the examples.
      // Hence setting it to root
      iFrame.src = '/';
    }
  };

  resetNotificationCount = () => {
    this.setState({
      count: 0,
    });
  };

  onControlledNotificationToggle = () => {
    this.setState(state => ({
      isNotificationControlled: !state.isNotificationControlled,
    }));
  };
  openNotificationDrawer = () => {
    this.updateIframeUrl();
    this.setState({ isNotificationDrawerOpen: true, count: 0 });
  };
  closeNotificationDrawer = () => {
    this.setState({ isNotificationDrawerOpen: false });
  };

  randomiseNotificationCount = () => {
    this.setState({
      count: Math.floor(1 + Math.random() * 18), // To ensure equal probability of count above and below 9
    });
  };

  render() {
    const { isNotificationControlled, isNotificationDrawerOpen } = this.state;
    const controlledNotificationProps = isNotificationControlled
      ? {
          isNotificationDrawerOpen,
          onNotificationClick: this.openNotificationDrawer,
          onNotificationDrawerClose: this.closeNotificationDrawer,
        }
      : {};

    return (
      <NavigationProvider>
        <LayoutManager
          globalNavigation={() => (
            <AnalyticsListener
              channel="navigation"
              onEvent={analyticsEvent => {
                const { payload, context } = analyticsEvent;
                const eventId = `${payload.actionSubject ||
                  payload.name} ${payload.action || payload.eventType}`;
                console.log(`Received event [${eventId}]: `, {
                  payload,
                  context,
                });
              }}
            >
              <Global
                updateIframeUrl={this.updateIframeUrl}
                resetNotificationCount={this.resetNotificationCount}
                {...controlledNotificationProps}
              />
            </AnalyticsListener>
          )}
          productNavigation={() => null}
          containerNavigation={() => null}
        >
          <div css={{ padding: '32px 40px' }}>
            <p>
              <Button onClick={this.randomiseNotificationCount}>
                Randomise Notification Count
              </Button>
            </p>
            <p>
              <Button onClick={this.resetNotificationCount}>
                Reset Notification Count
              </Button>
            </p>
            <Label label="Toggle Contolled Notification" />
            <ToggleStateless
              isChecked={isNotificationControlled}
              onChange={this.onControlledNotificationToggle}
            />
          </div>
        </LayoutManager>
      </NavigationProvider>
    );
  }
}
