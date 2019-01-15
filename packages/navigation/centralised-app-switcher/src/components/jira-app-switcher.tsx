import React from 'react';
import { AppSwitcherWrapper, Item, Section, ManageButton } from '../primitives';
import {
  RecentContainersProvider,
  CustomLinksProvider,
} from '../providers/jira-data-providers';

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
                'Loading First Section...'
              ) : (
                <Section title="First Section">
                  <Item>First Item</Item>
                  <Item>Second Item</Item>
                  <Item>{JSON.stringify(recentContainersData)}</Item>
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
                onClick={() => (window.location = customLinksData[1])}
              />
            </AppSwitcherWrapper>
          )}
        </CustomLinksProvider>
      )}
    </RecentContainersProvider>
  );
};
