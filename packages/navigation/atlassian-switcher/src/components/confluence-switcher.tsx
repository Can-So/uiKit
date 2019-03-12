import React from 'react';
import { Messages } from 'react-intl';
import Switcher from './switcher';
import {
  CustomLinksProvider,
  MANAGE_HREF,
} from '../providers/confluence-data-providers';
import CommonDataProvider from '../providers/common-data-provider';
import { resolveSwitcherLinks } from '../providers/resolve-switcher-links';
import { FeatureFlagProps } from '../types';

type ConfluenceSwitcherProps = {
  cloudId: string;
  messages: Messages;
  triggerXFlow: (productKey: string, sourceComponent: string) => void;
} & FeatureFlagProps;

export default (props: ConfluenceSwitcherProps) => (
  <CustomLinksProvider>
    {customLinks => (
      <CommonDataProvider cloudId={props.cloudId}>
        {providerResults => {
          const { showManageLink, ...switcherLinks } = resolveSwitcherLinks(
            props.cloudId,
            { customLinks, ...providerResults },
            { xflow: false, enableSplitJira: props.enableSplitJira },
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
