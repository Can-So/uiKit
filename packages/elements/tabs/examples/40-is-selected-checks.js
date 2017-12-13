// @flow

import React, { Component } from 'react';
import Tabs from '../src';
import type { TabData } from '../src/types';
import { Content } from './shared';

export const tabs = [
  {
    label: 'Tab 1',
    content: <Content>One</Content>,
    id: 'tab-1',
  },
  {
    label: 'Tab 2',
    content: <Content>Two</Content>,
    id: 'tab-2',
  },
  {
    label: 'Tab 3',
    content: <Content>Three</Content>,
    id: 'tab-3',
  },
  {
    label: 'Tab 4',
    content: <Content>Four</Content>,
    id: 'tab-4',
  },
];

const customIsSelectedFunction = (selectedTab: string, tab: TabData) =>
  selectedTab === tab.id;

class TabsWithCustomIsSelected extends Component<{}, { selectedTab: string }> {
  state = {
    selectedTab: 'tab-4',
  };

  onSelect = ({ id }) => this.setState({ selectedTab: id });

  render() {
    return (
      <Tabs
        tabs={tabs}
        selectedTab={this.state.selectedTab}
        isSelectedTest={customIsSelectedFunction}
        onSelect={this.onSelect}
      />
    );
  }
}

export default () => (
  <div>
    <h3>Determine selected tab by tab object equality (built-in)</h3>
    <Tabs tabs={tabs} defaultSelectedTab={tabs[1]} />
    <h3>Determine selected tab by tab index equality (in-built)</h3>
    <Tabs tabs={tabs} defaultSelectedTab={2} />
    <h3>With a custom isSelectedTest function</h3>
    <TabsWithCustomIsSelected />
  </div>
);
