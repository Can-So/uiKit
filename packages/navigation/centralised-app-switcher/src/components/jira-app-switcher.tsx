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
import {
  getProductLinks,
  getAdministrationLinks,
} from '../utils/product-links';
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
                  {adminPermissionData &&
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
                      {licenseInformationData &&
                        getProductLinks(licenseInformationData).map(
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
                        )}
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
