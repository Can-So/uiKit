import React from 'react';
import {
  AppSwitcherWrapper,
  AppSwitcherItem,
  Section,
  ManageButton,
} from '../primitives';
import { CustomLinksProvider } from '../providers/confluence-data-providers';
import { RecentContainersProvider } from '../providers/instance-data-providers';

export default ({ cloudId }) => {
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
              <ManageButton
                onClick={() => (window.location.href = customLinksData[1])}
              />
            </AppSwitcherWrapper>
          )}
        </CustomLinksProvider>
      )}
    </RecentContainersProvider>
  );
};
