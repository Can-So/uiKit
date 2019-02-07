import * as React from 'react';
import AppSwitcher from './app-switcher';
import { CustomLinksProvider } from '../providers/jira-data-providers';
import CommonDataProvider from '../providers/common-data-provider';
import { getSuggestedProductLink } from '../utils/product-links';

interface JiraAppSwitcherProps {
  cloudId: string;
  triggerXFlow: (productKey: string) => void;
}

export default (props: JiraAppSwitcherProps) => (
  <CustomLinksProvider>
    {customLinks => (
      <CommonDataProvider cloudId={props.cloudId}>
        {({ licenseInformation, ...dataProps }) => (
          <AppSwitcher
            {...props}
            {...dataProps}
            licenseInformation={licenseInformation}
            suggestedProductLink={getSuggestedProductLink(
              licenseInformation.data,
            )}
            customLinks={customLinks}
          />
        )}
      </CommonDataProvider>
    )}
  </CustomLinksProvider>
);
