import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import { UIAnalyticsEventInterface } from '@atlaskit/analytics-next-types';

import {
  SwitcherWrapper,
  SwitcherItem,
  Section,
  ManageButton,
  Skeleton,
} from '../../src/primitives';
import MockProvider from './mock-provider';
import { createIcon } from '../../src/utils/icon-themes';

const OneIcon = createIcon(({ primaryColor }) => (
  <strong style={{ color: primaryColor }}>1</strong>
));
const TwoIcon = createIcon(({ primaryColor }) => (
  <strong style={{ color: primaryColor }}>2</strong>
));
const ThreeIcon = createIcon(({ primaryColor }) => (
  <strong style={{ color: primaryColor }}>3</strong>
));

export class Switcher extends React.Component {
  render() {
    return (
      <MockProvider>
        {({ isLoading, data }) =>
          isLoading ? (
            <Skeleton />
          ) : (
            <SwitcherWrapper>
              <Section sectionId="first-section" title="First Section">
                <SwitcherItem icon={<OneIcon theme="product" />} href="/">
                  {data && data.data} First Item
                </SwitcherItem>
                <SwitcherItem icon={<TwoIcon theme="product" />}>
                  {data && data.data} Second Item
                </SwitcherItem>
                <SwitcherItem icon={<ThreeIcon theme="product" />}>
                  {data && data.data} Third Item
                </SwitcherItem>
              </Section>
              <Section sectionId="second-section" title="Second Section">
                <SwitcherItem
                  icon={<OneIcon theme="admin" />}
                  description={'Item description'}
                >
                  First Item
                </SwitcherItem>
                <SwitcherItem
                  icon={<TwoIcon theme="admin" />}
                  description={'Item description'}
                >
                  Second Item
                </SwitcherItem>
                <SwitcherItem
                  icon={<ThreeIcon theme="admin" />}
                  description={'Item description'}
                >
                  Third Item
                </SwitcherItem>
              </Section>
              <Section sectionId="third-section" title="Third Section">
                {[1, 2, 3, 4, 5].map((_, idx) => (
                  <React.Fragment key={idx}>
                    <SwitcherItem icon={<OneIcon theme="default" />}>
                      First Item
                    </SwitcherItem>
                    <SwitcherItem icon={<TwoIcon theme="default" />}>
                      Second Item
                    </SwitcherItem>
                    <SwitcherItem icon={<ThreeIcon theme="default" />}>
                      Third Item
                    </SwitcherItem>
                  </React.Fragment>
                ))}
              </Section>
              <ManageButton href="/some-href" />
            </SwitcherWrapper>
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

export const withIntlProvider = WrappedComponent => props => (
  <IntlProvider>
    <WrappedComponent {...props} />
  </IntlProvider>
);
