import * as React from 'react';
import { Messages } from 'react-intl';
import Switcher from './switcher';
import CommonDataProvider from '../providers/common-data-provider';
import { getSuggestedProductLink } from '../utils/links';
import { FeatureFlagProps, Product } from '../types';

type GenericSwitcherProps = {
  cloudId: string;
  messages: Messages;
  triggerXFlow: (productKey: string, sourceComponent: string) => void;
  product: Exclude<Product, Product.JIRA | Product.CONFLUENCE>;
} & FeatureFlagProps;

const emptyCustomLink = {
  data: null,
  isLoading: false,
  error: null,
};

const getPropsMap = (
  product: Exclude<Product, Product.JIRA | Product.CONFLUENCE>,
) => {
  switch (product) {
    case Product.SITE_ADMIN:
      return {
        suggestedProductLink: true,
      };
    case Product.HOME:
    case Product.PEOPLE:
    case Product.TRUSTED_ADMIN:
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
