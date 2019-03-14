import * as React from 'react';
import Button from '@atlaskit/button';
import Drawer from '@atlaskit/drawer';
import { mockEndpoints, REQUEST_MEDIUM } from './helpers/mock-endpoints';
import { withAnalyticsLogger, withIntlProvider } from './helpers';
import AtlassianSwitcher from '../src';
import { resetAll } from '../src/providers/instance-data-providers';

class JiraSwitcherExample extends React.Component {
  state = {
    isAdmin: true,
    isDrawerOpen: false,
  };

  componentDidMount() {
    this.resetLicensedProducts();
  }

  private resetLicensedProducts() {
    mockEndpoints(
      'jira',
      originalMockData => {
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
        };
      },
      REQUEST_MEDIUM,
    );
  }

  addConfluence = () => {
    mockEndpoints(
      'jira',
      originalMockData => {
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
              'confluence.ondemand': {
                billingPeriod: 'ANNUAL',
                state: 'ACTIVE',
              },
            },
          },
        };
      },
      { ...REQUEST_MEDIUM, licenseInformation: 2000 },
    );
  };

  toggleIsAdmin = () => {
    this.setState({ isAdmin: !this.state.isAdmin }, () => {
      mockEndpoints(
        'jira',
        originalMockData => {
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
                'confluence.ondemand': {
                  billingPeriod: 'ANNUAL',
                  state: 'ACTIVE',
                },
              },
            },
            USER_PERMISSION_DATA: {
              permitted: this.state.isAdmin,
            },
          };
        },
        { ...REQUEST_MEDIUM, permitted: 2000 },
      );
    });
  };

  makeError = () => {
    mockEndpoints(
      'jira',
      originalMockData => {
        return {
          ...originalMockData,
          LICENSE_INFORMATION_DATA: 502,
        };
      },
      { ...REQUEST_MEDIUM, licenseInformation: 2000 },
    );
  };

  openDrawer = () => {
    this.setState({
      isDrawerOpen: true,
    });
  };

  clearCache = () => {
    resetAll();
  };

  onClose = () => {
    this.setState({
      isDrawerOpen: false,
    });
  };

  onTriggerXFlow = (productKey: string, sourceComponent: string) => {
    console.log(
      `Triggering xflow for => ${productKey} from ${sourceComponent}`,
    );
  };

  render() {
    const Separator = () => <div style={{ width: 16 }} />;
    return (
      <div style={{ padding: '2rem' }}>
        <Drawer onClose={this.onClose} isOpen={this.state.isDrawerOpen}>
          <AtlassianSwitcher
            product="jira"
            cloudId="some-cloud-id"
            triggerXFlow={this.onTriggerXFlow}
          />
        </Drawer>
        <div style={{ display: 'flex' }}>
          <Button type="button" onClick={this.openDrawer}>
            Open drawer
          </Button>
          <Separator />
          <Button type="button" onClick={this.addConfluence}>
            Add confluence
          </Button>
          <Separator />
          <Button type="button" onClick={this.toggleIsAdmin}>
            Toggle user is admin
          </Button>
          <Separator />
          <Button type="button" onClick={this.makeError}>
            Make error
          </Button>
          <Separator />
          <Button type="button" onClick={this.clearCache}>
            Clear cache
          </Button>
        </div>
      </div>
    );
  }
}

export default withIntlProvider(withAnalyticsLogger(JiraSwitcherExample));
