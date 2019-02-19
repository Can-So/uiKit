import React, { Component } from 'react';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { UIAnalyticsEventInterface } from '@atlaskit/analytics-next-types';
import {
  SwitcherView,
  SwitcherItem,
  Section,
  ManageButton,
  Skeleton,
} from '../../src/primitives';
import MockProvider from './mock-provider';

export class Switcher extends Component {
  render() {
    return (
      <MockProvider>
        {({ isLoading, data }) =>
          isLoading ? (
            <Skeleton />
          ) : (
            <SwitcherView>
              <Section id="first-section" isAdmin title="First Section">
                <SwitcherItem
                  id="first-item"
                  type="link"
                  icon={SettingsIcon}
                  href="/"
                >
                  {`${data && data.data} First Item`}
                </SwitcherItem>
                <SwitcherItem id="first-item" type="link">{`${data &&
                  data.data} Second Item`}</SwitcherItem>
                <SwitcherItem id="second-item" type="link">{`${data &&
                  data.data} Third Item`}</SwitcherItem>
              </Section>
              <Section id="second-section" title="Second Section">
                <SwitcherItem id="first-item" type="link">
                  First Item
                </SwitcherItem>
                <SwitcherItem id="second-item" type="link">
                  Second Item
                </SwitcherItem>
                <SwitcherItem id="third-item" type="link">
                  Third Item
                </SwitcherItem>
              </Section>
              <Section id="third-section" title="Third Section">
                <SwitcherItem id="first-item" type="link">
                  First Item
                </SwitcherItem>
                <SwitcherItem id="second-item" type="link">
                  Second Item
                </SwitcherItem>
                <SwitcherItem id="third-item" type="link">
                  Third Item
                </SwitcherItem>
                <SwitcherItem id="first-item" type="link">
                  First Item
                </SwitcherItem>
                <SwitcherItem id="second-item" type="link">
                  Second Item
                </SwitcherItem>
                <SwitcherItem id="third-item" type="link">
                  Third Item
                </SwitcherItem>
                <SwitcherItem id="first-item" type="link">
                  First Item
                </SwitcherItem>
                <SwitcherItem id="second-item" type="link">
                  Second Item
                </SwitcherItem>
                <SwitcherItem id="third-item" type="link">
                  Third Item
                </SwitcherItem>
                <SwitcherItem id="first-item" type="link">
                  First Item
                </SwitcherItem>
                <SwitcherItem id="second-item" type="link">
                  Second Item
                </SwitcherItem>
                <SwitcherItem id="third-item" type="link">
                  Third Item
                </SwitcherItem>
              </Section>
              <ManageButton href="/some-href" />
            </SwitcherView>
          )
        }
      </MockProvider>
    );
  }
}

const onAnalyticsEvent = (event: UIAnalyticsEventInterface, channel) => {
  // tslint:disable-next-line:no-console
  console.log(
    `AnalyticsEvent(${channel})\n\tpayload=%o\n\tcontext=%o`,
    event.payload,
    event.context,
  );
};

export const AnalyticsLogger = ({ children }) => {
  return (
    <AnalyticsListener channel="*" onEvent={onAnalyticsEvent}>
      {children}
    </AnalyticsListener>
  );
};

export const withAnalyticsLogger = WrappedComponent => props => (
  <AnalyticsLogger>
    <WrappedComponent {...props} />
  </AnalyticsLogger>
);
