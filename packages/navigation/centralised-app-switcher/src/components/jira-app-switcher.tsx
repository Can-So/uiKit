import * as React from 'react';
import AppSwitcher from './app-switcher';
import {
  CustomLinksProvider,
  XSellProvider,
} from '../providers/jira-data-providers';

interface AppSwitcherProps {
  cloudId: string;
  triggerXFlow: (productKey: string) => void;
}

export default (props: AppSwitcherProps) => (
  <AppSwitcher
    {...props}
    XSellProvider={XSellProvider}
    CustomLinksProvider={CustomLinksProvider}
  />
);
