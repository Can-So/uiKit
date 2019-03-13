import * as React from 'react';
import Button from '@atlaskit/button';
import Drawer from '@atlaskit/drawer';
import { mockEndpoints, REQUEST_MEDIUM } from './helpers/mock-endpoints';
import { withAnalyticsLogger, withIntlProvider } from './helpers';
import AtlassianSwitcher, { AtlassianSwitcherPrefetchTrigger } from '../src';
import { resetAll } from '../src/providers/instance-data-providers';

class JiraSwitcherExample extends React.Component {
  state = {
    isDrawerOpen: false,
  };

  componentDidMount() {
    mockEndpoints('jira', undefined, REQUEST_MEDIUM);
  }

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
    const CLOUD_ID = 'some-cloud-id';

    return (
      <div style={{ padding: '2rem' }}>
        <Drawer onClose={this.onClose} isOpen={this.state.isDrawerOpen}>
          <AtlassianSwitcher
            product="jira"
            cloudId={CLOUD_ID}
            triggerXFlow={this.onTriggerXFlow}
          />
        </Drawer>
        <div style={{ display: 'flex' }}>
          <AtlassianSwitcherPrefetchTrigger cloudId={CLOUD_ID}>
            <Button type="button" onClick={this.openDrawer}>
              Open drawer
            </Button>
          </AtlassianSwitcherPrefetchTrigger>
          <div style={{ width: 16 }} />
          <Button type="button" onClick={this.clearCache}>
            Clear cache
          </Button>
        </div>
      </div>
    );
  }
}

export default withIntlProvider(withAnalyticsLogger(JiraSwitcherExample));
