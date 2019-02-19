import * as React from 'react';
import {
  SwitcherView,
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
import { analyticsAttributes, NavigationAnalyticsContext } from '../utils/analytics';

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

const getAnalyticsContext = (links: any, extraLinks: number) => analyticsAttributes({
  itemsCount:
    links.admin.length +
    links.products.length +
    links.custom.length +
    links.recent.length +
    extraLinks,
});

const getExtraItemAnalyticsContext = (index: number) => analyticsAttributes({
  groupItemIndex: index,
});

export default class Switcher extends React.Component<SwitcherProps> {
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
        <SwitcherView>
          {shouldRenderAdministrativeSection && (
            <Section id="administration" title="Administration" isAdmin>
              {links.admin.map(({ label, icon, key, link }, idx) => (
                <NavigationAnalyticsContext
                  key={key}
                  data={getExtraItemAnalyticsContext(idx)}
                >
                  <SwitcherItem
                    type="administration"
                    id={key}
                    icon={icon}
                    href={link}
                  >
                    {label}
                  </SwitcherItem>
                </NavigationAnalyticsContext>
              ))}
            </Section>
          )}
          <Section id="products" title="Products">
            {links.products.map(({ label, icon, key, link }, idx) => (
              <NavigationAnalyticsContext
                key={key}
                data={getExtraItemAnalyticsContext(idx)}
              >
                <SwitcherItem type="product" id={key} icon={icon} href={link}>
                  {label}
                </SwitcherItem>
              </NavigationAnalyticsContext>
            ))}
            {shouldRenderXSellLink && (
              <NavigationAnalyticsContext
                data={getExtraItemAnalyticsContext(links.products.length)}
              >
                <SwitcherItem
                  type="try"
                  id={suggestedProductLink!.key}
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
          <Section id="customLinks" title="More" isCustom>
            {links.custom.map(({ label, link }: CustomLink, idx) => (
              // todo: id in SwitcherItem should be consumed from custom link resolver
              <NavigationAnalyticsContext
                key={idx + '.' + label}
                data={getExtraItemAnalyticsContext(idx)}
              >
                <SwitcherItem type="customLink" id={label} href={link}>
                  {label}
                </SwitcherItem>
              </NavigationAnalyticsContext>
            ))}
          </Section>
          <Section id="recent" title="Recent Containers">
            {links.recent.map(
              (
                { objectId, name, url, iconUrl, type }: RecentContainer,
                idx,
              ) => (
                <NavigationAnalyticsContext
                  key={objectId}
                  data={getExtraItemAnalyticsContext(idx)}
                >
                  <SwitcherItem
                    type="recentContainer"
                    id={type}
                    iconUrl={iconUrl}
                    href={url}
                  >
                    {name}
                  </SwitcherItem>
                </NavigationAnalyticsContext>
              ),
            )}
          </Section>
          {customLinksData && <ManageButton href={customLinksData[1]} />}
        </SwitcherView>
      </NavigationAnalyticsContext>
    );
  }
}
