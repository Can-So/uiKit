import React from 'react';
import { AppSwitcherWrapper, Item, Section, ManageButton } from '../primitives';
import JiraDataProvider from '../providers/jira-data-provider';

export default ({ cloudId }) => {
  return (
    <JiraDataProvider cloudId={cloudId}>
      {({ isLoading, data }) =>
        isLoading ? (
          'Loading...'
        ) : (
          <AppSwitcherWrapper>
            <Section title="First Section">
              <Item>First Item</Item>
              <Item>Second Item</Item>
              <Item>Third Item</Item>
            </Section>
            <Section title="Second Section">
              <Item>First Item</Item>
              <Item>Second Item</Item>
              <Item>Third Item</Item>
            </Section>
            <ManageButton />
            {JSON.stringify(data)}
          </AppSwitcherWrapper>
        )
      }
    </JiraDataProvider>
  );
};
