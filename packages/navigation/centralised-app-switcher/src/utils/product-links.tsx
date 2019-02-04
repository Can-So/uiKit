import * as React from 'react';
import { colors } from '@atlaskit/theme';
import DiscoverFilledIcon from '@atlaskit/icon/glyph/discover-filled';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import ConfluenceIcon from '@atlaskit/logo/dist/esm/ConfluenceLogo/Icon';
import JiraSoftwareIcon from '@atlaskit/logo/dist/esm/JiraSoftwareLogo/Icon';
import JiraServiceDeskIcon from '@atlaskit/logo/dist/esm/JiraServiceDeskLogo/Icon';
import JiraCoreIcon from '@atlaskit/logo/dist/esm/JiraCoreLogo/Icon';
import AtlassianIcon from '@atlaskit/logo/dist/esm/AtlassianLogo/Icon';
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
    url: string;
  };
} = {
  'confluence.ondemand': {
    label: 'Confluence',
    icon: getLogoIcon(ConfluenceIcon),
    url: 'wiki',
  },
  'jira-core.ondemand': {
    label: 'Jira Core',
    icon: getLogoIcon(JiraCoreIcon),
    url: 'secure/BrowseProjects.jspa?selectedProjectType=business',
  },
  'jira-software.ondemand': {
    label: 'Jira Software',
    icon: getLogoIcon(JiraSoftwareIcon),
    url: 'secure/BrowseProjects.jspa?selectedProjectType=software',
  },
  'jira-servicedesk.ondemand': {
    label: 'Jira Service Desk',
    icon: getLogoIcon(JiraServiceDeskIcon),
    url: 'secure/BrowseProjects.jspa?selectedProjectType=service_desk',
  },
  'jira-incident-manager.ondemand': {
    label: 'Jira Core',
    icon: getLogoIcon(JiraCoreIcon),
    url: 'secure/BrowseProjects.jspa?selectedProjectType=business',
  },
};

const getProductLink = (productKey: string, hostname: string): ProductLink => ({
  key: productKey,
  link: `${hostname}/${PRODUCT_DATA_MAP[productKey].url}`,
  ...PRODUCT_DATA_MAP[productKey],
});

export interface ProductLink {
  key: string;
  label: string;
  icon: React.ReactType;
  link: string;
}

const productIsActive = (
  { products }: LicenseInformationDataStructure,
  productKey: string,
): boolean =>
  products.hasOwnProperty(productKey) &&
  products[productKey].state === ProductActivationStatus.ACTIVE;

export const getProductLinks = (
  licenseInformationData: LicenseInformationDataStructure,
): ProductLink[] => {
  const majorJiraProducts = [
    'jira-software.ondemand',
    'jira-servicedesk.ondemand',
  ];
  const activeProductKeys: string[] = [
    'jira-core.ondemand',
    ...majorJiraProducts,
    'jira-incident-manager.ondemand',
    'confluence.ondemand',
  ]
    .filter((productKey: string) => {
      return productIsActive(licenseInformationData, productKey);
    })
    .filter((productKey: string, _: number, activeProducts: string[]) => {
      if (productKey === 'jira-incident-manager.ondemand') {
        if (activeProducts.indexOf('jira-core.ondemand') !== -1) {
          return false;
        }
      }
      return true;
    });

  if (
    activeProductKeys.indexOf('jira-core.ondemand') === -1 &&
    (activeProductKeys.indexOf('jira-software.ondemand') !== -1 ||
      activeProductKeys.indexOf('jira-servicedesk.ondemand') !== -1)
  ) {
    activeProductKeys.unshift('jira-core.ondemand');
  }
  const productLinks: ProductLink[] = activeProductKeys.map(
    (productKey: string) =>
      getProductLink(productKey, licenseInformationData.hostname),
  );

  return [
    ...productLinks,
    ...getFixedProductLinks(licenseInformationData.hostname),
  ];
};

export const getAdministrationLinks = (
  hostname: string,
  cloudId: string,
): ProductLink[] => {
  return [
    {
      key: 'administration',
      label: 'Administration',
      icon: SettingsIcon,
      link: `${hostname}/admin/s/${cloudId}`,
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
  if (!productIsActive(licenseInformationData, 'confluence.ondemand')) {
    return getProductLink(
      'confluence.ondemand',
      licenseInformationData.hostname,
    );
  }
  if (!productIsActive(licenseInformationData, 'jira-servicedesk.ondemand')) {
    return getProductLink(
      'jira-servicedesk.ondemand',
      licenseInformationData.hostname,
    );
  }
  return null;
};
