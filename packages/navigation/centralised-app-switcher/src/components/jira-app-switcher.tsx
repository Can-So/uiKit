import React from 'react';
import { AppSwitcherWrapper, Item, Section, ManageButton } from '../primitives';
import { CustomLinksProvider } from '../providers/jira-data-providers';
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
                    <Item key={objectId}>{name}</Item>
                  ))}
                </Section>
              )}
              {isLoadingCustomLinks ? (
                'Loading Custom Links...'
              ) : (
                <Section title="Custom Links">
                  {customLinksData[0].map(({ key, label }) => (
                    <Item key={key}>{label}</Item>
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
