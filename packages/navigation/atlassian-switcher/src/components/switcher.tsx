import * as React from 'react';
import {
  SwitcherWrapper,
  SwitcherItem,
  Section,
  ManageButton,
  Skeleton,
} from '../primitives';
import { CustomLink, RecentContainer } from '../types';
import {
  getProductLinks,
  getAdministrationLinks,
  SuggestedProductLink,
} from '../utils/product-links';
import Lozenge from '@atlaskit/lozenge';
import { ChildrenProps } from '../providers/as-data-provider';

import { SuggestedProductItemText } from './styled';
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

interface SwitcherProps {
  cloudId: string;
  triggerXFlow: (productKey: string) => void;
  customLinks: ChildrenProps<CustomLinksProviderDataStructure>;
  suggestedProductLink: SuggestedProductLink;
  recentContainers: ChildrenProps<RecentContainersDataStructure>;
  licenseInformation: ChildrenProps<LicenseInformationDataStructure>;
  managePermission: ChildrenProps<boolean>;
  addProductsPermission: ChildrenProps<boolean>;
  isXFlowEnabled: ChildrenProps<boolean>;
}

const getAnalyticsContext = (links: any, extraLinks: number) => ({
  source: 'atlassianSwitcher',
  ...analyticsAttributes({
    itemsCount:
      links.admin.length +
      links.products.length +
      links.custom.length +
      links.recent.length +
      extraLinks,
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

    const shouldRenderAdministrativeSection =
      managePermissionData || addProductsPermissionData;

    const shouldRenderXSellLink =
      suggestedProductLink && !isLoadingIsXFlowEnabled && isXFlowEnabledData;

    const isLoading =
      isLoadingCustomLinks ||
      isLoadingRecentContainers ||
      isLoadingLicenseInformation ||
      isLoadingManagePermission ||
      isLoadingAddProductsPermission ||
      isLoadingIsXFlowEnabled;

    const links = isLoading
      ? {
          admin: [],
          products: [],
          custom: [],
          recent: [],
        }
      : {
          admin: getAdministrationLinks(cloudId, managePermissionData!),
          products: getProductLinks(licenseInformationData!),
          custom: customLinksData![0],
          recent: recentContainersData!.data,
        };

    return isLoading ? (
      <Skeleton />
    ) : (
      <NavigationAnalyticsContext
        data={getAnalyticsContext(links, Number(shouldRenderXSellLink))}
      >
        <SwitcherWrapper>
          <RenderTracker
            subject={SWITCHER_SUBJECT}
            data={{ duration: this.timeSinceMounted() }}
          />

          {shouldRenderAdministrativeSection && (
            <Section sectionId="administration" title="Administration" isAdmin>
              {links.admin.map(({ label, icon, key, link }, idx) => (
                <NavigationAnalyticsContext
                  key={key}
                  data={getItemAnalyticsContext(idx, key, 'administration')}
                >
                  <SwitcherItem icon={icon} href={link}>
                    {label}
                  </SwitcherItem>
                </NavigationAnalyticsContext>
              ))}
            </Section>
          )}
          <Section sectionId="products" title="Products">
            {links.products.map(({ label, icon, key, link }, idx) => (
              <NavigationAnalyticsContext
                key={key}
                data={getItemAnalyticsContext(idx, key, 'product')}
              >
                <SwitcherItem icon={icon} href={link}>
                  {label}
                </SwitcherItem>
              </NavigationAnalyticsContext>
            ))}
            {shouldRenderXSellLink && (
              <NavigationAnalyticsContext
                data={getItemAnalyticsContext(
                  links.products.length,
                  suggestedProductLink!.key,
                  'try',
                )}
              >
                <SwitcherItem
                  icon={suggestedProductLink!.icon}
                  onClick={this.triggerXFlow}
                >
                  <SuggestedProductItemText>
                    {suggestedProductLink!.label}
                  </SuggestedProductItemText>
                  <Lozenge appearance="inprogress" isBold>
                    {addProductsPermissionData ? 'Try' : 'Request'}
                  </Lozenge>
                </SwitcherItem>
              </NavigationAnalyticsContext>
            )}
          </Section>
          <Section sectionId="customLinks" title="More" isCustom>
            {links.custom.map(({ label, link }: CustomLink, idx) => (
              // todo: id in SwitcherItem should be consumed from custom link resolver
              <NavigationAnalyticsContext
                key={idx + '.' + label}
                data={getItemAnalyticsContext(idx, null, 'customLink')}
              >
                <SwitcherItem href={link}>{label}</SwitcherItem>
              </NavigationAnalyticsContext>
            ))}
          </Section>
          <Section sectionId="recent" title="Recent Containers">
            {links.recent.map(
              (
                { objectId, name, url, iconUrl, type }: RecentContainer,
                idx,
              ) => (
                <NavigationAnalyticsContext
                  key={objectId}
                  data={getItemAnalyticsContext(idx, type, 'recent')}
                >
                  <SwitcherItem iconUrl={iconUrl} href={url}>
                    {name}
                  </SwitcherItem>
                </NavigationAnalyticsContext>
              ),
            )}
          </Section>
          {customLinksData && <ManageButton href={customLinksData[1]} />}
        </SwitcherWrapper>
      </NavigationAnalyticsContext>
    );
  }
}
