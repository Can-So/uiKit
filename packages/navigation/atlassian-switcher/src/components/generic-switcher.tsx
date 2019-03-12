import React from 'react';
import { Messages } from 'react-intl';
import Switcher from './switcher';
import CommonDataProvider from '../providers/common-data-provider';
import { Product, FeatureFlagProps } from '../types';
import { resolveSwitcherLinks } from '../providers/resolve-switcher-links';

type GenericSwitcherProps = {
  cloudId: string;
  messages: Messages;
  triggerXFlow: (productKey: string, sourceComponent: string) => void;
  product: Exclude<Product, Product.JIRA | Product.CONFLUENCE>;
} & FeatureFlagProps;

const getFeatures = (
  product: Exclude<Product, Product.JIRA | Product.CONFLUENCE>,
) => {
  switch (product) {
    case Product.SITE_ADMIN:
      return {
        xflow: true,
      };
    case Product.HOME:
    case Product.PEOPLE:
    case Product.TRUSTED_ADMIN:
    default:
      return {
        xflow: false,
      };
  }
};

export default (props: GenericSwitcherProps) => (
  <CommonDataProvider cloudId={props.cloudId}>
    {({ licenseInformation, ...providerResults }) => {
      const switcherLinks = resolveSwitcherLinks(
        props.cloudId,
        { licenseInformation, ...providerResults },
        {...getFeatures(props.product), enableSplitJira: props.enableSplitJira },
      );

      return <Switcher {...props} {...switcherLinks} />;
    }}
  </CommonDataProvider>
);
