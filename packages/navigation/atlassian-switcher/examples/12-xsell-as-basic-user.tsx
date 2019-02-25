import React, { Component } from 'react';
import Button from '@atlaskit/button';
import Drawer from '@atlaskit/drawer';
import JiraSwitcher from '../src/components/jira-switcher';
import { mockEndpoints } from './helpers/mock-endpoints';
import { withAnalyticsLogger } from './helpers';

class JiraSwitcherExample extends Component {
  state = {
    isDrawerOpen: false,
  };

  componentDidMount() {
    this.openDrawer();
  }

  openDrawer = () => {
    mockEndpoints('jira', originalMockData => {
      return {
        ...originalMockData,
        LICENSE_INFORMATION_DATA: {
          hostname: 'https://some-random-instance.atlassian.net',
          firstActivationDate: 1492488658539,
          maintenanceEndDate: '2017-04-24',
          maintenanceStartDate: '2017-04-17',
          products: {
            'jira-software.ondemand': {
              billingPeriod: 'ANNUAL',
              state: 'ACTIVE',
            },
          },
        },
        USER_PERMISSION_DATA: {
          permitted: false,
        },
      };
    });
    this.setState({
      isDrawerOpen: true,
    });
  };

  onClose = () => {
    this.setState({
      isDrawerOpen: false,
    });
  };

  onTriggerXFlow = (productKey: string) => {
    console.log(`Triggering xflow for => ${productKey}`);
  };

  render() {
    return (
      <div style={{ padding: '2rem' }}>
        <Drawer onClose={this.onClose} isOpen={this.state.isDrawerOpen}>
          <JiraSwitcher
            cloudId="some-cloud-id"
            triggerXFlow={this.onTriggerXFlow}
          />
        </Drawer>
        <Button type="button" onClick={this.openDrawer}>
          Open drawer
        </Button>
      </div>
    );
  }
}

export default withAnalyticsLogger(JiraSwitcherExample);
