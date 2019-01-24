import * as React from 'react';
import {
  AppSwitcherWrapper,
  AppSwitcherItem,
  Section,
  ManageButton,
} from '../primitives';
import { CustomLinksProvider } from '../providers/confluence-data-providers';
import { RecentContainersProvider } from '../providers/instance-data-providers';
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
            <AppSwitcherWrapper>
              {isLoadingRecentContainers ? (
                'Loading Recent Containers...'
              ) : (
                <Section title="Recent Containers">
                  {recentContainersData &&
                    recentContainersData.data.map(
                      ({ objectId, name }: RecentContainer) => (
                        <AppSwitcherItem key={objectId}>{name}</AppSwitcherItem>
                      ),
                    )}
                </Section>
              )}
              {isLoadingCustomLinks ? (
                'Loading Custom Links...'
              ) : (
                <Section title="Custom Links">
                  {customLinksData &&
                    customLinksData[0].map(({ key, label }: CustomLink) => (
                      <AppSwitcherItem key={key}>{label}</AppSwitcherItem>
                    ))}
                </Section>
              )}
              <ManageButton
                onClick={() =>
                  customLinksData && (window.location.href = customLinksData[1])
                }
              />
            </AppSwitcherWrapper>
          )}
        </CustomLinksProvider>
      )}
    </RecentContainersProvider>
  );
};
