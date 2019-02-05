import * as React from 'react';
import AppSwitcher from './app-switcher';
import {
  CustomLinksProvider,
  XSellProvider,
} from '../providers/jira-data-providers';

interface JiraAppSwitcherProps {
  cloudId: string;
  triggerXFlow: (productKey: string) => void;
}

export default (props: JiraAppSwitcherProps) => (
  <AppSwitcher
    {...props}
    XSellProvider={XSellProvider}
    CustomLinksProvider={CustomLinksProvider}
  />
);
