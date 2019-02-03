import * as React from 'react';
import {
  AppSwitcherWrapper,
  AppSwitcherItem,
  Section,
  ManageButton,
} from '../primitives';
import { CustomLinksProvider } from '../providers/jira-data-providers';
import {
  Permissions,
  LicenseInformationProvider,
  UserPermissionProvider,
} from '../providers/instance-data-providers';
import { WithCloudId, CustomLink } from '../types';
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

export default ({ cloudId }: WithCloudId) => {
  return (
    // <RecentContainersProvider cloudId={cloudId}>
    //   {({
    //     isLoading: isLoadingRecentContainers,
    //     data: recentContainersData,
    //   }) => (
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
                  {isLoadingLicenseInformation ? (
                    // TODO: Add proper skeleton component once it's ready https://hello.atlassian.net/browse/CEN-47
                    'Loading License Information...'
                  ) : (
                    <Section title="Applications">
                      {licenseInformationData && [
                        ...getProductLinks(licenseInformationData).map(
                          productData => {
                            const { label, icon, key, link } = productData;
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
                              href={xSellProductLink.link}
                            >
                              <XSellItemText>
                                {xSellProductLink.label}
                              </XSellItemText>
                              <Lozenge appearance="inprogress" isBold>
                                Try
                              </Lozenge>
                            </AppSwitcherItem>
                          ))(getXSellLink(licenseInformationData)),
                      ]}
                    </Section>
                  )}
                  {/* {isLoadingRecentContainers ? (
                        // TODO: Add proper skeleton component once it's ready https://hello.atlassian.net/browse/CEN-47
                        'Loading Recent Containers...'
                      ) : (
                        <Section title="Recent Containers">
                          {recentContainersData &&
                            recentContainersData.data.map(
                              ({ objectId, name }: RecentContainer) => (
                                <AppSwitcherItem key={objectId}>
                                  {name}
                                </AppSwitcherItem>
                              ),
                            )}
                        </Section>
                      )} */}
                  {isLoadingCustomLinks ? (
                    // TODO: Add proper skeleton component once it's ready https://hello.atlassian.net/browse/CEN-47
                    'Loading Custom Links...'
                  ) : (
                    <Section title="More" isCustom>
                      {customLinksData &&
                        customLinksData[0].map(({ label }: CustomLink) => (
                          <AppSwitcherItem key={label}>{label}</AppSwitcherItem>
                        ))}
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
    //   )}
    // </RecentContainersProvider>
  );
};
