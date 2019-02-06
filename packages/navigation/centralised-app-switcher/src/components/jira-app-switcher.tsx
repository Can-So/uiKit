import * as React from 'react';
import AppSwitcher from './app-switcher';
import {
  CustomLinksProvider,
  SuggestedProductProvider,
} from '../providers/jira-data-providers';

interface JiraAppSwitcherProps {
  cloudId: string;
  triggerXFlow: (productKey: string) => void;
}

export default (props: JiraAppSwitcherProps) => (
  <AppSwitcher
    {...props}
    SuggestedProductProvider={SuggestedProductProvider}
    CustomLinksProvider={CustomLinksProvider}
  />
);
