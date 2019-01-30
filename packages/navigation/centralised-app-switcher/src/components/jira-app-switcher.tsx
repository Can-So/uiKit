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
  RecentContainersProvider,
  LicenseInformationProvider,
  UserPermissionProvider,
} from '../providers/instance-data-providers';
import { WithCloudId, RecentContainer, CustomLink } from '../types';
export default ({ cloudId }: WithCloudId) => {
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
                      {isLoadingRecentContainers ? (
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
                      )}
                      {isLoadingCustomLinks ? (
                        // TODO: Add proper skeleton component once it's ready https://hello.atlassian.net/browse/CEN-47
                        'Loading Custom Links...'
                      ) : (
                        <Section title="Custom Links">
                          {customLinksData &&
                            customLinksData[0].map(
                              ({ key, label }: CustomLink) => (
                                <AppSwitcherItem key={key}>
                                  {label}
                                </AppSwitcherItem>
                              ),
                            )}
                        </Section>
                      )}
                      {isLoadingLicenseInformation ? (
                        // TODO: Add proper skeleton component once it's ready https://hello.atlassian.net/browse/CEN-47
                        'Loading License Information...'
                      ) : (
                        <Section title="License Information">
                          {licenseInformationData &&
                            Object.keys(licenseInformationData.products).map(
                              productKey => (
                                <AppSwitcherItem
                                  key={productKey}
                                >{`${productKey} - ${
                                  licenseInformationData.products[productKey]
                                    .state
                                }`}</AppSwitcherItem>
                              ),
                            )}
                        </Section>
                      )}
                      {isLoadingAdminPermission ? (
                        // TODO: Add proper skeleton component once it's ready https://hello.atlassian.net/browse/CEN-47
                        'Loading Admin Permission...'
                      ) : (
                        <Section title="Admin Permission">
                          {adminPermissionData && (
                            <AppSwitcherItem>{`The user ${
                              adminPermissionData.permitted ? 'IS' : 'IS NOT'
                            } a site admin`}</AppSwitcherItem>
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
