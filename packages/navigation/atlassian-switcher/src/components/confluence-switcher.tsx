import React from 'react';
import Switcher from './switcher';
import {
  CustomLinksProvider,
  MANAGE_HREF,
} from '../providers/confluence-data-providers';
import CommonDataProvider from '../providers/common-data-provider';
import { resolveSwitcherLinks } from '../providers/resolve-switcher-links';
import { Messages } from 'react-intl';

interface ConfluenceSwitcherProps {
  cloudId: string;
  messages: Messages;
  triggerXFlow: (productKey: string, sourceComponent: string) => void;
}

export default (props: ConfluenceSwitcherProps) => (
  <CustomLinksProvider>
    {customLinks => (
      <CommonDataProvider cloudId={props.cloudId}>
        {providerResults => {
          const { showManageLink, ...switcherLinks } = resolveSwitcherLinks(
            props.cloudId,
            { customLinks, ...providerResults },
            { xflow: false },
          );

          return (
            <Switcher
              {...props}
              {...switcherLinks}
              manageLink={showManageLink ? MANAGE_HREF : undefined}
            />
          );
        }}
      </CommonDataProvider>
    )}
  </CustomLinksProvider>
);
