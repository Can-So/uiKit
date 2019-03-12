import * as React from 'react';
import JiraSwitcher from './jira-switcher';
import ConfluenceSwitcher from './confluence-switcher';
import GenericSwitcher from './generic-switcher';
import ErrorBoundary from './error-boundary';
import IntlProvider from './intl-provider';
import messages from '../utils/messages';
import { FeatureFlagProps, Product } from '../types';
import {
  analyticsAttributes,
  NavigationAnalyticsContext,
} from '../utils/analytics';

type AtlassianSwitcherProps = {
  product: string;
  cloudId: string;
  triggerXFlow: (productKey: string, sourceComponent: string) => void;
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
        {} as { [key: string]: any },
      ),
  }),
});

const AtlassianSwitcher = ({
  product,
  cloudId,
  triggerXFlow,
  enableSplitJira = false,
  ...props
}: AtlassianSwitcherProps) => {
  let switcher: React.ReactElement<any>;
  switch (product) {
    case Product.JIRA:
      switcher = (
        <JiraSwitcher
          cloudId={cloudId}
          triggerXFlow={triggerXFlow}
          enableSplitJira={enableSplitJira}
          messages={messages}
          {...props}
        />
      );
      break;
    case Product.CONFLUENCE:
      switcher = (
        <ConfluenceSwitcher
          cloudId={cloudId}
          triggerXFlow={triggerXFlow}
          enableSplitJira={enableSplitJira}
          messages={messages}
          {...props}
        />
      );
      break;
    case Product.HOME:
    case Product.PEOPLE:
    case Product.SITE_ADMIN:
    case Product.TRUSTED_ADMIN:
      switcher = (
        <GenericSwitcher
          cloudId={cloudId}
          triggerXFlow={triggerXFlow}
          product={product}
          enableSplitJira={enableSplitJira}
          messages={messages}
          {...props}
        />
      );
      break;
    default:
      if (process.env.NODE_ENV !== 'production') {
        // tslint:disable-next-line:no-console
        console.warn(
          `Product key ${product} provided to Atlassian Switcher doesn't have a corresponding product specific implementation.`,
        );
      }
      return null;
  }
  return (
    <ErrorBoundary>
      <NavigationAnalyticsContext data={getAnalyticsContext(props)}>
        <IntlProvider>{switcher}</IntlProvider>
      </NavigationAnalyticsContext>
    </ErrorBoundary>
  );
};

export default AtlassianSwitcher;
