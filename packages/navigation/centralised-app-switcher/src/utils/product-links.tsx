import * as React from 'react';
import { colors } from '@atlaskit/theme';
import DiscoverFilledIcon from '@atlaskit/icon/glyph/discover-filled';
import MarketplaceIcon from '@atlaskit/icon/glyph/marketplace';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import ConfluenceIcon from '@atlaskit/logo/dist/esm/ConfluenceLogo/Icon';
import JiraSoftwareIcon from '@atlaskit/logo/dist/esm/JiraSoftwareLogo/Icon';
import JiraServiceDeskIcon from '@atlaskit/logo/dist/esm/JiraServiceDeskLogo/Icon';
import JiraCoreIcon from '@atlaskit/logo/dist/esm/JiraCoreLogo/Icon';
import JiraIcon from '@atlaskit/logo/dist/esm/JiraLogo/Icon';
import StrideIcon from '@atlaskit/logo/dist/esm/StrideLogo/Icon';
import AtlassianIcon from '@atlaskit/logo/dist/esm/AtlassianLogo/Icon';
import JiraOpsIcon from './assets/jira-ops-logo';
import PeopleIcon from './assets/people';
import { LicenseInformationDataStructure } from '../providers/types';

enum ProductActivationStatus {
  ACTIVE = 'ACTIVE',
  DEACTIVATED = 'DEACTIVATED',
}

const getLogoIcon = (Icon: React.ReactType): React.ReactType => (
  props: any,
) => {
  return <Icon iconColor={colors.N0} size="small" {...props} />;
};

const getFixedProductLinks = (hostname: string) => [
  {
    key: 'people',
    label: 'People',
    icon: PeopleIcon,
    link: `${hostname}/people`,
  },
  {
    key: 'home',
    label: 'Atlassian Home',
    icon: getLogoIcon(AtlassianIcon),
    link: `${hostname}/home`,
  },
];

const PRODUCT_DATA_MAP: {
  [productKey: string]: {
    label: string;
    icon: React.ReactType;
  };
} = {
  'confluence.ondemand': {
    label: 'Confluence',
    icon: getLogoIcon(ConfluenceIcon),
  },
  'jira-core.ondemand': {
    label: 'Jira Core',
    icon: getLogoIcon(JiraCoreIcon),
  },
  'jira-software.ondemand': {
    label: 'Jira Software',
    icon: getLogoIcon(JiraSoftwareIcon),
  },
  'jira-servicedesk.ondemand': {
    label: 'Jira Service Desk',
    icon: getLogoIcon(JiraServiceDeskIcon),
  },
  'jira-incident-manager.ondemand': {
    label: 'Jira Ops',
    icon: getLogoIcon(JiraOpsIcon),
  },
  'hipchat.cloud': {
    label: 'Stride',
    icon: getLogoIcon(StrideIcon),
  },
};

const getProductUrl = (productKey: string, hostname: string) => {
  switch (productKey) {
    case 'hipchat.cloud':
      return 'https://app.stride.com/';
    case 'confluence.ondemand':
      return `${hostname}/wiki`;
    case 'jira-core.ondemand':
    case 'jira-software.ondemand':
    case 'jira-servicedesk.ondemand':
    case 'jira-incident-manager.ondemand':
      return `${hostname}/secure`;
  }
  return hostname;
};

const getProductLink = (productKey: string, hostname: string): ProductLink => ({
  key: productKey,
  link: getProductUrl(productKey, hostname),
  ...PRODUCT_DATA_MAP[productKey],
});

const hasAnyJiraProduct = (
  licenseInformationData: LicenseInformationDataStructure,
) => {
  const jiraProductKeys = [
    'jira-software.ondemand',
    'jira-core.ondemand',
    'jira-servicedesk.ondemand',
    'jira-incident-manager.ondemand',
  ];
  for (const jiraProductKey of jiraProductKeys) {
    if (licenseInformationData.products.hasOwnProperty(jiraProductKey)) {
      return true;
    }
  }
  return false;
};

export interface ProductLink {
  key: string;
  label: string;
  icon: React.ReactType;
  link: string;
}

const getJiraLink = (
  licenseInformationData: LicenseInformationDataStructure,
): ProductLink => {
  const majorJiraProducts = [
    'jira-software.ondemand',
    'jira-servicedesk.ondemand',
    'jira-incident-manager.ondemand',
  ].filter(jiraProductKey => {
    return licenseInformationData.products.hasOwnProperty(jiraProductKey);
  });

  if (majorJiraProducts.length > 1) {
    return {
      key: 'jira',
      label: 'Jira',
      icon: getLogoIcon(JiraIcon),
      link: `${licenseInformationData.hostname}/secure`,
    };
  } else if (majorJiraProducts.length === 1) {
    const productKey = majorJiraProducts[0];
    return getProductLink(productKey, licenseInformationData.hostname);
  }
  return getProductLink('jira-core.ondemand', licenseInformationData.hostname);
};

export const getProductLinks = (
  licenseInformationData: LicenseInformationDataStructure,
): Array<ProductLink> => {
  const productLinks: Array<ProductLink> = [];
  if (hasAnyJiraProduct(licenseInformationData)) {
    productLinks.push(getJiraLink(licenseInformationData));
  }
  if (
    licenseInformationData.products.hasOwnProperty('confluence.ondemand') &&
    licenseInformationData.products['confluence.ondemand'].state ===
      ProductActivationStatus.ACTIVE
  ) {
    productLinks.push(
      getProductLink('confluence.ondemand', licenseInformationData.hostname),
    );
  }
  if (
    licenseInformationData.products.hasOwnProperty('hipchat.cloud') &&
    licenseInformationData.products['hipchat.cloud'].state ===
      ProductActivationStatus.ACTIVE
  ) {
    productLinks.push(
      getProductLink('hipchat.cloud', licenseInformationData.hostname),
    );
  }

  return [
    ...productLinks,
    ...getFixedProductLinks(licenseInformationData.hostname),
  ];
};

export const getAdministrationLinks = (
  hostname: string,
  cloudId: string,
): Array<ProductLink> => {
  return [
    {
      key: 'administration',
      label: 'Administration',
      icon: SettingsIcon,
      link: `${hostname}/admin`,
    },
    {
      key: 'marketplace',
      label: 'Marketplace',
      icon: MarketplaceIcon,
      link: `${hostname}/admin`,
    },
    {
      key: 'discover-applications',
      label: 'Discover Applications',
      icon: DiscoverFilledIcon,
      link: `${hostname}/admin/s/${cloudId}/billing/addapplication`,
    },
  ];
};

export const getXSellLink = (
  licenseInformationData: LicenseInformationDataStructure,
): ProductLink | null => {
  if (
    !licenseInformationData.products.hasOwnProperty('confluence.ondemand') ||
    licenseInformationData.products['confluence.ondemand'].state ===
      ProductActivationStatus.DEACTIVATED
  ) {
    return getProductLink(
      'confluence.ondemand',
      licenseInformationData.hostname,
    );
  }
  if (
    !licenseInformationData.products.hasOwnProperty(
      'jira-servicedesk.ondemand',
    ) ||
    licenseInformationData.products['jira-servicedesk.ondemand'].state ===
      ProductActivationStatus.DEACTIVATED
  ) {
    return getProductLink(
      'jira-servicedesk.ondemand',
      licenseInformationData.hostname,
    );
  }
  return null;
};
