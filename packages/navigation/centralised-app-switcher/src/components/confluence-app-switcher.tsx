import * as React from 'react';
import AppSwitcher from './app-switcher';
import {
  CustomLinksProvider,
  XSellProvider,
} from '../providers/confluence-data-providers';

interface ConfluenceAppSwitcherProps {
  cloudId: string;
  triggerXFlow: (productKey: string) => void;
}

export default (props: ConfluenceAppSwitcherProps) => (
  <AppSwitcher
    {...props}
    XSellProvider={XSellProvider}
    CustomLinksProvider={CustomLinksProvider}
  />
);
