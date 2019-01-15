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
                'Loading Seconds Section...'
              ) : (
                <Section title="Second Section">
                  <Item>First Item</Item>
                  <Item>Second Item</Item>
                  <Item>{JSON.stringify(customLinksData)}</Item>
                </Section>
              )}
              <ManageButton />
            </AppSwitcherWrapper>
          )}
        </CustomLinksProvider>
      )}
    </RecentContainersProvider>
  );
};
