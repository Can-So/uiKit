// @flow

import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import es from 'react-intl/locale-data/es';
import EmojiAtlassianIcon from '@atlaskit/icon/glyph/emoji/atlassian';
import { LayoutManager, NavigationProvider } from '@atlaskit/navigation-next';
import { ToggleStateless } from '@atlaskit/toggle';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { mockEndpoints } from './helpers/mock-atlassian-switcher-endpoints';

import GlobalNavigation from '../src';

addLocaleData([...es]);

const getGlobalNavigation = enableAtlassianSwitcher => () => (
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
    <GlobalNavigation
      product="jira"
      cloudId="some-cloud-id"
      productIcon={EmojiAtlassianIcon}
      enableAtlassianSwitcher={enableAtlassianSwitcher}
      triggerXFlow={(...props) => {
        console.log('TRIGGERING XFLOW', props);
      }}
    />
  </AnalyticsListener>
);

type State = {
  enableAtlassianSwitcher: boolean,
};

export default class extends Component<{}, State> {
  state = {
    enableAtlassianSwitcher: true,
  };

  componentDidMount() {
    mockEndpoints();
  }

  toggleAppSwitcher = () => {
    const { enableAtlassianSwitcher } = this.state;
    this.setState({
      enableAtlassianSwitcher: !enableAtlassianSwitcher,
    });
  };

  render() {
    const { enableAtlassianSwitcher } = this.state;
    return (
      <IntlProvider locale="es">
        <NavigationProvider>
          <LayoutManager
            globalNavigation={getGlobalNavigation(enableAtlassianSwitcher)}
            productNavigation={() => null}
            containerNavigation={() => null}
          >
            <div css={{ padding: '32px 40px' }}>
              Using Atlassian Switcher:
              <ToggleStateless
                isChecked={enableAtlassianSwitcher}
                onChange={this.toggleAppSwitcher}
              />
            </div>
          </LayoutManager>
        </NavigationProvider>
      </IntlProvider>
    );
  }
}
