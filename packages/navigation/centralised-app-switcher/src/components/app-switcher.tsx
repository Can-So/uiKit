import * as React from 'react';
import {
  AppSwitcherWrapper,
  AppSwitcherItem,
  Section,
  ManageButton,
  Skeleton,
} from '../primitives';
import {
  LicenseInformationProvider,
  Permissions,
  RecentContainersProvider,
  UserPermissionProvider,
  RecentContainersDataStructure,
  UserPermissionDataStructure,
} from '../providers/instance-data-providers';
import { CustomLink, RecentContainer, WithCloudId } from '../types';
import {
  getProductLinks,
  getAdministrationLinks,
  SuggestedProductLink,
} from '../utils/product-links';
import Lozenge from '@atlaskit/lozenge';
import { ChildrenProps } from '../providers/as-data-provider';
import { adopt } from 'react-adopt';
import {
  CustomLinksProviderDataStructure,
  LicenseInformationDataStructure,
} from '../providers/types';

import { SuggestedProductItemText, RecentContainerImg } from './styled';

interface AppSwitcherProps {
  cloudId: string;
  triggerXFlow: (productKey: string) => void;
  CustomLinksProvider: React.ReactType;
  SuggestedProductProvider: React.ReactType;
}

interface RenderProps {
  recentContainers: ChildrenProps<RecentContainersDataStructure>;
  customLinks: ChildrenProps<CustomLinksProviderDataStructure>;
  licenseInformation: ChildrenProps<LicenseInformationDataStructure>;
  managePermission: ChildrenProps<UserPermissionDataStructure>;
  addProductsPermission: ChildrenProps<UserPermissionDataStructure>;
}

export default ({
  cloudId,
  triggerXFlow,
  SuggestedProductProvider,
  CustomLinksProvider,
}: AppSwitcherProps) => {
  const ComposedDataProviders = adopt<RenderProps, WithCloudId>({
    recentContainers: <RecentContainersProvider cloudId={cloudId} />,
    customLinks: <CustomLinksProvider />,
    licenseInformation: <LicenseInformationProvider cloudId={cloudId} />,
    managePermission: (
      <UserPermissionProvider
        cloudId={cloudId}
        permissionId={Permissions.MANAGE}
      />
    ),
    addProductsPermission: (
      <UserPermissionProvider
        cloudId={cloudId}
        permissionId={Permissions.ADD_PRODUCTS}
      />
    ),
  });
  return (
    <ComposedDataProviders>
      {({
        recentContainers: {
          isLoading: isLoadingRecentContainers,
          data: recentContainersData,
        },
        customLinks: { isLoading: isLoadingCustomLinks, data: customLinksData },
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
      }: RenderProps) => (
        <AppSwitcherWrapper>
          {isLoadingRecentContainers && isLoadingCustomLinks && <Skeleton />}
          {!isLoadingManagePermission &&
            licenseInformationData &&
            managePermissionData &&
            addProductsPermissionData &&
            (managePermissionData.permitted ||
              addProductsPermissionData.permitted) && (
              <Section title="Administration" isAdmin>
                {getAdministrationLinks(
                  cloudId,
                  managePermissionData.permitted,
                ).map(({ label, icon, key, link }) => (
                  <AppSwitcherItem
                    key={key}
                    icon={icon}
                    href={link}
                  >{`${label}`}</AppSwitcherItem>
                ))}
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
                  <SuggestedProductProvider
                    licenseInformation={licenseInformationData}
                    key="suggestedProduct"
                  >
                    {({
                      data: suggestedProductLink,
                    }: ChildrenProps<SuggestedProductLink>) =>
                      suggestedProductLink && (
                        <AppSwitcherItem
                          icon={suggestedProductLink.icon}
                          onClick={() => triggerXFlow(suggestedProductLink.key)}
                        >
                          <SuggestedProductItemText>
                            {suggestedProductLink.label}
                          </SuggestedProductItemText>
                          <Lozenge appearance="inprogress" isBold>
                            {addProductsPermissionData.permitted
                              ? 'Try'
                              : 'Request'}
                          </Lozenge>
                        </AppSwitcherItem>
                      )
                    }
                  </SuggestedProductProvider>,
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
      )}
    </ComposedDataProviders>
  );
};
