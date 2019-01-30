import * as React from 'react';
import { userPickerData } from '@atlaskit/util-data-test';
import { OptionData } from '@atlaskit/user-picker';
import { ShareDialogContainer } from '../src/components/ShareDialogContainer';

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

export default () => (
  <ShareDialogContainer
    cloudId="12345-12345-12345-12345"
    loadUserOptions={loadUserOptions}
    productId="confluence"
    shareLink={window.location.href}
    shareTitle="My Share"
    resourceType="site"
  />
);
