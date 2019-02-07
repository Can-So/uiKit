import * as React from 'react';
import AppSwitcher from './app-switcher';
import { CustomLinksProvider } from '../providers/confluence-data-providers';
import CommonDataProvider from '../providers/common-data-provider';

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
            suggestedProductLink={null}
            customLinks={customLinks}
          />
        )}
      </CommonDataProvider>
    )}
  </CustomLinksProvider>
);
