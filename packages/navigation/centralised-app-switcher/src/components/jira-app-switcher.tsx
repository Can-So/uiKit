import React from 'react';
import {
  AppSwitcherWrapper,
  AppSwitcherItem,
  Section,
  ManageButton,
} from '../primitives';
import { CustomLinksProvider } from '../providers/jira-data-providers';
import {
  RecentContainersProvider,
  LicenseInformationProvider,
} from '../providers/instance-data-providers';

export default ({ cloudId }) => {
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
                <AppSwitcherWrapper>
                  {isLoadingRecentContainers ? (
                    'Loading Recent Containers...'
                  ) : (
                    <Section title="Recent Containers">
                      {recentContainersData.data.map(({ objectId, name }) => (
                        <AppSwitcherItem key={objectId}>{name}</AppSwitcherItem>
                      ))}
                    </Section>
                  )}
                  {isLoadingCustomLinks ? (
                    'Loading Custom Links...'
                  ) : (
                    <Section title="Custom Links">
                      {customLinksData[0].map(({ key, label }) => (
                        <AppSwitcherItem key={key}>{label}</AppSwitcherItem>
                      ))}
                    </Section>
                  )}
                  {isLoadingLicenseInformation ? (
                    'Loading License Information...'
                  ) : (
                    <Section title="License Information">
                      {Object.entries(licenseInformationData.products).map(
                        ([productKey, { state }]) => (
                          <AppSwitcherItem
                            key={productKey}
                          >{`${productKey} - ${state}`}</AppSwitcherItem>
                        ),
                      )}
                    </Section>
                  )}
                  <ManageButton
                    onClick={() => (window.location.href = customLinksData[1])}
                  />
                </AppSwitcherWrapper>
              )}
            </LicenseInformationProvider>
          )}
        </CustomLinksProvider>
      )}
    </RecentContainersProvider>
  );
};
