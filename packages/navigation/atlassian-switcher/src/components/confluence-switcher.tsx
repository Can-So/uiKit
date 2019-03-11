import * as React from 'react';
import Switcher from './switcher';
import {
  CustomLinksProvider,
  MANAGE_HREF,
} from '../providers/confluence-data-providers';
import CommonDataProvider from '../providers/common-data-provider';
import { resolveSwitcherLinks } from '../providers/resolve-switcher-links';

interface ConfluenceSwitcherProps {
  cloudId: string;
  triggerXFlow: (productKey: string, sourceComponent: string) => void;
}

export default (props: ConfluenceSwitcherProps) => (
  <CustomLinksProvider>
    {customLinks => (
      <CommonDataProvider cloudId={props.cloudId}>
        {({ licenseInformation, ...providerResults }) => {
          const { showManageLink, ...switcherLinks } = resolveSwitcherLinks(
            props.cloudId,
            { licenseInformation, customLinks, ...providerResults },
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
