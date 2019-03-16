import * as React from 'react';
import AtlassianIcon from '@findable/icon/glyph/atlassian';
import Navigation, { AkGlobalItem } from '@findable/navigation';
import Tooltip from '@findable/tooltip';
import SwitcherIcon from '@findable/icon/glyph/app-switcher';
import { colors } from '@findable/theme';
import AkDrawer from '@findable/drawer';
import { mockEndpoints, REQUEST_MEDIUM } from './helpers/mock-endpoints';
import { withAnalyticsLogger, withIntlProvider } from './helpers';
import AtlassianSwitcher from '../src';
import PrefetchTrigger from '../src/components/prefetch-trigger';

class ConfluenceSwitcherExample extends React.Component {
  state = {
    isDrawerOpen: false,
  };

  componentDidMount() {
    mockEndpoints('confluence', undefined, REQUEST_MEDIUM);
  }

  openDrawer = () => {
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
      <Navigation
        drawers={[
          <AkDrawer
            key="switcher"
            isOpen={this.state.isDrawerOpen}
            onClose={this.onClose}
          >
            <AtlassianSwitcher
              product="confluence"
              cloudId="some-cloud-id"
              triggerXFlow={this.onTriggerXFlow}
            />
          </AkDrawer>,
        ]}
        globalPrimaryIcon={<AtlassianIcon size="large" label="Atlassian" />}
        globalPrimaryItemHref="/"
        globalSecondaryActions={[
          <PrefetchTrigger cloudId="some-cloud-id" key="switcher-global-item">
            <AkGlobalItem onClick={this.openDrawer}>
              <Tooltip content="Switch apps" position="right">
                <SwitcherIcon
                  label="Switch apps"
                  size="medium"
                  primaryColor={colors.N0}
                  secondaryColor={colors.N800}
                />
              </Tooltip>
            </AkGlobalItem>
          </PrefetchTrigger>,
        ]}
      />
    );
  }
}

export default withIntlProvider(withAnalyticsLogger(ConfluenceSwitcherExample));
