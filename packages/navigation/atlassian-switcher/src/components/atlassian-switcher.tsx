import * as React from 'react';
import JiraSwitcher from './jira-switcher';
import ConfluenceSwitcher from './confluence-switcher';
import GenericSwitcher from './generic-switcher';
import ErrorBoundary from './error-boundary';
import IntlProvider from './intl-provider';
import messages from '../utils/messages';
import { Product } from '../types';

interface AtlassianSwitcherProps {
  product: string;
  cloudId: string;
  locale?: string;
  triggerXFlow: (productKey: string, sourceComponent: string) => void;
}

const AtlassianSwitcher = ({
  product,
  cloudId,
  triggerXFlow,
  locale = 'en',
  ...props
}: AtlassianSwitcherProps) => {
  let Switcher: React.ReactType;
  switch (product) {
    case Product.JIRA:
      Switcher = JiraSwitcher;
      break;
    case Product.CONFLUENCE:
      Switcher = ConfluenceSwitcher;
      break;
    case Product.HOME:
    case Product.PEOPLE:
    case Product.SITE_ADMIN:
    case Product.TRUSTED_ADMIN:
      Switcher = GenericSwitcher;
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
      <IntlProvider locale={locale}>
        <Switcher
          cloudId={cloudId}
          triggerXFlow={triggerXFlow}
          messages={messages}
          {...props}
        />
      </IntlProvider>
    </ErrorBoundary>
  );
};

export default AtlassianSwitcher;
