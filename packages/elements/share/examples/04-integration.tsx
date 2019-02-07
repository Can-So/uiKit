import * as React from 'react';
import { userPickerData } from '@atlaskit/util-data-test';
import { OptionData } from '@atlaskit/user-picker';
import { ShareDialogContainer } from '../src';
import { Client, Content, User, MetaData, Comment } from '../src/types';

type UserData = {
  avatarUrl?: string;
  id: string;
  includesYou?: boolean;
  fixed?: boolean;
  lozenge?: string;
  memberCount?: number;
  name: string;
  publicName?: string;
  type?: string;
};

const mockOriginTracing = {
  id: 'id',
  addToUrl: l => `${l}&atlOrigin=mockAtlOrigin`,
  toAnalyticsAttributes: ({ hasGeneratedId }) => ({
    originIdGenerated: 'id',
    originProduct: 'product',
  }),
};

const loadUserOptions = (searchText?: string): OptionData[] => {
  if (!searchText) {
    return userPickerData;
  }

  return userPickerData
    .map((user: UserData) => ({
      ...user,
      type: user.type || 'user',
    }))
    .filter((user: UserData) => {
      const searchTextInLowerCase = searchText.toLowerCase();
      const propertyToMatch = ['id', 'name', 'publicName'];

      return propertyToMatch.some((property: string) => {
        return (
          user[property] &&
          user[property].toLowerCase().contains(searchTextInLowerCase)
        );
      });
    });
};

const client: Client = {
  getCapabilities: () =>
    Promise.resolve({
      directInvite: {
        mode: 'DOMAIN_RESTRICTED' as 'DOMAIN_RESTRICTED',
        domains: ['atlassian.com'],
        permittedResources: [],
      },
      invitePendingApproval: {
        mode: 'NONE' as 'NONE',
        permittedResources: [],
      },
    }),
  share: (
    content: Content,
    users: User[],
    metaData: MetaData,
    comment?: Comment,
  ) => {
    return new Promise(resolve => {
      setTimeout(
        () =>
          resolve({
            shareRequestId: 'c41e33e5-e622-4b38-80e9-a623c6e54cdd',
          }),
        3000,
      );
    });
  },
};

export default () => (
  <ShareDialogContainer
    client={client}
    cloudId="12345-12345-12345-12345"
    loadUserOptions={loadUserOptions}
    originTracingFactory={() => mockOriginTracing}
    productId="confluence"
    shareAri="ari"
    shareLink={window.location.href}
    shareTitle="My Share"
  />
);
