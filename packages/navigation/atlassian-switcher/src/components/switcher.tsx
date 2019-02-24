import * as React from 'react';
import {
  SwitcherWrapper,
  SwitcherItem,
  Section,
  ManageButton,
  Skeleton,
} from '../primitives';
import {
  getProductLinks,
  getAdministrationLinks,
  getCustomLinkItems,
  getRecentLinkItems,
  SuggestedProductItemType,
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
import { TryLozenge } from '../primitives/lozenge';

interface SwitcherProps {
  cloudId: string;
  triggerXFlow: (productKey: string) => void;
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
      triggerXFlow(suggestedProductLink.key);
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

    const canAddProduct = managePermissionData || addProductsPermissionData;
    const hasAdminLinks = managePermissionData || addProductsPermissionData;
    const hasSuggestedLinks = !!(isXFlowEnabledData && suggestedProductLink);

    const productLinks = getProductLinks(licenseInformationData!);

    const adminLinks = hasAdminLinks
      ? getAdministrationLinks(cloudId, managePermissionData!)
      : [];

    const suggestedLinks = hasSuggestedLinks ? [suggestedProductLink!] : [];
    const tryLozengeText = canAddProduct ? 'Try' : 'Request';

    const recentLinks = getRecentLinkItems(recentContainersData!.data);

    const customLinks = getCustomLinkItems(customLinksData![0]);

    const itemsCount =
      productLinks.length +
      suggestedLinks.length +
      adminLinks.length +
      recentLinks.length +
      customLinks.length;

    return (
      <NavigationAnalyticsContext data={getAnalyticsContext(itemsCount)}>
        <SwitcherWrapper>
          <RenderTracker
            subject={SWITCHER_SUBJECT}
            data={{ duration: this.timeSinceMounted() }}
          />
          <Section sectionId="switchTo" title="Switch to">
            {productLinks.map(({ key, label, Icon, href }, idx) => (
              <NavigationAnalyticsContext
                key={key}
                data={getItemAnalyticsContext(idx, key, 'product')}
              >
                <SwitcherItem icon={<Icon theme="product" />} href={href}>
                  {label}
                </SwitcherItem>
              </NavigationAnalyticsContext>
            ))}
            {suggestedLinks.map(({ key, label, Icon }, idx) => (
              <NavigationAnalyticsContext
                key={key}
                data={getItemAnalyticsContext(idx, key, 'try')}
              >
                <SwitcherItem
                  icon={<Icon theme="product" />}
                  onClick={this.triggerXFlow}
                >
                  {label}
                  <TryLozenge>{tryLozengeText}</TryLozenge>
                </SwitcherItem>
              </NavigationAnalyticsContext>
            ))}
            {adminLinks.map(({ key, label, href, Icon }, idx) => (
              <NavigationAnalyticsContext
                key={key}
                data={getItemAnalyticsContext(idx, key, 'admin')}
              >
                <SwitcherItem icon={<Icon theme="admin" />} href={href}>
                  {label}
                </SwitcherItem>
              </NavigationAnalyticsContext>
            ))}
          </Section>
          <Section sectionId="recent" title="Recent Containers">
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
          <Section sectionId="customLinks" title="More">
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
          {customLinksData && <ManageButton href={customLinksData[1]} />}
        </SwitcherWrapper>
      </NavigationAnalyticsContext>
    );
  }
}
