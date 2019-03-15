import * as React from 'react';
import JiraSwitcher from './jira-switcher';
import ConfluenceSwitcher from './confluence-switcher';
import GenericSwitcher from './generic-switcher';
import ErrorBoundary from './error-boundary';
import { TriggerXFlowCallback, FeatureFlagProps, Product } from '../types';
import IntlProvider from './intl-provider';
import messages from '../utils/messages';
import {
  analyticsAttributes,
  NavigationAnalyticsContext,
} from '../utils/analytics';

type AtlassianSwitcherProps = {
  product: string;
  cloudId: string;
  triggerXFlow: TriggerXFlowCallback;
} & Partial<FeatureFlagProps>;

const getAnalyticsContext = (props: { [key: string]: any }) => ({
  source: 'atlassianSwitcher',
  ...analyticsAttributes({
    featureFlags: Object.keys(props)
      .filter(key => key.startsWith('enable'))
      .reduce(
        (acc, key) => ({
          ...acc,
          [key]: props[key],
        }),
        {} as object,
      ),
  }),
});

const AtlassianSwitcher = (props: AtlassianSwitcherProps) => {
  const { product } = props;

  let Switcher: React.ReactType;
  switch (product) {
    case Product.JIRA:
      Switcher = JiraSwitcher;
      break;
    case Product.CONFLUENCE:
      Switcher = ConfluenceSwitcher;
      break;
    default:
      Switcher = GenericSwitcher;
  }
  return (
    <IntlProvider>
      <NavigationAnalyticsContext data={getAnalyticsContext(props)}>
        <ErrorBoundary messages={messages}>
          <Switcher messages={messages} {...props} />
        </ErrorBoundary>
      </NavigationAnalyticsContext>
    </IntlProvider>
  );
};

export default AtlassianSwitcher;
