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
} from '../providers/instance-data-providers';
import { CustomLink, RecentContainer } from '../types';
import {
  getProductLinks,
  getAdministrationLinks,
  SuggestedProductLink,
} from '../utils/product-links';
import Lozenge from '@atlaskit/lozenge';
import { ChildrenProps } from '../providers/as-data-provider';

import { SuggestedProductItemText, RecentContainerImg } from './styled';
import Composer from '../utils/data-provider-composer';

interface AppSwitcherProps {
  cloudId: string;
  triggerXFlow: (productKey: string) => void;
  CustomLinksProvider: React.ReactType;
  SuggestedProductProvider: React.ReactType;
}

export default ({
  cloudId,
  triggerXFlow,
  SuggestedProductProvider,
  CustomLinksProvider,
}: AppSwitcherProps) => (
  <Composer
    components={[
      <RecentContainersProvider key="recentContainers" cloudId={cloudId} />,
      <CustomLinksProvider key="customLinks" />,
      <LicenseInformationProvider key="licenseInformation" cloudId={cloudId} />,
      <UserPermissionProvider
        key="managePermission"
        cloudId={cloudId}
        permissionId={Permissions.MANAGE}
      />,
      <UserPermissionProvider
        key="addProductsPermission"
        cloudId={cloudId}
        permissionId={Permissions.ADD_PRODUCTS}
      />,
    ]}
  >
    {([
      { isLoading: isLoadingRecentContainers, data: recentContainersData },
      { isLoading: isLoadingCustomLinks, data: customLinksData },
      { isLoading: isLoadingLicenseInformation, data: licenseInformationData },
      { isLoading: isLoadingManagePermission, data: managePermissionData },
      {
        isLoading: isLoadingAddProductsPermission,
        data: addProductsPermissionData,
      },
    ]) => (
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
  </Composer>
);
