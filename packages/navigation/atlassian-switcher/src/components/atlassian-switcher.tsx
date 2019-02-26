import * as React from 'react';
import JiraSwitcher from './jira-switcher';
import ConfluenceSwitcher from './confluence-switcher';
import ErrorBoundary from './error-boundary';

interface AtlassianSwitcherProps {
  product: string;
  cloudId: string;
  triggerXFlow: (productKey: string, sourceComponent: string) => void;
}

const AtlassianSwitcher = ({
  product,
  cloudId,
  triggerXFlow,
  ...props
}: AtlassianSwitcherProps) => {
  let Switcher: React.ReactType;
  switch (product) {
    case 'jira':
      Switcher = JiraSwitcher;
      break;
    case 'confluence':
      Switcher = ConfluenceSwitcher;
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
      <Switcher cloudId={cloudId} triggerXFlow={triggerXFlow} {...props} />
    </ErrorBoundary>
  );
};

export default AtlassianSwitcher;
