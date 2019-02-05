import * as React from 'react';
import {
  AppSwitcherWrapper,
  AppSwitcherItem,
  Section,
  ManageButton,
  Skeleton,
} from '../primitives';
import { CustomLinksProvider } from '../providers/jira-data-providers';
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
  getXSellLink,
  ProductLink,
} from '../utils/product-links';
import { gridSize } from '@atlaskit/theme';
import Lozenge from '@atlaskit/lozenge';
import styled from 'styled-components';
import Composer from '../utils/data-provider-composer';

const XSellItemText = styled.span`
  margin-right: ${gridSize()}px;
`;

const RecentContainerImg = styled.img`
  width: ${gridSize() * 4}px;
  height: ${gridSize() * 4}px;
`;

interface JiraAppSwitcherProps {
  cloudId: string;
  triggerXFlow: (productKey: string) => void;
}

export default ({ cloudId, triggerXFlow }: JiraAppSwitcherProps) => (
  <Composer
    components={[
      <RecentContainersProvider cloudId={cloudId} />,
      <CustomLinksProvider />,
      <LicenseInformationProvider cloudId={cloudId} />,
      <UserPermissionProvider
        cloudId={cloudId}
        permissionId={Permissions.MANAGE}
      />,
      <UserPermissionProvider
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
              ).map(linkData => {
                const { label, icon, key, link } = linkData;
                return (
                  <AppSwitcherItem
                    key={key}
                    icon={icon}
                    href={link}
                  >{`${label}`}</AppSwitcherItem>
                );
              })}
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
                ((
                  xSellProductLink: ProductLink | null,
                ): React.ReactElement<any> | null =>
                  xSellProductLink && (
                    <AppSwitcherItem
                      key={xSellProductLink.key}
                      icon={xSellProductLink.icon}
                      onClick={() => triggerXFlow(xSellProductLink.key)}
                    >
                      <XSellItemText>{xSellProductLink.label}</XSellItemText>
                      <Lozenge appearance="inprogress" isBold>
                        {addProductsPermissionData.permitted
                          ? 'Try'
                          : 'Request'}
                      </Lozenge>
                    </AppSwitcherItem>
                  ))(getXSellLink(licenseInformationData)),
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
