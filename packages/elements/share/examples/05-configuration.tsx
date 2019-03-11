import Select from '@atlaskit/select';
import { ToggleStateless as Toggle } from '@atlaskit/toggle';
import { OptionData } from '@atlaskit/user-picker';
import { userPickerData } from '@atlaskit/util-data-test';
import * as React from 'react';
import { ShareDialogContainer } from '../src';
import {
  Comment,
  ConfigResponse,
  ConfigResponseMode,
  Content,
  KeysOfType,
  MetaData,
  OriginTracing,
  ShareClient,
  ShareResponse,
  User,
} from '../src/types';

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

const mockOriginTracing: OriginTracing = {
  id: 'id',
  addToUrl: (l: string) => `${l}&atlOrigin=mockAtlOrigin`,
  toAnalyticsAttributes: () => ({
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
      const propertyToMatch: (KeysOfType<UserData, string | undefined>)[] = [
        'id',
        'name',
        'publicName',
      ];

      return propertyToMatch.some(
        (property: KeysOfType<UserData, string | undefined>) => {
          const value = property && user[property];
          return !!(
            value && value.toLowerCase().includes(searchTextInLowerCase)
          );
        },
      );
    });
};

const modeOptions = [
  { label: 'Existing users only', value: 'EXISTING_USERS_ONLY' },
  { label: 'Invite needs approval', value: 'INVITE_NEEDS_APPROVAL' },
  { label: 'Only domain based invite', value: 'ONLY_DOMAIN_BASED_INVITE' },
  { label: 'Domain based invite', value: 'DOMAIN_BASED_INVITE' },
  { label: 'Anyone', value: 'ANYONE' },
];

type State = ConfigResponse;

export default class Example extends React.Component<{}, State> {
  state: State = {
    allowComment: true,
    mode: modeOptions[0].value as ConfigResponseMode,
    allowedDomains: ['atlassian.com'],
  };

  key: number = 0;

  getConfig = () => Promise.resolve(this.state);

  share = (
    _content: Content,
    _users: User[],
    _metaData: MetaData,
    _comment?: Comment,
  ) =>
    new Promise<ShareResponse>(resolve => {
      setTimeout(
        () =>
          resolve({
            shareRequestId: 'c41e33e5-e622-4b38-80e9-a623c6e54cdd',
          }),
        3000,
      );
    });

  client: ShareClient = {
    getConfig: this.getConfig,
    share: this.share,
  };

  render() {
    const { allowComment, mode, allowedDomains } = this.state;

    this.key++;
    return (
      <>
        <ShareDialogContainer
          key={`key-${this.key}`}
          buttonStyle="icon-with-text"
          client={this.client}
          cloudId="12345-12345-12345-12345"
          loadUserOptions={loadUserOptions}
          originTracingFactory={() => mockOriginTracing}
          productId="confluence"
          shareAri="ari"
          shareContentType="issue"
          shareLink={window.location.href}
          shareTitle="My Share"
        />
        <p>Allow comments</p>
        <Toggle
          isChecked={allowComment}
          onChange={() => this.setState({ allowComment: !allowComment })}
        />
        <Select
          value={modeOptions.find(option => option.value === mode)}
          options={modeOptions}
          onChange={(mode: any) => this.setState({ mode: mode.value })}
        />
        <p>Allowed domains: {allowedDomains && allowedDomains.join(', ')}</p>
      </>
    );
  }
}
