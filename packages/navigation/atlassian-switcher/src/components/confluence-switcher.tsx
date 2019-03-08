import * as React from 'react';
import Switcher from './switcher';
import { CustomLinksProvider } from '../providers/confluence-data-providers';
import CommonDataProvider from '../providers/common-data-provider';
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
        {({ licenseInformation, ...dataProps }) => (
          <Switcher
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
