import React from 'react';
import Switcher from './switcher';
import CommonDataProvider from '../providers/common-data-provider';
import { Product } from '../types';
import { Messages } from 'react-intl';
import { resolveSwitcherLinks } from '../providers/resolve-switcher-links';

interface GenericSwitcherProps {
  cloudId: string;
  messages: Messages;
  triggerXFlow: (productKey: string, sourceComponent: string) => void;
  product: Exclude<Product, Product.JIRA | Product.CONFLUENCE>;
}

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
        getFeatures(props.product),
      );

      return <Switcher {...props} {...switcherLinks} />;
    }}
  </CommonDataProvider>
);
