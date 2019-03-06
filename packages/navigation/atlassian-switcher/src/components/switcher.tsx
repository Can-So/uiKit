import * as React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import {
  SwitcherWrapper,
  SwitcherItem,
  Section,
  ManageButton,
  Skeleton,
} from '../primitives';
import {
  getLicensedProductLinks,
  getAdministrationLinks,
  getCustomLinkItems,
  getRecentLinkItems,
  SuggestedProductItemType,
  getFixedProductLinks,
} from '../utils/links';
import { ChildrenProps } from '../providers/as-data-provider';

import {
  CustomLinksProviderDataStructure,
  LicenseInformationDataStructure,
} from '../providers/types';
import { RecentContainersDataStructure } from '../providers/instance-data-providers';
import {
  analyticsAttributes,
  NavigationAnalyticsContext,
  SWITCHER_SUBJECT,
  RenderTracker,
} from '../utils/analytics';
import now from '../utils/performance-now';
import TryLozenge from '../primitives/try-lozenge';

const messages = defineMessages({
  switchTo: {
    id: 'fabric.atlassianSwitcher.switchTo',
    defaultMessage: 'Switch to',
    description:
      'In a context in which users are able to switch between products, this text is the title of the category displaying the products the user is able to switch to.',
  },
  switchToTooltip: {
    id: 'fabric.atlassianSwitcher.switchToTooltip',
    defaultMessage: 'Switch to …',
    description:
      'This text appears as a tooltip when a user hovers over the atlassian switcher icon before clicking on it.',
  },
  recent: {
    id: 'fabric.atlassianSwitcher.recent',
    defaultMessage: 'Recent',
    description:
      "In a context in which users are able to view recent projects or spaces they've viewed, this text is the title of the section displaying all the recent projects or spaces.",
  },
  more: {
    id: 'fabric.atlassianSwitcher.more',
    defaultMessage: 'More',
    description:
      'In a context in which users are able to view predefined custom links, this text is the title of the section displaying all existing custom links.',
  },
  try: {
    id: 'fabric.atlassianSwitcher.try',
    defaultMessage: 'Try',
    description:
      'This text appears as a way to encourage the user to try a new Atlassian product.',
  },
});

interface SwitcherProps {
  cloudId: string;
  triggerXFlow: (productKey: string, sourceComponent: string) => void;
  customLinks: ChildrenProps<CustomLinksProviderDataStructure>;
  suggestedProductLink: SuggestedProductItemType;
  recentContainers: ChildrenProps<RecentContainersDataStructure>;
  licenseInformation: ChildrenProps<LicenseInformationDataStructure>;
  managePermission: ChildrenProps<boolean>;
  addProductsPermission: ChildrenProps<boolean>;
  isXFlowEnabled: ChildrenProps<boolean>;
}

const getAnalyticsContext = (itemsCount: number) => ({
  source: 'atlassianSwitcher',
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

export const SwitchToTooltipText = (
  <FormattedMessage {...messages.switchToTooltip} />
);

export default class Switcher extends React.Component<SwitcherProps> {
  mountedAt?: number;

  componentDidMount() {
    this.mountedAt = now();
  }

  timeSinceMounted() {
    return Math.round(now() - this.mountedAt!);
  }

  triggerXFlow = () => {
    const { triggerXFlow, suggestedProductLink } = this.props;
    if (suggestedProductLink) {
      triggerXFlow(suggestedProductLink.key, 'atlassian-switcher');
    }
  };

  render() {
    const {
      cloudId,
      suggestedProductLink,
      customLinks: { isLoading: isLoadingCustomLinks, data: customLinksData },
      recentContainers: {
        isLoading: isLoadingRecentContainers,
        data: recentContainersData,
      },
      licenseInformation: {
        isLoading: isLoadingLicenseInformation,
        data: licenseInformationData,
      },
      managePermission: {
        isLoading: isLoadingManagePermission,
        data: managePermissionData,
      },
      addProductsPermission: {
        isLoading: isLoadingAddProductsPermission,
        data: addProductsPermissionData,
      },
      isXFlowEnabled: {
        isLoading: isLoadingIsXFlowEnabled,
        data: isXFlowEnabledData,
      },
    } = this.props;

    const isLoading =
      isLoadingCustomLinks ||
      isLoadingRecentContainers ||
      isLoadingLicenseInformation ||
      isLoadingManagePermission ||
      isLoadingAddProductsPermission ||
      isLoadingIsXFlowEnabled;

    if (isLoading) {
      return <Skeleton />;
    }

    const isAdmin = managePermissionData;
    const hasAdminLinks = managePermissionData || addProductsPermissionData;
    const hasSuggestedLinks = !!(isXFlowEnabledData && suggestedProductLink);
    const shouldShowManageListButton = isAdmin && customLinksData![0];

    const fixedProductLinks = getFixedProductLinks();
    const licensedProductLinks = getLicensedProductLinks(
      licenseInformationData!,
    );

    const adminLinks = hasAdminLinks
      ? getAdministrationLinks(cloudId, managePermissionData!)
      : [];

    const suggestedLinks = hasSuggestedLinks ? [suggestedProductLink!] : [];
    const recentLinks = getRecentLinkItems(recentContainersData!.data);
    const customLinks = getCustomLinkItems(customLinksData![0]);

    /**
     * It is essential that switchToLinks reflects the order corresponding nav items
     * are rendered below in the 'Switch to' section.
     */
    const switchToLinks = [
      ...licensedProductLinks,
      ...suggestedLinks,
      ...fixedProductLinks,
      ...adminLinks,
    ];

    const itemsCount =
      switchToLinks.length + recentLinks.length + customLinks.length;

    return (
      <NavigationAnalyticsContext data={getAnalyticsContext(itemsCount)}>
        <SwitcherWrapper>
          <RenderTracker
            subject={SWITCHER_SUBJECT}
            data={{ duration: this.timeSinceMounted() }}
          />
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
            {suggestedLinks.map(item => (
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
            {fixedProductLinks.map(item => (
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
          {shouldShowManageListButton && (
            <ManageButton href={customLinksData![1]} />
          )}
        </SwitcherWrapper>
      </NavigationAnalyticsContext>
    );
  }
}
