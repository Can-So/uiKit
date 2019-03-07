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
