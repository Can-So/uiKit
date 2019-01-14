import React, { Component } from 'react';
import { AppSwitcherWrapper, Item, Section, ManageButton } from './primitives';
import MockProvider from './providers/mock-provider';

class AppSwitcher extends Component {
  render() {
    return (
      <MockProvider>
        {({ isLoading }) =>
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
            </AppSwitcherWrapper>
          )
        }
      </MockProvider>
    );
  }
}

export default AppSwitcher;
