import * as React from 'react';
import Switcher from './switcher';
import CommonDataProvider from '../providers/common-data-provider';
import { getSuggestedProductLink } from '../utils/links';

interface GenericSwitcherProps {
  cloudId: string;
  triggerXFlow: (productKey: string, sourceComponent: string) => void;
  product: string;
}

const emptyCustomLink = {
  data: null,
  isLoading: false,
  error: null,
};

const getPropsMap = (product: string) => {
  switch (product) {
    case 'site-admin':
      return {
        suggestedProductLink: true,
      };
    case 'home':
    case 'people':
    case 'trusted-admin':
    default:
      return {
        suggestedProductLink: false,
      };
  }
};

export default (props: GenericSwitcherProps) => (
  <CommonDataProvider cloudId={props.cloudId}>
    {({ licenseInformation, ...dataProps }) => (
      <Switcher
        {...props}
        {...dataProps}
        licenseInformation={licenseInformation}
        suggestedProductLink={
          getPropsMap(props.product).suggestedProductLink
            ? getSuggestedProductLink(licenseInformation.data)
            : null
        }
        customLinks={emptyCustomLink}
      />
    )}
  </CommonDataProvider>
);
