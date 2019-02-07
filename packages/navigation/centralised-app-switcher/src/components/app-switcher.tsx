import * as React from 'react';
import {
  AppSwitcherWrapper,
  AppSwitcherItem,
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

import { SuggestedProductItemText, RecentContainerImg } from './styled';
import {
  CustomLinksProviderDataStructure,
  LicenseInformationDataStructure,
} from '../providers/types';
import {
  RecentContainersDataStructure,
  UserPermissionDataStructure,
} from '../providers/instance-data-providers';

interface AppSwitcherProps {
  cloudId: string;
  triggerXFlow: (productKey: string) => void;
  customLinks: ChildrenProps<CustomLinksProviderDataStructure>;
  suggestedProductLink: SuggestedProductLink;
  recentContainers: ChildrenProps<RecentContainersDataStructure>;
  licenseInformation: ChildrenProps<LicenseInformationDataStructure>;
  managePermission: ChildrenProps<UserPermissionDataStructure>;
  addProductsPermission: ChildrenProps<UserPermissionDataStructure>;
}

export default ({
  cloudId,
  triggerXFlow,
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
}: AppSwitcherProps) => (
  <AppSwitcherWrapper>
    {isLoadingRecentContainers && isLoadingCustomLinks && <Skeleton />}
    {!isLoadingManagePermission &&
      licenseInformationData &&
      managePermissionData &&
      addProductsPermissionData &&
      (managePermissionData.permitted ||
        addProductsPermissionData.permitted) && (
        <Section title="Administration" isAdmin>
          {getAdministrationLinks(cloudId, managePermissionData.permitted).map(
            ({ label, icon, key, link }) => (
              <AppSwitcherItem
                key={key}
                icon={icon}
                href={link}
              >{`${label}`}</AppSwitcherItem>
            ),
          )}
        </Section>
      )}
    {isLoadingLicenseInformation || isLoadingAddProductsPermission ? (
      <Skeleton />
    ) : (
      <Section title="Products">
        {licenseInformationData &&
          addProductsPermissionData && [
            ...getProductLinks(licenseInformationData).map(
              ({ label, icon, key, link }) => (
                <AppSwitcherItem
                  key={key}
                  icon={icon}
                  href={link}
                >{`${label}`}</AppSwitcherItem>
              ),
            ),
            suggestedProductLink && (
              <AppSwitcherItem
                key={suggestedProductLink.key}
                icon={suggestedProductLink.icon}
                onClick={() => triggerXFlow(suggestedProductLink.key)}
              >
                <SuggestedProductItemText>
                  {suggestedProductLink.label}
                </SuggestedProductItemText>
                <Lozenge appearance="inprogress" isBold>
                  {addProductsPermissionData.permitted ? 'Try' : 'Request'}
                </Lozenge>
              </AppSwitcherItem>
            ),
          ]}
      </Section>
    )}
    {isLoadingCustomLinks ? (
      <Skeleton />
    ) : (
      <Section title="More" isCustom>
        {customLinksData &&
          customLinksData[0].map(({ label, link }: CustomLink) => (
            <AppSwitcherItem key={label} href={link}>
              {label}
            </AppSwitcherItem>
          ))}
      </Section>
    )}
    {isLoadingRecentContainers ? (
      <Skeleton />
    ) : (
      <Section title="Recent Containers">
        {recentContainersData &&
          recentContainersData.data.map(
            ({ objectId, name, url, iconUrl }: RecentContainer) => (
              <AppSwitcherItem
                key={objectId}
                icon={() => <RecentContainerImg src={iconUrl} />}
                href={url}
              >
                {name}
              </AppSwitcherItem>
            ),
          )}
      </Section>
    )}
    {customLinksData && <ManageButton href={customLinksData[1]} />}
  </AppSwitcherWrapper>
);
