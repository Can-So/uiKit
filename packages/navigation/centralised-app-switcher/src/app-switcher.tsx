import React, { Component } from 'react';
import {
  AppSwitcherWrapper,
  AppSwitcherItem,
  Section,
  ManageButton,
  WithBackground,
} from './primitives';
import MockProvider from './providers/mock-provider';
import SettingsIcon from '@atlaskit/icon/glyph/settings';

class AppSwitcher extends Component {
  render() {
    return (
      <MockProvider>
        {({ isLoading, data }) =>
          isLoading ? (
            'Loading...'
          ) : (
            <AppSwitcherWrapper>
              <Section isAdmin title="First Section">
                <AppSwitcherItem icon={SettingsIcon}>
                  First Item
                </AppSwitcherItem>
                <AppSwitcherItem>Second Item</AppSwitcherItem>
                <AppSwitcherItem>Third Item</AppSwitcherItem>
              </Section>
              <Section title="Second Section">
                <AppSwitcherItem>First Item</AppSwitcherItem>
                <AppSwitcherItem>Second Item</AppSwitcherItem>
                <AppSwitcherItem>Third Item</AppSwitcherItem>
              </Section>
              <Section title="Second Section">
                <AppSwitcherItem>First Item</AppSwitcherItem>
                <AppSwitcherItem>Second Item</AppSwitcherItem>
                <AppSwitcherItem>Third Item</AppSwitcherItem>
              </Section>
              <Section title="Second Section">
                <AppSwitcherItem>First Item</AppSwitcherItem>
                <AppSwitcherItem>Second Item</AppSwitcherItem>
                <AppSwitcherItem>Third Item</AppSwitcherItem>
              </Section>
              <Section title="Second Section">
                <AppSwitcherItem>First Item</AppSwitcherItem>
                <AppSwitcherItem>Second Item</AppSwitcherItem>
                <AppSwitcherItem>Third Item</AppSwitcherItem>
              </Section>
              <Section title="Second Section">
                <AppSwitcherItem>First Item</AppSwitcherItem>
                <AppSwitcherItem>Second Item</AppSwitcherItem>
                <AppSwitcherItem>Third Item</AppSwitcherItem>
              </Section>
              <ManageButton onClick={() => {}} />
              {JSON.stringify(data)}
            </AppSwitcherWrapper>
          )
        }
      </MockProvider>
    );
  }
}

export default AppSwitcher;
