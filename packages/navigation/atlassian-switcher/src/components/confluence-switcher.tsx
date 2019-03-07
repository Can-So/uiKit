import * as React from 'react';
import { Messages } from 'react-intl';
import Switcher from './switcher';
import { CustomLinksProvider } from '../providers/confluence-data-providers';
import CommonDataProvider from '../providers/common-data-provider';
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
