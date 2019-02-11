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

    return isLoadingCustomLinks ||
      isLoadingRecentContainers ||
      isLoadingLicenseInformation ||
      isLoadingManagePermission ||
      isLoadingAddProductsPermission ||
      isLoadingIsXFlowEnabled ? (
      <Skeleton />
    ) : (
      <SwitcherWrapper>
        {shouldRenderAdministrativeSection && (
          <Section title="Administration" isAdmin>
            {getAdministrationLinks(cloudId, managePermissionData!).map(
              ({ label, icon, key, link }) => (
                <SwitcherItem key={key} icon={icon} href={link}>
                  {label}
                </SwitcherItem>
              ),
            )}
          </Section>
        )}
        <Section title="Products">
          {[
            ...getProductLinks(licenseInformationData!).map(
              ({ label, icon, key, link }) => (
                <SwitcherItem key={key} icon={icon} href={link}>
                  {label}
                </SwitcherItem>
              ),
            ),
            shouldRenderXSellLink ? (
              <SwitcherItem
                key={suggestedProductLink!.key}
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
            ) : null,
          ]}
        </Section>
        <Section title="More" isCustom>
          {customLinksData![0].map(({ label, link }: CustomLink) => (
            <SwitcherItem key={label} href={link}>
              {label}
            </SwitcherItem>
          ))}
        </Section>
        <Section title="Recent Containers">
          {recentContainersData!.data.map(
            ({ objectId, name, url, iconUrl }: RecentContainer) => (
              <SwitcherItem key={objectId} iconUrl={iconUrl} href={url}>
                {name}
              </SwitcherItem>
            ),
          )}
        </Section>
        Î{customLinksData && <ManageButton href={customLinksData[1]} />}
      </SwitcherWrapper>
    );
  }
}
