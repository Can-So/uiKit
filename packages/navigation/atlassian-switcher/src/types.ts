export interface TriggerXFlowCallback {
  (productKey: string, sourceComponent: string): void;
}

export interface WithCloudId {
  cloudId: string;
}

export interface RecentContainer {
  name: string;
  url: string;
  objectId: string;
  iconUrl: string;
  type: string;
}

export interface CustomLink {
  key: string;
  label: string;
  link: string;
}

export enum Permissions {
  MANAGE = 'manage',
  CAN_INVITE_USERS = 'invite-users',
  ADD_PRODUCTS = 'add-products',
}

export enum Product {
  CONFLUENCE = 'confluence',
  HOME = 'home',
  JIRA = 'jira',
  PEOPLE = 'people',
  SITE_ADMIN = 'site-admin',
  TRUSTED_ADMIN = 'trusted-admin',
}

export type FeatureFlagProps = {
  enableSplitJira: boolean;
};

export type CustomLinksResponse = CustomLink[];

export interface LicenseInformationResponse {
  hostname: string;
  products: {
    [key: string]: {
      state: string;
    };
  };
}

export interface XFlowSettingsResponse {
  'product-suggestions-enabled'?: boolean;
}

export interface UserPermissionResponse {
  permitted: boolean;
}

export interface RecentContainersResponse {
  data: Array<RecentContainer>;
}
