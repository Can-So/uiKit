import React, { Component } from 'react';
import Button from '@atlaskit/button';
import Drawer from '@atlaskit/drawer';
import { mockEndpoints, REQUEST_MEDIUM } from './helpers/mock-endpoints';
import { withAnalyticsLogger, withIntlProvider } from './helpers';
import AtlassianSwitcher from '../src';

class ConfluenceSwitcherExample extends Component {
  state = {
    isDrawerOpen: false,
  };

  componentDidMount() {
    this.openDrawer();
  }

  openDrawer = () => {
    mockEndpoints('confluence', undefined, REQUEST_MEDIUM);
    this.setState({
      isDrawerOpen: true,
    });
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
    return (
      <div style={{ padding: '2rem' }}>
        <Drawer onClose={this.onClose} isOpen={this.state.isDrawerOpen}>
          <AtlassianSwitcher
            product="confluence"
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

export default withIntlProvider(withAnalyticsLogger(ConfluenceSwitcherExample));
