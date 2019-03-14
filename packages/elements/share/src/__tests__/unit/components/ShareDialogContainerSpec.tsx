import { OptionData } from '@atlaskit/user-picker';
import { utils } from '@atlaskit/util-service-support';
import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import * as ShareServiceExports from '../../../clients/ShareServiceClient';
import {
  Props,
  ShareDialogContainer,
  State,
} from '../../../components/ShareDialogContainer';
import { ShareDialogWithTrigger } from '../../../components/ShareDialogWithTrigger';
import { OriginTracing } from '../../../types';

let wrapper: ShallowWrapper<Props, State, ShareDialogContainer>;
let mockOriginTracing: OriginTracing;
let mockOriginTracingFactory: jest.Mock;
let mockRequestService: jest.Mock;
let mockShareServiceClient: jest.Mock;
const mockCloudId = 'cloudId';
const mockProductId = 'productId';
const mockShareAri = 'ari';
const mockShareContentType = 'issue';
const mockShareLink = 'share-link';
const mockShareTitle = 'Share Title';
const mockTriggerButtonStyle = 'icon-with-text' as 'icon-with-text';
const mockTriggerButtonAppearance = 'subtle';
const mockCopyLink = 'copy-link';
const mockFormatCopyLink = jest.fn().mockReturnValue(mockCopyLink);
const mockShouldCloseOnEscapePress = true;
const mockUsers: OptionData[] = [
  { type: 'user', id: 'id', name: 'User 1' },
  { type: 'email', id: 'mock@email.com', name: 'mock@email.com' },
];
const mockComment = {
  format: 'plain_text' as 'plain_text',
  value: 'comment',
};
const mockLoadUserOptions = () => [];
const mockConfig = {
  mode: 'EXISTING_USERS_ONLY',
  allowComment: true,
};
const mockGetConfig = jest.fn().mockResolvedValue(mockConfig);
const mockShare = jest.fn().mockResolvedValue({});
const mockClient = {
  getConfig: mockGetConfig,
  share: mockShare,
};

beforeEach(() => {
  mockOriginTracing = {
    id: 'id',
    addToUrl: jest.fn(),
    toAnalyticsAttributes: jest.fn(),
  };
  mockOriginTracingFactory = jest.fn().mockReturnValue(mockOriginTracing);
  mockRequestService = jest
    .spyOn(utils, 'requestService')
    .mockResolvedValue(mockConfig);
  mockShareServiceClient = jest
    .spyOn(ShareServiceExports, 'ShareServiceClient')
    .mockImplementation(() => ({
      share: mockShare,
      getConfig: mockGetConfig,
    }));
  wrapper = shallow(
    <ShareDialogContainer
      client={mockClient}
      cloudId={mockCloudId}
      loadUserOptions={mockLoadUserOptions}
      originTracingFactory={mockOriginTracingFactory}
      productId={mockProductId}
      shareAri={mockShareAri}
      shareContentType={mockShareContentType}
      shareLink={mockShareLink}
      shareTitle={mockShareTitle}
      formatCopyLink={mockFormatCopyLink}
      shouldCloseOnEscapePress={mockShouldCloseOnEscapePress}
      triggerButtonAppearance={mockTriggerButtonAppearance}
      triggerButtonStyle={mockTriggerButtonStyle}
    />,
  );
});

afterEach(() => {
  mockRequestService.mockRestore();
  mockShareServiceClient.mockRestore();
});

describe('ShareDialogContainer', () => {
  it('should render', () => {
    const shareDialogWithTrigger = wrapper.find(ShareDialogWithTrigger);
    expect(shareDialogWithTrigger).toHaveLength(1);
    expect(mockFormatCopyLink).toHaveBeenCalled();
    expect(shareDialogWithTrigger.prop('triggerButtonAppearance')).toEqual(
      mockTriggerButtonAppearance,
    );
    expect(shareDialogWithTrigger.prop('triggerButtonStyle')).toEqual(
      mockTriggerButtonStyle,
    );
    expect(shareDialogWithTrigger.prop('copyLink')).toEqual(mockCopyLink);
    expect(shareDialogWithTrigger.prop('loadUserOptions')).toEqual(
      mockLoadUserOptions,
    );
    expect(shareDialogWithTrigger.prop('onLinkCopy')).toBe(
      wrapper.instance().handleCopyLink,
    );
    expect(shareDialogWithTrigger.prop('shouldCloseOnEscapePress')).toEqual(
      mockShouldCloseOnEscapePress,
    );
    expect(shareDialogWithTrigger.prop('config')).toEqual(
      wrapper.state().config,
    );
    expect(mockOriginTracingFactory).toHaveBeenCalledTimes(2);
    expect(mockClient.getConfig).toHaveBeenCalledTimes(1);
    expect(wrapper.state().config).toEqual(mockConfig);
  });

  it('should call props.originTracingFactory if shareLink prop is updated', () => {
    mockOriginTracingFactory.mockReset();
    wrapper.setProps({ shareLink: 'new-share-link' });
    expect(wrapper.state().prevShareLink).toEqual('new-share-link');
    expect(mockOriginTracingFactory).toHaveBeenCalledTimes(2);
  });

  it('should have default this.client if props.client is not given', () => {
    const newWrapper: ShallowWrapper<
      Props,
      State,
      ShareDialogContainer
    > = shallow<ShareDialogContainer>(
      <ShareDialogContainer
        cloudId={mockCloudId}
        loadUserOptions={mockLoadUserOptions}
        originTracingFactory={mockOriginTracingFactory}
        productId={mockProductId}
        shareAri={mockShareAri}
        shareContentType={mockShareContentType}
        shareLink={mockShareLink}
        shareTitle={mockShareTitle}
        formatCopyLink={mockFormatCopyLink}
        shouldCloseOnEscapePress={mockShouldCloseOnEscapePress}
      />,
    );

    // @ts-ignore: accessing private variable for testing purpose
    const client: Client = newWrapper.instance().client;
    expect(client.getConfig).toEqual(mockGetConfig);
    expect(client.share).toEqual(mockShare);
  });

  describe('handleCopyLink', () => {
    it('should send analytics', () => {
      wrapper.setState({
        copyLinkOrigin: mockOriginTracing,
      });
      wrapper.instance().forceUpdate();
      wrapper.instance().handleCopyLink();
      expect(mockOriginTracing.toAnalyticsAttributes).toHaveBeenCalledTimes(1);
      expect(mockOriginTracing.toAnalyticsAttributes).toHaveBeenCalledWith({
        hasGeneratedId: true,
      });
      // TODO: complete when analytic is sent
    });
  });

  describe('handleSubmitShare', () => {
    it('should call share function from this.client', () => {
      const mockDialogContentState = {
        users: mockUsers,
        comment: mockComment,
      };
      wrapper.instance().handleSubmitShare(mockDialogContentState);
      wrapper.instance().forceUpdate();
      expect(mockShare).toHaveBeenCalledTimes(1);
      expect(mockShare).toHaveBeenCalledWith(
        {
          ari: mockShareAri,
          link: mockShareLink,
          title: mockShareTitle,
          type: mockShareContentType,
        },
        [{ type: 'user', id: 'id' }, { type: 'user', email: 'mock@email.com' }],
        {
          productId: mockProductId,
          atlOriginId: wrapper.state().shareOrigin!.id,
        },
        mockComment,
      );
    });

    it('should update shareActionCount and Origin Ids from the state if share is successful', async () => {
      mockOriginTracingFactory.mockReset();

      const mockShareResponse = {};
      mockShare.mockResolvedValueOnce(mockShareResponse);
      const mockDialogContentState = {
        users: mockUsers,
        comment: mockComment,
      };
      const result = await wrapper
        .instance()
        .handleSubmitShare(mockDialogContentState as any);
      expect(mockOriginTracingFactory).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockShareResponse);
    });

    it('should return a Promise Rejection if share is failed', async () => {
      mockShare.mockRejectedValueOnce('error');
      wrapper.instance().forceUpdate();
      const mockDialogContentState = {
        users: mockUsers,
        comment: mockComment,
      };
      try {
        await wrapper
          .instance()
          .handleSubmitShare(mockDialogContentState as any);
      } catch (err) {
        expect(err).toEqual('error');
      }
    });
  });
});
