//@flow
import React, { Component } from 'react';
import { AnalyticsListener } from '@atlaskit/analytics-next';
import Pagination from '../src';

type State = {
  analyticEvent: Object,
  items: Array<{ value: number }>,
  selected: number,
};

export default class extends Component<{}, State> {
  state = {
    analyticEvent: {},
    items: pageLinks,
    selected: 1,
  };

  onArrowClicked = (direction?: string) => {
    if (direction === 'previous') {
      this.setState({
        selected: this.state.selected - 1,
      });
    } else {
      this.setState({
        selected: this.state.selected + 1,
      });
    }
  };

  updateTheSelected = (newPage: number) => {
    this.setState({
      selected: newPage,
    });
  };

  sendAnalytics = (analyticEvent: Object) => {
    this.setState({
      analyticEvent,
    });
  };

  render() {
    const { analyticEvent, items } = this.state;
    return (
      <AnalyticsListener channel="atlaskit" onEvent={this.sendAnalytics}>
        <Pagination
          getPageLabel={page => (typeof page === 'object' ? page.value : page)}
          pages={items}
        />
        <h2>Analytics Event received</h2>
        <pre>{JSON.stringify(analyticEvent, null, 2)}</pre>
      </AnalyticsListener>
    );
  }
}

const pageLinks: Array<{ value: number }> = [...Array(13)].map((_, index) => ({
  value: index + 1,
}));
