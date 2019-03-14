import * as React from 'react';
import { Messages } from 'react-intl';
import * as isEqual from 'lodash.isequal';

import {
  SwitcherWrapper,
  SwitcherItem,
  Section,
  ManageButton,
  Skeleton,
} from '../primitives';
import { SwitcherItemType, RecentItemType } from '../utils/links';

import {
  analyticsAttributes,
  NavigationAnalyticsContext,
  SWITCHER_SUBJECT,
  RenderTracker,
} from '../utils/analytics';
import now from '../utils/performance-now';
import FormattedMessage from '../primitives/formatted-message';
import TryLozenge from '../primitives/try-lozenge';
import { TriggerXFlowCallback, FeatureFlagProps } from '../types';

type SwitcherProps = {
  messages: Messages;
  triggerXFlow: TriggerXFlowCallback;
  isLoading: boolean;
  licensedProductLinks: SwitcherItemType[];
  suggestedProductLinks: SwitcherItemType[];
  fixedLinks: SwitcherItemType[];
  adminLinks: SwitcherItemType[];
  recentLinks: RecentItemType[];
  customLinks: SwitcherItemType[];
  manageLink?: string;
} & FeatureFlagProps;

const getAnalyticsContext = (itemsCount: number) => ({
  ...analyticsAttributes({
    itemsCount,
  }),
});

const getItemAnalyticsContext = (
  index: number,
  id: string | null,
  type: string,
) => ({
  ...analyticsAttributes({
    groupItemIndex: index,
    itemId: id,
    itemType: type,
  }),
});

export default class Switcher extends React.Component<SwitcherProps> {
  mountedAt?: number;

  componentDidMount() {
    this.mountedAt = now();
  }

  timeSinceMounted(): number {
    return this.mountedAt ? Math.round(now() - this.mountedAt) : 0;
  }

  triggerXFlow = () => {
    const { triggerXFlow, suggestedProductLinks } = this.props;
    if (suggestedProductLinks.length) {
      triggerXFlow(suggestedProductLinks[0].key, 'atlassian-switcher');
    }
  };

  shouldComponentUpdate(nextProps: SwitcherProps) {
    return !(isEqual(this.props, nextProps) as boolean);
  }

  render() {
    const {
      messages,
      licensedProductLinks,
      suggestedProductLinks,
      fixedLinks,
      adminLinks,
      recentLinks,
      customLinks,
      manageLink,
      isLoading,
    } = this.props;

    /**
     * It is essential that switchToLinks reflects the order corresponding nav items
     * are rendered below in the 'Switch to' section.
     */
    const switchToLinks = [
      ...licensedProductLinks,
      ...suggestedProductLinks,
      ...fixedLinks,
      ...adminLinks,
    ];

    const itemsCount =
      switchToLinks.length + recentLinks.length + customLinks.length;

    const firstContentArrived = Boolean(licensedProductLinks.length);

    return (
      <NavigationAnalyticsContext data={getAnalyticsContext(itemsCount)}>
        <SwitcherWrapper>
          {firstContentArrived && (
            <RenderTracker
              subject={SWITCHER_SUBJECT}
              data={{ duration: this.timeSinceMounted() }}
            />
          )}
          <Section
            sectionId="switchTo"
            title={<FormattedMessage {...messages.switchTo} />}
          >
            {licensedProductLinks.map(item => (
              <NavigationAnalyticsContext
                key={item.key}
                data={getItemAnalyticsContext(
                  switchToLinks.indexOf(item),
                  item.key,
                  'product',
                )}
              >
                <SwitcherItem
                  icon={<item.Icon theme="product" />}
                  href={item.href}
                >
                  {item.label}
                </SwitcherItem>
              </NavigationAnalyticsContext>
            ))}
            {suggestedProductLinks.map(item => (
              <NavigationAnalyticsContext
                key={item.key}
                data={getItemAnalyticsContext(
                  switchToLinks.indexOf(item),
                  item.key,
                  'try',
                )}
              >
                <SwitcherItem
                  icon={<item.Icon theme="product" />}
                  onClick={this.triggerXFlow}
                >
                  {item.label}
                  <TryLozenge>
                    <FormattedMessage {...messages.try} />
                  </TryLozenge>
                </SwitcherItem>
              </NavigationAnalyticsContext>
            ))}
            {fixedLinks.map(item => (
              <NavigationAnalyticsContext
                key={item.key}
                data={getItemAnalyticsContext(
                  switchToLinks.indexOf(item),
                  item.key,
                  'product',
                )}
              >
                <SwitcherItem
                  icon={<item.Icon theme="product" />}
                  href={item.href}
                >
                  {item.label}
                </SwitcherItem>
              </NavigationAnalyticsContext>
            ))}
            {adminLinks.map(item => (
              <NavigationAnalyticsContext
                key={item.key}
                data={getItemAnalyticsContext(
                  switchToLinks.indexOf(item),
                  item.key,
                  'admin',
                )}
              >
                <SwitcherItem
                  icon={<item.Icon theme="admin" />}
                  href={item.href}
                >
                  {item.label}
                </SwitcherItem>
              </NavigationAnalyticsContext>
            ))}
          </Section>
          <Section
            sectionId="recent"
            title={<FormattedMessage {...messages.recent} />}
          >
            {recentLinks.map(
              ({ key, label, href, type, description, Icon }, idx) => (
                <NavigationAnalyticsContext
                  key={key}
                  data={getItemAnalyticsContext(idx, type, 'recent')}
                >
                  <SwitcherItem
                    icon={<Icon theme="recent" />}
                    description={description}
                    href={href}
                  >
                    {label}
                  </SwitcherItem>
                </NavigationAnalyticsContext>
              ),
            )}
          </Section>
          <Section
            sectionId="customLinks"
            title={<FormattedMessage {...messages.more} />}
          >
            {customLinks.map(({ label, href, Icon }, idx) => (
              // todo: id in SwitcherItem should be consumed from custom link resolver
              <NavigationAnalyticsContext
                key={idx + '.' + label}
                data={getItemAnalyticsContext(idx, null, 'customLink')}
              >
                <SwitcherItem icon={<Icon theme="custom" />} href={href}>
                  {label}
                </SwitcherItem>
              </NavigationAnalyticsContext>
            ))}
          </Section>
          {isLoading && <Skeleton />}
          {manageLink && <ManageButton href={manageLink} />}
        </SwitcherWrapper>
      </NavigationAnalyticsContext>
    );
  }
}
