import * as React from 'react';
import {
  AppSwitcherWrapper,
  AppSwitcherItem,
  Section,
  ManageButton,
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

const XSellItemText = styled.span`
  margin-right: ${gridSize()}px;
`;

const RecentContainerImg = styled.img`
  width: 32px;
  height: 32px;
`;

interface JiraAppSwitcherProps {
  cloudId: string;
  triggerXFlow: (productKey: string) => void;
}

export default ({ cloudId, triggerXFlow }: JiraAppSwitcherProps) => {
  return (
    <RecentContainersProvider cloudId={cloudId}>
      {({
        isLoading: isLoadingRecentContainers,
        data: recentContainersData,
      }) => (
        <CustomLinksProvider>
          {({ isLoading: isLoadingCustomLinks, data: customLinksData }) => (
            <LicenseInformationProvider cloudId={cloudId}>
              {({
                isLoading: isLoadingLicenseInformation,
                data: licenseInformationData,
              }) => (
                <UserPermissionProvider
                  cloudId={cloudId}
                  permissionId={Permissions.MANAGE}
                >
                  {({
                    isLoading: isLoadingAdminPermission,
                    data: adminPermissionData,
                  }) => (
                    <AppSwitcherWrapper>
                      {!isLoadingAdminPermission &&
                        adminPermissionData &&
                        adminPermissionData.permitted &&
                        licenseInformationData && (
                          <Section title="Administration" isAdmin>
                            {getAdministrationLinks(
                              licenseInformationData.hostname,
                              cloudId,
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
                      {isLoadingLicenseInformation ||
                      isLoadingAdminPermission ? (
                        // TODO: Add proper skeleton component once it's ready https://hello.atlassian.net/browse/CEN-47
                        'Loading License Information...'
                      ) : (
                        <Section title="Products">
                          {licenseInformationData &&
                            adminPermissionData && [
                              ...getProductLinks(licenseInformationData).map(
                                productData => {
                                  const {
                                    label,
                                    icon,
                                    key,
                                    link,
                                  } = productData;
                                  return (
                                    <AppSwitcherItem
                                      key={key}
                                      icon={icon}
                                      href={link}
                                    >{`${label}`}</AppSwitcherItem>
                                  );
                                },
                              ),
                              ((
                                xSellProductLink: ProductLink | null,
                              ): React.ReactElement<any> | null =>
                                xSellProductLink && (
                                  <AppSwitcherItem
                                    key={xSellProductLink.key}
                                    icon={xSellProductLink.icon}
                                    onClick={() =>
                                      triggerXFlow(xSellProductLink.key)
                                    }
                                  >
                                    <XSellItemText>
                                      {xSellProductLink.label}
                                    </XSellItemText>
                                    <Lozenge appearance="inprogress" isBold>
                                      {adminPermissionData.permitted
                                        ? 'Try'
                                        : 'Request'}
                                    </Lozenge>
                                  </AppSwitcherItem>
                                ))(getXSellLink(licenseInformationData)),
                            ]}
                        </Section>
                      )}
                      {isLoadingCustomLinks ? (
                        // TODO: Add proper skeleton component once it's ready https://hello.atlassian.net/browse/CEN-47
                        'Loading Custom Links...'
                      ) : (
                        <Section title="More" isCustom>
                          {customLinksData &&
                            customLinksData[0].map(
                              ({ label, link }: CustomLink) => (
                                <AppSwitcherItem key={label} href={link}>
                                  {label}
                                </AppSwitcherItem>
                              ),
                            )}
                        </Section>
                      )}
                      {isLoadingRecentContainers ? (
                        // TODO: Add proper skeleton component once it's ready https://hello.atlassian.net/browse/CEN-47
                        'Loading Recent Containers...'
                      ) : (
                        <Section title="Recent Containers">
                          {recentContainersData &&
                            recentContainersData.data.map(
                              ({
                                objectId,
                                name,
                                url,
                                iconUrl,
                              }: RecentContainer) => (
                                <AppSwitcherItem
                                  key={objectId}
                                  icon={() => (
                                    <RecentContainerImg src={iconUrl} />
                                  )}
                                  href={url}
                                >
                                  {name}
                                </AppSwitcherItem>
                              ),
                            )}
                        </Section>
                      )}
                      {customLinksData && (
                        <ManageButton href={customLinksData[1]} />
                      )}
                    </AppSwitcherWrapper>
                  )}
                </UserPermissionProvider>
              )}
            </LicenseInformationProvider>
          )}
        </CustomLinksProvider>
      )}
    </RecentContainersProvider>
  );
};
