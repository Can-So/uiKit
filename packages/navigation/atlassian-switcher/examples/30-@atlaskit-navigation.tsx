import React, { Component } from 'react';
import AtlassianIcon from '@atlaskit/icon/glyph/atlassian';
import Navigation, { AkGlobalItem } from '@atlaskit/navigation';
import Tooltip from '@atlaskit/tooltip';
import SwitcherIcon from '@atlaskit/icon/glyph/app-switcher';
import { colors } from '@atlaskit/theme';
import AkDrawer from '@atlaskit/drawer';
import ConfluenceSwitcher from '../src/components/confluence-switcher';
import { mockEndpoints } from './helpers/mock-endpoints';
import { withAnalyticsLogger } from './helpers';

class ConfluenceSwitcherExample extends Component {
  state = {
    isDrawerOpen: false,
  };

  openDrawer = () => {
    mockEndpoints('confluence');
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
      <Navigation
        drawers={[
          <AkDrawer
            key="switcher"
            isOpen={this.state.isDrawerOpen}
            onClose={this.onClose}
          >
            <ConfluenceSwitcher
              cloudId="some-cloud-id"
              triggerXFlow={this.onTriggerXFlow}
            />
          </AkDrawer>,
        ]}
        globalPrimaryIcon={<AtlassianIcon size="large" label="Atlassian" />}
        globalPrimaryItemHref="/"
        globalSecondaryActions={[
          <AkGlobalItem key="switcher-global-item" onClick={this.openDrawer}>
            <Tooltip content="Switch apps" position="right">
              <SwitcherIcon
                label="Switch apps"
                size="medium"
                primaryColor={colors.N0}
                secondaryColor={colors.N800}
              />
            </Tooltip>
          </AkGlobalItem>,
        ]}
      />
    );
  }
}

export default withAnalyticsLogger(ConfluenceSwitcherExample);
