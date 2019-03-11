import * as React from 'react';
import Switcher from './switcher';
import {
  CustomLinksProvider,
  MANAGE_HREF,
} from '../providers/jira-data-providers';
import CommonDataProvider from '../providers/common-data-provider';
import { resolveSwitcherLinks } from '../providers/resolve-switcher-links';

interface JiraSwitcherProps {
  cloudId: string;
  triggerXFlow: (productKey: string, sourceComponent: string) => void;
}

export default (props: JiraSwitcherProps) => (
  <CustomLinksProvider>
    {customLinks => (
      <CommonDataProvider cloudId={props.cloudId}>
        {({ licenseInformation, ...providerResults }) => {
          const { showManageLink, ...switcherLinks } = resolveSwitcherLinks(
            props.cloudId,
            { licenseInformation, customLinks, ...providerResults },
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
